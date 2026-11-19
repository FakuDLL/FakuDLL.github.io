"use strict";

const Catalogo = (() => {
  const fields = {
    sku: ["SKU", "Variant SKU", "Código SKU", "Código de producto", "Referencia", "Item Number"],
    cost: ["Costo", "Cost", "Cost per item", "Costo unitario", "Unit Cost", "Costo proveedor", "Wholesale Price"],
    stock: ["Stock", "Inventario", "Cantidad", "Quantity", "Qty", "On hand", "Existencias"],
    currency: ["Moneda", "Currency", "Divisa", "Currency Code"],
  };
  const statuses = {
    changed: "Con cambios", unchanged: "Sin cambios", new: "Nuevo",
    missing: "Ausente", blocked: "Retenido",
  };
  const normalize = value => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[\s_-]+/g, "");
  const exactCell = (row, column) => row?.cells[column] ?? "";
  const safeCell = value => !/^[\s\uFEFF]*[=+\-@]|^[\t\r\n]/.test(String(value));
  const key = parts => JSON.stringify(parts);
  const optionLabels = Array.from({ length: 3 }, (_, i) => ["Option" + (i + 1) + " name", "Option" + (i + 1) + " value"]);
  const zeroKey = sku => /^\d+$/.test(sku) ? sku.replace(/^0+(?=\d)/, "") : sku.toUpperCase();

  function findColumn(table, aliases) {
    const wanted = new Set(aliases.map(normalize));
    const found = table.headers.map((name, i) => wanted.has(normalize(name)) ? i : -1).filter(i => i !== -1);
    return found.length === 1 ? found[0] : -1;
  }

  const autoMap = table => Object.fromEntries(Object.entries(fields).map(([label, aliases]) => [label, findColumn(table, aliases)]));

  function cents(raw, separator) {
    const text = String(raw).trim();
    const pattern = separator === "," ? /^\d{1,9}(,\d{1,2})?$/ : /^\d{1,9}(\.\d{1,2})?$/;
    if (!pattern.test(text)) return null;
    const [whole, fraction = ""] = text.split(separator);
    return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
  }
  const money = value => value === null ? "" : (value / 100n).toString() + "." + (value % 100n).toString().padStart(2, "0");
  const wholeStock = value => /^\d{1,9}$/.test(value.trim()) ? Number(value.trim()) : null;
  const formatValue = value => value === null || value === undefined ? "" : value;
  const roundUp = (n, d) => (n + d - 1n) / d;

  function rulesFrom(data) {
    const currency = String(data.currency ?? "").trim().toUpperCase();
    const supported = Intl.supportedValuesOf("currency");
    if (!supported.includes(currency) || new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits !== 2) {
      throw Error("Elige un código ISO de moneda con dos decimales, por ejemplo USD, UYU o EUR.");
    }
    if (!["markup", "margin"].includes(data.mode)) throw Error("Elige una regla de precio.");
    if (![",", "."].includes(data.decimal)) throw Error("Elige el separador decimal.");
    const rate = cents(data.rate, ".");
    const floor = cents(data.floor, ".");
    const change = cents(data.maxPrice, ".");
    const stockLimit = wholeStock(String(data.maxStock ?? ""));
    if (rate === null || rate > 99900n || (data.mode === "margin" && rate >= 10000n)) {
      throw Error("Revisa el porcentaje. El margen debe ser inferior a 100%.");
    }
    if (floor === null || floor >= 10000n) throw Error("El margen mínimo debe estar entre 0% y 99,99%.");
    if (change === null || change > 99900n || stockLimit === null) {
      throw Error("Indica límites válidos para la variación de precio y stock.");
    }
    return { ...data, currency, rate, floor, change, stockLimit };
  }

  function priceFor(cost, rules) {
    return rules.mode === "margin"
      ? roundUp(cost * 10000n, 10000n - rules.rate)
      : (cost * (10000n + rules.rate) + 5000n) / 10000n;
  }

  function readFeed(table, mapping, rules) {
    if (Object.keys(fields).some(field => !Number.isInteger(mapping[field]) || !table.headers[mapping[field]])) {
      throw Error("Asigna SKU, costo, stock y moneda en " + table.name + ".");
    }
    if (new Set(Object.values(mapping)).size !== 4) throw Error("Cada campo debe usar una columna distinta en " + table.name + ".");
    const records = new Map(), unidentified = [];
    for (const row of table.rows) {
      const raw = exactCell(row, mapping.sku);
      const sku = raw.trim();
      const problems = [];
      if (!sku) problems.push("Falta SKU");
      if (sku && (raw !== sku || /\s|[\u0000-\u001f\u007f\u200b-\u200f\ufeff]/u.test(sku) || !safeCell(sku))) {
        problems.push("SKU con espacios, controles o prefijo no admitido");
      }
      if (/^\d+(?:\.\d+)?e[+-]\d+$/i.test(sku) || row.types?.[mapping.sku] === "number") {
        problems.push("SKU numérico en Excel o en notación científica. Guardar como texto");
      }
      if (["sku", "cost", "stock", "currency"].some(field => row.types?.[mapping[field]] === "invalid")) {
        problems.push("Hay fórmulas o celdas de Excel inválidas. Pega valores");
      }
      const costRaw = exactCell(row, mapping.cost);
      const stockRaw = exactCell(row, mapping.stock);
      const currency = exactCell(row, mapping.currency).trim().toUpperCase();
      const cost = cents(costRaw, row.types?.[mapping.cost] === "number" ? "." : rules.decimal);
      const stock = wholeStock(stockRaw);
      if (!costRaw.trim()) problems.push("Falta costo");
      else if (cost === null || cost === 0n) problems.push("Costo inválido: positivo, sin miles y hasta dos decimales");
      if (!stockRaw.trim()) problems.push("Falta stock");
      else if (stock === null) problems.push("Stock inválido: debe ser un entero no negativo");
      if (!currency) problems.push("Falta moneda");
      else if (currency !== rules.currency) problems.push("Moneda " + currency + " distinta de " + rules.currency);
      const record = { sku, cost, stock, currency, problems, line: row.line };
      if (!sku) unidentified.push(record);
      else {
        if (!records.has(sku)) records.set(sku, []);
        records.get(sku).push(record);
      }
    }
    return { records, unidentified };
  }

  function productExport(table) {
    const handle = findColumn(table, ["Handle", "URL handle"]);
    const title = findColumn(table, ["Title"]);
    const sku = findColumn(table, ["SKU", "Variant SKU"]);
    const price = findColumn(table, ["Price", "Variant Price"]);
    const options = optionLabels.map(names => names.map(name => findColumn(table, [name])));
    if ([handle, title, sku, price, ...options[0]].some(col => col === -1)) {
      throw Error("Productos Shopify: faltan handle, título, SKU, precio u opción 1 del CSV original.");
    }
    for (const [name, value] of options) {
      if ((name === -1) !== (value === -1)) throw Error("Productos Shopify: las columnas de opciones deben venir en pares.");
    }
    const columns = [handle, title, ...options.flat().filter(col => col >= 0), sku, price];
    const groups = new Map(), skus = new Map();
    const storePrices = new Map();
    for (const row of table.rows) {
      const id = exactCell(row, handle);
      const code = exactCell(row, sku);
      if (!code && !exactCell(row, price) && !options.some(([a, b]) => exactCell(row, a) || exactCell(row, b)) && !exactCell(row, title)) continue;
      if (!id) throw Error("Productos Shopify: falta el handle de una variante en la fila " + row.line + ".");
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(row);
      if (!skus.has(code)) skus.set(code, []);
      skus.get(code).push(id);
      storePrices.set(code, cents(exactCell(row, price), "."));
    }
    const validGroup = rows => {
      const lead = rows[0];
      if (!exactCell(lead, title).trim()) return false;
      const names = options.map(([a]) => exactCell(lead, a));
      const named = names.filter(Boolean).length;
      if (!named || names.slice(0, named).some(name => !name.trim())) return false;
      const seen = new Set();
      for (const row of rows) {
        const code = exactCell(row, sku);
        const values = options.map(([, b]) => exactCell(row, b));
        const thisKey = key(values);
        if (!code.trim() || skus.get(code)?.length !== 1 || cents(exactCell(row, price), ".") === null || seen.has(thisKey)) return false;
        if (columns.some(col => !safeCell(exactCell(row, col)))) return false;
        if (options.some(([a], i) => (exactCell(row, a) && exactCell(row, a) !== names[i]) || (Boolean(values[i].trim()) !== Boolean(names[i])))) return false;
        seen.add(thisKey);
      }
      return true;
    };
    const identities = new Map();
    for (const [id, rows] of groups) {
      for (const row of rows) identities.set(exactCell(row, sku), key([id, ...options.map(([, b]) => exactCell(row, b))]));
    }
    return { table, groups, skus, storePrices, columns, sku, price, validGroup, identities };
  }

  function inventoryExport(table, location) {
    const definitions = [["Handle", ["Handle", "URL handle"]], ["Option1 Value", ["Option1 Value"]], ["Option2 Value", ["Option2 Value"]],
      ["Option3 Value", ["Option3 Value"]], ["SKU", ["SKU"]], ["Location", ["Location"]], ["On hand (current)", ["On hand (current)"]], ["On hand (new)", ["On hand (new)"]]];
    const cols = definitions.map(([, aliases]) => findColumn(table, aliases));
    const [handle, option1, option2, option3, sku, loc, current, next] = cols;
    const bin = findColumn(table, ["Bin name"]);
    const committed = findColumn(table, ["Committed (not editable)"]);
    const unavailable = findColumn(table, ["Unavailable (not editable)"]);
    if ([handle, option1, sku, loc, current, next, committed, unavailable].some(col => col < 0)) {
      throw Error("Inventario Shopify: usa la exportación original «Todos los estados» con SKU, opciones y cantidades reservadas.");
    }
    if (!location || !table.rows.some(row => exactCell(row, loc) === location)) throw Error("Selecciona una ubicación del CSV de inventario.");
    const skus = new Map(), occurrences = new Map();
    const identity = row => key([handle, option1, option2, option3].map(col => exactCell(row, col)));
    for (const row of table.rows.filter(row => exactCell(row, loc) === location)) {
      const code = exactCell(row, sku);
      if (!skus.has(code)) skus.set(code, []);
      skus.get(code).push(row);
      const id = identity(row);
      occurrences.set(id, (occurrences.get(id) ?? 0) + 1);
    }
    const valid = row => exactCell(row, handle).trim() && exactCell(row, option1).trim()
      && occurrences.get(identity(row)) === 1 && !exactCell(row, bin).trim()
      && [current, committed, unavailable].every(col => wholeStock(exactCell(row, col)) !== null)
      && cols.filter(col => col !== next && col >= 0).every(col => safeCell(exactCell(row, col)));
    const reserved = row => wholeStock(exactCell(row, committed)) + wholeStock(exactCell(row, unavailable));
    return { definitions, cols, current, next, skus, valid, reserved, identity };
  }

  function reports(pairs, settings, shop = {}) {
    const rules = rulesFrom(settings);
    const products = shop.products ? productExport(shop.products) : null;
    const inventory = shop.inventory && shop.onHand ? inventoryExport(shop.inventory, shop.location) : null;
    const sets = pairs.map(({ name, before, after, beforeMap, afterMap }) => ({
      name, before: readFeed(before, beforeMap, rules), after: readFeed(after, afterMap, rules),
    }));
    const owners = new Map();
    for (const set of sets) {
      for (const sku of set.after.records.keys()) owners.set(sku, (owners.get(sku) ?? 0) + 1);
    }
    const results = [], productChanges = new Map(), inventoryRows = [];
    function add(entry) { results.push({ notices: [], price: "", priceExport: false, stockExport: false, ...entry }); }
    for (const set of sets) {
      const { name, before, after } = set;
      for (const [label, feed] of [["anterior", before], ["actual", after]]) {
        for (const entry of feed.unidentified) {
          add({ name, sku: "", status: "blocked", [label === "anterior" ? "before" : "after"]: entry,
            notices: entry.problems.map(problem => label + " fila " + entry.line + ": " + problem) });
        }
      }
      const all = new Set([...before.records.keys(), ...after.records.keys()]);
      const aliases = new Map();
      for (const sku of all) {
        const alias = zeroKey(sku);
        if (!aliases.has(alias)) aliases.set(alias, []);
        aliases.get(alias).push(sku);
      }
      for (const sku of all) {
        const earlier = before.records.get(sku) ?? [], later = after.records.get(sku) ?? [];
        const prev = earlier[0], next = later[0], notices = [];
        const entry = { name, sku, before: prev, after: next, notices,
          previousLines: earlier.map(row => row.line).join(", "), currentLines: later.map(row => row.line).join(", ") };
        for (const [label, group] of [["Anterior", earlier], ["Actual", later]]) {
          if (group.length > 1) notices.push(label + ": SKU duplicado en filas " + group.map(row => row.line).join(", "));
          notices.push(...group.flatMap(row => row.problems.map(problem => label + " fila " + row.line + ": " + problem)));
        }
        if ((!earlier.length || !later.length) && aliases.get(zeroKey(sku)).length > 1) {
          notices.push("SKU parecido con otras mayúsculas o ceros; confirma identidad");
        }
        if (owners.get(sku) > 1) notices.push("SKU compartido entre proveedores activos; requiere una prioridad aprobada");
        if (notices.length) { add({ ...entry, status: "blocked" }); continue; }
        if (!prev || !next) { add({ ...entry, status: prev ? "missing" : "new" }); continue; }
        const costChanged = prev.cost !== next.cost, stockChanged = prev.stock !== next.stock;
        const proposal = costChanged ? priceFor(next.cost, rules) : null;
        const uniqueStorePrice = products?.skus.get(sku)?.length === 1 ? products.storePrices.get(sku) : null;
        const currentPrice = uniqueStorePrice ?? priceFor(prev.cost, rules);
        if (proposal !== null && (proposal <= next.cost || (proposal - next.cost) * 10000n < proposal * rules.floor)) {
          notices.push("Precio propuesto por debajo del margen mínimo o sin ganancia");
        }
        if (proposal !== null && currentPrice > 0n) {
          const difference = proposal > currentPrice ? proposal - currentPrice : currentPrice - proposal;
          if (difference * 10000n > currentPrice * rules.change) notices.push("Variación de precio supera el límite");
        }
        if (stockChanged && Math.abs(next.stock - prev.stock) > rules.stockLimit) notices.push("Variación de stock supera el límite");
        if (notices.length) { add({ ...entry, status: "blocked", price: money(proposal) }); continue; }
        entry.status = costChanged || stockChanged ? "changed" : "unchanged";
        entry.price = money(proposal);
        if (costChanged && products) {
          const hits = products.skus.get(sku) ?? [];
          const id = hits[0], group = products.groups.get(id);
          if (hits.length !== 1 || !products.validGroup(group)) {
            notices.push("Precio sin exportar: SKU o grupo de variantes Shopify no es inequívoco");
          } else if (uniqueStorePrice === 0n) {
            notices.push("Precio sin exportar: el precio original de Shopify es cero");
          } else if (uniqueStorePrice !== proposal) {
            if (!productChanges.has(id)) productChanges.set(id, new Map());
            productChanges.get(id).set(sku, entry.price);
            entry.priceExport = true;
          }
        }
        if (stockChanged && inventory) {
          const hits = inventory.skus.get(sku) ?? [];
          if (hits.length !== 1 || !inventory.valid(hits[0])) {
            notices.push("Stock sin exportar: falta una fila inequívoca, sin bin y con conteo de seguridad");
          } else if (products && (products.skus.get(sku)?.length !== 1 || products.identities.get(sku) !== inventory.identity(hits[0]))) {
            notices.push("Stock sin exportar: la variante de inventario no coincide con Productos Shopify");
          } else if (next.stock < inventory.reserved(hits[0])) {
            notices.push("Stock sin exportar: el conteo propuesto es inferior al total comprometido o no disponible");
          } else if (Number(exactCell(hits[0], inventory.current)) !== next.stock) {
            inventoryRows.push(inventory.cols.map(col => col === inventory.next ? next.stock : exactCell(hits[0], col)));
            entry.stockExport = true;
          }
        }
        add(entry);
      }
    }
    const priceRows = [];
    for (const [id, group] of productChanges) {
      for (const row of products.groups.get(id)) {
        priceRows.push(products.columns.map(col => col === products.price
          ? (group.get(exactCell(row, products.sku)) ?? exactCell(row, col)) : exactCell(row, col)));
      }
    }
    const serialize = row => ({
      proveedor: row.name, sku: row.sku, estado: statuses[row.status], status: row.status,
      filas_anteriores: row.previousLines ?? formatValue(row.before?.line), filas_actuales: row.currentLines ?? formatValue(row.after?.line),
      costo_anterior: money(row.before?.cost ?? null), costo_actual: money(row.after?.cost ?? null),
      stock_anterior: formatValue(row.before?.stock), stock_actual: formatValue(row.after?.stock),
      moneda: row.after?.currency || row.before?.currency || "", precio_propuesto: row.price,
      exporta_precio: Boolean(row.priceExport), exporta_stock: Boolean(row.stockExport), notas: row.notices.join(" · "),
    });
    return {
      records: results.map(serialize),
      prices: priceRows.length ? { headers: products.columns.map(col => products.table.headers[col]), rows: priceRows } : null,
      inventory: inventoryRows.length ? { headers: inventory.definitions.map(([header]) => header), rows: inventoryRows } : null,
    };
  }

  return { autoMap, findColumn, reports, safeCell, statuses };
})();

if (typeof module !== "undefined") module.exports = Catalogo;
