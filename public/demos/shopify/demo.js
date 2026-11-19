/* global Archivos, Catalogo, EJEMPLO */
"use strict";

const requested = new URLSearchParams(location.search).get("lang");
const locale = requested === "es" || requested === "en" ? requested : navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
const es = locale === "es";
const strings = es ? {
  back: "Volver al portafolio",
  label: "Prototipo funcional · Datos ficticios",
  title: "Precios y stock para Shopify",
  intro: "Compará dos listas de proveedores por SKU, recalculá precios y descargá CSV de ejemplo. La demo usa datos ficticios y funciona sin conexión a una tienda.",
  rules: "Regla de precio",
  method: "Método",
  markup: "Recargo sobre costo",
  margin: "Margen bruto objetivo",
  rate: "Porcentaje (%)",
  compare: "Recalcular",
  limits: "El ejemplo usa USD, un margen bruto mínimo de 15% y un límite de 30% para la variación de precio.",
  results: "Resultado de la comparación",
  status: "Estado",
  cost: "Costo (USD)",
  stock: "Stock",
  price: "Precio propuesto",
  review: "Nota de revisión",
  files: "Archivos de ejemplo",
  reviewFiles: "Los CSV usan un catálogo ficticio. Los archivos de precios e inventario incluyen los cambios que pasan las validaciones y se deben revisar antes de importar.",
  report: "Informe de cambios",
  prices: "CSV de precios",
  inventory: "CSV de inventario",
  sourceTitle: "Ver archivos ficticios de origen",
  before: "Lista anterior del proveedor",
  after: "Lista actual del proveedor",
  contact: "Consultar por un flujo para tu tienda",
  failure: "No se pudo calcular el ejemplo. Revisá el porcentaje.",
  row: "Fila",
} : {
  title: "Shopify supplier updates",
  failure: "The sample could not be recalculated. Check the percentage.",
  row: "Row",
};

document.documentElement.lang = locale;
document.title = strings.title + " · Facundo Robayna";
document.querySelector('a[hreflang="' + locale + '"]').setAttribute("aria-current", "page");
for (const element of document.querySelectorAll("[data-copy]")) {
  if (strings[element.dataset.copy]) element.textContent = strings[element.dataset.copy];
}
const get = id => document.getElementById(id);
const form = get("rules");
const statuses = es ? Catalogo.statuses : {
  changed: "Changed", unchanged: "Unchanged", new: "New", missing: "Missing", blocked: "Held",
};

const tables = Object.fromEntries(Object.entries(EJEMPLO).map(([file, data]) => [file, Archivos.csv(data)]));
const before = tables["anterior.csv"];
const after = tables["actual.csv"];
const pair = {
  name: es ? "Proveedor ficticio" : "Fictional supplier",
  before, after,
  beforeMap: Catalogo.autoMap(before),
  afterMap: Catalogo.autoMap(after),
};
const shop = {
  products: tables["productos_shopify.csv"],
  inventory: tables["inventario_shopify.csv"],
  location: "Depósito central",
  onHand: true,
};

function download(filename, table) {
  const data = new Blob([Archivos.toCsv(table.headers, table.rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function reviewNote(row) {
  if (!row.notas) {
    if (row.status === "missing") return es ? "Conservar sin modificar" : "Leave unchanged";
    if (row.status === "new") return es ? "Revisar antes de agregar" : "Review before adding";
    return "—";
  }
  if (es) return row.notas;
  return row.notas.split(" · ").map(note => {
    if (note.includes("Falta SKU")) return "Missing SKU";
    if (note.includes("Falta stock")) return "Missing stock";
    if (note.includes("Moneda EUR distinta de USD")) return "Currency mismatch: EUR instead of USD";
    if (note.includes("SKU duplicado")) return "Duplicate SKU";
    if (note.includes("margen mínimo")) return "Below the minimum gross margin";
    if (note.includes("Variación de precio")) return "Price change exceeds the limit";
    return row.status === "blocked" ? "Held for review" : "Review before export";
  }).join(" · ");
}

function values(row) {
  const paired = (previous, current) => (previous === "" ? "—" : previous) + " → " + (current === "" ? "—" : current);
  return [
    row.sku || (strings.row + " " + row.filas_actuales),
    statuses[row.status],
    paired(row.costo_anterior, row.costo_actual),
    paired(row.stock_anterior, row.stock_actual),
    row.precio_propuesto ? "USD " + row.precio_propuesto : "—",
    reviewNote(row),
  ];
}

function render(event) {
  event?.preventDefault();
  const error = get("error");
  try {
    const result = Catalogo.reports([pair], {
      currency: "USD",
      decimal: ".",
      mode: get("method").value,
      rate: get("rate").value,
      floor: "15",
      maxPrice: "30",
      maxStock: "250",
    }, shop);
    error.hidden = true;
    get("summary").replaceChildren(...Object.entries(statuses).map(([key, label]) => {
      const box = document.createElement("div");
      const term = document.createElement("dt");
      const total = document.createElement("dd");
      term.textContent = label;
      total.textContent = result.records.filter(row => row.status === key).length;
      box.append(term, total);
      return box;
    }));
    const rows = result.records.map(values);
    get("records").replaceChildren(...rows.map(row => {
      const tr = document.createElement("tr");
      for (const value of row) tr.insertCell().textContent = value;
      return tr;
    }));
    get("download-report").onclick = () => download("sample-review.csv", {
      headers: [...document.querySelectorAll("#results-title + dl + div th")].map(item => item.textContent),
      rows,
    });
    for (const [id, filename, output] of [
      ["download-prices", "sample-shopify-prices.csv", result.prices],
      ["download-stock", "sample-shopify-inventory.csv", result.inventory],
    ]) {
      const button = get(id);
      button.disabled = !output;
      button.onclick = output ? () => download(filename, output) : null;
    }
  } catch {
    error.textContent = strings.failure;
    error.hidden = false;
  }
}

get("before").textContent = EJEMPLO["anterior.csv"];
get("after").textContent = EJEMPLO["actual.csv"];
form.addEventListener("submit", render);
get("interactive").hidden = false;
render();
