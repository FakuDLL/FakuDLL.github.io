import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("prerender", `${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://fakudll.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`No se pudo generar la portada estática: ${response.status}`);
}

const outputDirectory = new URL("../dist/client/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(new URL("index.html", outputDirectory), await response.text()),
  writeFile(new URL(".nojekyll", outputDirectory), ""),
]);

console.log("GitHub Pages: dist/client/index.html generado correctamente.");
