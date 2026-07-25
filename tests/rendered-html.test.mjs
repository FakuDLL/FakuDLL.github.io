import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
}

test("server-renders the final portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Facundo Robayna — Desarrollador de Software Junior<\/title>/i,
  );
  assert.match(html, /Desarrollo software/);
  assert.match(html, /StellarMinds/);
  assert.match(html, /Gestión de atenciones/);
  assert.match(html, /Seguimiento nutricional/);
  assert.match(html, /SONDA/);
  assert.match(html, /facundorobayna03@gmail\.com/);
  assert.match(html, /lang="es"/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Skeleton/i);
});

test("keeps truthful links and project metadata", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Proyecto académico grupal/);
  assert.match(page, /creado y validado mediante un flujo de agentes de IA/);
  assert.match(page, /no está publicado actualmente/);
  assert.match(page, /aria-disabled="true"/);
  assert.match(layout, /https:\/\/fakudll\.github\.io\//);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
