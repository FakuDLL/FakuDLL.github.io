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
  assert.match(html, /Construyo soluciones/);
  assert.match(html, /web y de software/);
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
  const [page, contactControls, globalsCss, layout, packageJson] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/ContactControls.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  assert.match(page, /Proyecto académico grupal/);
  assert.match(page, /creado y validado mediante un flujo de agentes de IA/);
  assert.match(page, /Algunos\s+repositorios están publicados/);
  assert.match(page, /otros se mantienen privados/);
  assert.doesNotMatch(page, /no está publicado actualmente/);
  assert.match(page, /<ConnectProfileButton \/>/);
  assert.match(page, /<ConnectProfileButton placement="contact" \/>/);
  assert.doesNotMatch(page, /<CopyEmailButton \/>/);
  assert.match(page, /<SectionLink/);
  assert.doesNotMatch(page, /mailto:/);
  assert.match(contactControls, /event\.preventDefault\(\)/);
  assert.match(contactControls, /window\.scrollTo\(0, targetTop\)/);
  assert.match(contactControls, /event\.currentTarget\.blur\(\)/);
  assert.match(contactControls, /showModal/);
  assert.match(contactControls, /const titleId = useId\(\)/);
  assert.match(contactControls, /placement === "contact"/);
  assert.match(contactControls, /Disponible para oportunidades junior/);
  assert.match(contactControls, /navigator\.clipboard\.writeText/);
  assert.match(globalsCss, /scroll-behavior:\s*auto/);
  assert.match(globalsCss, /overflow-anchor:\s*none/);
  assert.doesNotMatch(globalsCss, /animation-timeline:\s*view/);
  assert.match(
    globalsCss,
    /\.contact-section h2\s*\{[^}]*font-size:\s*clamp\(4rem,\s*20vw,\s*5\.25rem\)/s,
  );
  assert.doesNotMatch(globalsCss, /font-size:\s*clamp\(6rem,\s*28vw,\s*9rem\)/);
  assert.match(
    globalsCss,
    /\.contact-copy\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto/s,
  );
  assert.match(globalsCss, /\.contact-connect\s*\{[^}]*min-width:\s*178px/s);
  assert.match(page, /Servidor FiveM/);
  assert.match(page, /Desarrollé y adapté scripts en Lua/);
  assert.match(contactControls, /href="\/cv-facundo-robayna\.pdf"/);
  assert.match(contactControls, /download="Facundo-Robayna-CV\.pdf"/);
  assert.doesNotMatch(page, /aria-disabled="true"/);
  assert.match(layout, /https:\/\/fakudll\.github\.io\//);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
