"use strict";

const Archivos = (() => {
  const MAX_FILE = 10 * 1024 * 1024;
  const MAX_XML = 16 * 1024 * 1024;
  const MAX_ROWS = 10000;
  const MAX_COLS = 120;
  const utf8 = new TextDecoder("utf-8", { fatal: true });

  function delimiter(text) {
    const counts = new Map([[",", 0], [";", 0], ["\t", 0]]);
    let quoted = false;
    for (const char of text.trimStart()) {
      if (char === '"') quoted = !quoted;
      else if (!quoted && (char === "\n" || char === "\r")) break;
      else if (!quoted && counts.has(char)) counts.set(char, counts.get(char) + 1);
    }
    return [...counts].sort((a, b) => b[1] - a[1])[0][0];
  }

  function csv(text) {
    const sep = delimiter(text);
    const rows = [];
    let row = [], field = "", quoted = false, closed = false, line = 1, firstLine = 1;
    function endField() {
      row.push(field);
      if (row.length > MAX_COLS) throw Error("El archivo supera 120 columnas.");
      field = "";
      closed = false;
    }
    function endRow() {
      endField();
      if (row.some(cell => cell.trim())) rows.push({ cells: row, line: firstLine });
      if (rows.length > MAX_ROWS + 1) throw Error("El archivo supera 10.000 filas de datos.");
      row = [];
    }
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"' && text[i + 1] === '"') {
          field += '"';
          i++;
        } else if (char === '"') {
          quoted = false;
          closed = true;
        } else {
          field += char;
          if (char === "\n" || (char === "\r" && text[i + 1] !== "\n")) line++;
        }
      } else if (char === sep) {
        endField();
      } else if (char === "\r" || char === "\n") {
        endRow();
        if (char === "\r" && text[i + 1] === "\n") i++;
        firstLine = ++line;
      } else if (closed || (char === '"' && field)) {
        throw Error("Comillas CSV inválidas cerca de la fila " + line + ".");
      } else if (char === '"') {
        quoted = true;
      } else {
        field += char;
      }
    }
    if (quoted) throw Error("Hay una celda CSV entre comillas sin cerrar.");
    if (field || closed || row.length) endRow();
    return table(rows);
  }

  function table(rows) {
    if (!rows.length) throw Error("El archivo no contiene encabezados.");
    const headers = rows[0].cells.map(cell => cell.trim().replace(/^\uFEFF/, ""));
    if (headers.length < 2) throw Error("Se necesitan al menos dos columnas. Revisa el delimitador.");
    const used = headers.filter(Boolean).map(label => label.toLowerCase());
    if (new Set(used).size !== used.length) throw Error("Hay encabezados de columna duplicados.");
    const data = rows.slice(1);
    for (const row of data) {
      if (row.cells.slice(headers.length).some(value => value.trim())) {
        throw Error("La fila " + row.line + " tiene más campos que el encabezado.");
      }
    }
    return { headers, rows: data };
  }

  function zipReader(bytes) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const u16 = offset => dv.getUint16(offset, true);
    const u32 = offset => dv.getUint32(offset, true);
    const fail = () => { throw Error("Excel inválido o dañado. Guarda una copia como .xlsx."); };
    let end = bytes.length - 22;
    while (end >= Math.max(0, bytes.length - 65557)) {
      if (u32(end) === 0x06054b50 && end + 22 + u16(end + 20) === bytes.length) break;
      end--;
    }
    if (end < Math.max(0, bytes.length - 65557) || u16(end + 4) || u16(end + 6)) fail();
    const count = u16(end + 10);
    let offset = u32(end + 16);
    const files = new Map();
    if (count > 1000) fail();
    for (let i = 0; i < count; i++) {
      if (offset + 46 > end || u32(offset) !== 0x02014b50) fail();
      const size = u32(offset + 20), expanded = u32(offset + 24);
      const nameLen = u16(offset + 28), extra = u16(offset + 30), comment = u16(offset + 32);
      if (offset + 46 + nameLen + extra + comment > end) fail();
      const name = utf8.decode(bytes.subarray(offset + 46, offset + 46 + nameLen));
      files.set(name, { size, expanded, flags: u16(offset + 8), method: u16(offset + 10), start: u32(offset + 42) });
      offset += 46 + nameLen + extra + comment;
    }
    return async name => {
      const entry = files.get(name);
      if (!entry) return null;
      const { size, expanded, flags, method, start } = entry;
      if (flags & 1 || expanded > MAX_XML || start + 30 > end || u32(start) !== 0x04034b50) fail();
      const begin = start + 30 + u16(start + 26) + u16(start + 28);
      if (begin + size > end) fail();
      let content = bytes.slice(begin, begin + size);
      if (method === 8) {
        const reader = new Blob([content]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader();
        let length = 0;
        content = new Uint8Array(expanded);
        try {
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            if (length + value.length > expanded) fail();
            content.set(value, length);
            length += value.length;
          }
          if (length !== expanded) fail();
        } finally {
          await reader.cancel();
        }
      } else if (method !== 0 || size !== expanded) {
        fail();
      }
      return utf8.decode(content);
    };
  }

  function xml(text) {
    if (!text || /<!DOCTYPE/i.test(text)) throw Error("No se pudo leer la estructura del Excel.");
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw Error("El Excel contiene XML inválido.");
    return doc;
  }

  const tags = (element, name) => [...element.getElementsByTagNameNS("*", name)];
  const first = (element, name) => tags(element, name)[0];
  const content = element => element?.textContent ?? "";
  const textRuns = element => tags(element, "t").map(content).join("");

  async function xlsx(bytes) {
    const open = zipReader(bytes);
    const workbook = xml(await open("xl/workbook.xml"));
    const sheet = first(workbook, "sheet");
    if (!sheet) throw Error("El Excel no tiene hojas.");
    const relations = xml(await open("xl/_rels/workbook.xml.rels"));
    const id = [...sheet.attributes].find(attribute => attribute.localName === "id")?.value;
    const relationship = tags(relations, "Relationship").find(relation => relation.getAttribute("Id") === id);
    const target = relationship?.getAttribute("Target") ?? "";
    const worksheet = target.startsWith("/") ? target.slice(1) : "xl/" + target;
    if (!/^xl\/worksheets\/[a-zA-Z0-9_.-]+\.xml$/.test(worksheet)) {
      throw Error("No se pudo identificar la primera hoja del Excel.");
    }
    const sharedXml = await open("xl/sharedStrings.xml");
    const shared = sharedXml ? tags(xml(sharedXml), "si").map(textRuns) : [];
    const doc = xml(await open(worksheet));
    const sourceRows = tags(doc, "row");
    if (sourceRows.length > MAX_ROWS + 1) throw Error("El archivo supera 10.000 filas de datos.");
    const rows = [];
    for (const [index, row] of sourceRows.entries()) {
      const cells = [], types = {};
      for (const c of tags(row, "c")) {
        const letters = (c.getAttribute("r") ?? "").match(/^([A-Z]+)\d+$/)?.[1];
        if (!letters) throw Error("Hay una referencia de celda no válida en el Excel.");
        const col = [...letters].reduce((n, letter) => n * 26 + letter.charCodeAt(0) - 64, 0) - 1;
        if (col >= MAX_COLS) throw Error("El archivo supera 120 columnas.");
        const raw = content(first(c, "v"));
        const type = c.getAttribute("t") ?? "n";
        if (first(c, "f") || type === "e" || type === "b" || type === "d") {
          types[col] = "invalid";
          cells[col] = first(c, "f") ? "[fórmula]" : "[celda no válida]";
        } else if (type === "s") {
          if (!/^\d+$/.test(raw) || shared[Number(raw)] === undefined) throw Error("Texto Excel no válido.");
          cells[col] = shared[Number(raw)];
        } else if (type === "inlineStr") {
          cells[col] = textRuns(c);
        } else {
          cells[col] = raw;
          if (raw && type === "n") types[col] = "number";
        }
      }
      const values = Array.from(cells, cell => cell ?? "");
      if (values.some(value => value.trim())) rows.push({ cells: values, types, line: Number(row.getAttribute("r")) || index + 1 });
    }
    return { ...table(rows), sheet: sheet.getAttribute("name") };
  }

  async function load(name, input) {
    const bytes = new Uint8Array(input);
    if (bytes.length > MAX_FILE) throw Error("El archivo supera 10 MB.");
    if (/\.xlsx$/i.test(name)) return { ...(await xlsx(bytes)), name };
    if (!/\.csv$/i.test(name)) throw Error("Selecciona un .csv o .xlsx. Guarda los archivos .xls como .xlsx.");
    let text;
    try { text = utf8.decode(bytes); }
    catch { text = new TextDecoder("windows-1252").decode(bytes); }
    if (text.includes("\u0000")) throw Error("Guarda el CSV con codificación UTF-8.");
    return { ...csv(text), name };
  }

  function toCsv(headers, rows, bom = true) {
    const quote = value => {
      const text = String(value ?? "");
      return /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
    };
    return (bom ? "\uFEFF" : "") + [headers, ...rows].map(row => row.map(quote).join(",")).join("\r\n") + "\r\n";
  }

  return { load, csv, toCsv };
})();

if (typeof module !== "undefined") module.exports = Archivos;
