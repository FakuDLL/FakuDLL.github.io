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
    /<title>Facundo Robayna — Junior Software Developer<\/title>/i,
  );
  assert.match(html, /I build web and/);
  assert.match(html, /software solutions/);
  assert.match(html, /StellarMinds/);
  assert.match(html, /Appointment management/);
  assert.match(html, /Nutrition tracking/);
  assert.match(html, /SONDA/);
  assert.match(html, /facundorobayna03@gmail\.com/);
  assert.match(html, /lang="en"/);
  assert.match(html, /<meta name="google" content="notranslate"/i);
  assert.match(html, /translate="no"/i);
  assert.match(html, /class="notranslate"/i);
  assert.match(html, /og\.png/);
  assert.match(html, /favicon-fr\.svg/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Skeleton/i);
});

test("keeps truthful links and project metadata", async () => {
  const [
    page,
    contactControls,
    projectShowcase,
    globalsCss,
    layout,
    i18n,
    languageContext,
    packageJson,
    favicon,
  ] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/ContactControls.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/ProjectShowcase.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/i18n.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/LanguageContext.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../public/favicon-fr.svg", import.meta.url), "utf8"),
    ]);

  assert.match(i18n, /Proyecto académico grupal/);
  assert.match(i18n, /Academic group project/);
  assert.match(i18n, /creado y validado mediante un flujo de agentes de IA/);
  assert.match(i18n, /created and validated through an AI-agent workflow/);
  assert.match(i18n, /Algunos repositorios están publicados/);
  assert.match(i18n, /Some repositories are public/);
  assert.doesNotMatch(i18n, /no está publicado actualmente/);
  assert.match(page, /<ConnectProfileButton \/>/);
  assert.match(page, /<ConnectProfileButton placement="contact" \/>/);
  assert.match(page, /<ProjectShowcase projects=\{projects\} \/>/);
  assert.match(page, /\/profile\/facundo-robayna\.webp/);
  assert.match(i18n, /Retrato de Facundo Robayna/);
  assert.match(i18n, /Portrait of Facundo Robayna/);
  assert.match(i18n, /\/projects\/gestion-atenciones\/vista-general\.webp/);
  assert.match(i18n, /\/projects\/gestion-atenciones\/servicios\.png/);
  assert.match(i18n, /\/projects\/gestion-atenciones\/tabla-atenciones\.webp/);
  assert.match(i18n, /\/projects\/gestion-atenciones\/resumen\.png/);
  assert.match(i18n, /\/projects\/stellarminds\/presentacion\.svg/);
  assert.match(i18n, /\/projects\/stellarminds\/casos-de-uso\.png/);
  assert.match(i18n, /\/projects\/stellarminds\/login\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/arquitectura-capas\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/swagger-api\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/equipos-admin\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/alta-prestamo-coordinador\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/devoluciones-coordinador\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/mis-prestamos-socio\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/auditoria-admin\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/socios-telescopio-admin\.webp/);
  assert.match(i18n, /\/projects\/stellarminds\/ranking-objetos\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/vista-inicio\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/seccion-proyectos\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/sobre-mi-desktop\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/tecnologias-desktop\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/inicio-mobile\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/sobre-mi-mobile\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/tecnologias-mobile\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/proyectos-mobile\.webp/);
  assert.match(i18n, /\/projects\/portfolio\/contacto-mobile\.webp/);
  assert.doesNotMatch(page, /<CopyEmailButton \/>/);
  assert.match(page, /<SectionLink/);
  assert.doesNotMatch(page, /mailto:/);
  assert.match(contactControls, /event\.preventDefault\(\)/);
  assert.match(contactControls, /window\.scrollTo\(0, targetTop\)/);
  assert.match(contactControls, /event\.currentTarget\.blur\(\)/);
  assert.match(contactControls, /showModal/);
  assert.match(contactControls, /const titleId = useId\(\)/);
  assert.match(contactControls, /placement === "contact"/);
  assert.match(contactControls, /className="connect-avatar"/);
  assert.match(contactControls, /\/profile\/facundo-robayna\.webp/);
  assert.match(i18n, /Disponible para oportunidades junior/);
  assert.match(i18n, /Open to junior opportunities/);
  assert.match(contactControls, /navigator\.clipboard\.writeText/);
  assert.match(projectShowcase, /showModal/);
  assert.match(projectShowcase, /aria-haspopup="dialog"/);
  assert.match(projectShowcase, /copy\.openDetails/);
  assert.match(projectShowcase, /copy\.viewCode/);
  assert.match(projectShowcase, /copy\.comingSoon/);
  assert.match(projectShowcase, /copy\.openFullImage/);
  assert.match(projectShowcase, /project-gallery-thumbnails--compact/);
  assert.match(projectShowcase, /copy\.previous/);
  assert.match(projectShowcase, /copy\.next/);
  assert.match(projectShowcase, /copy\.showAll/);
  assert.match(projectShowcase, /copy\.showLess/);
  assert.match(projectShowcase, /event\.key === "ArrowLeft"/);
  assert.match(projectShowcase, /event\.key === "ArrowRight"/);
  assert.match(projectShowcase, /mediaType === "video"/);
  assert.doesNotMatch(projectShowcase, /className="project-card-link"/);
  assert.match(globalsCss, /scroll-behavior:\s*auto/);
  assert.match(globalsCss, /\.project-dialog::backdrop/);
  assert.match(globalsCss, /\.language-dialog::backdrop/);
  assert.match(globalsCss, /\.language-options/);
  assert.match(globalsCss, /\.project-gallery-thumbnails/);
  assert.match(globalsCss, /overflow-anchor:\s*none/);
  assert.doesNotMatch(globalsCss, /animation-timeline:\s*view/);
  assert.match(
    globalsCss,
    /\.contact-heading h2\s*\{[^}]*font-size:\s*clamp\(4rem,\s*20vw,\s*5\.25rem\)/s,
  );
  assert.doesNotMatch(globalsCss, /\.contact-section h2\s*\{/);
  assert.match(
    globalsCss,
    /\.connect-identity h2\s*\{[^}]*font-size:\s*clamp\(2\.25rem,\s*6vw,\s*4\.5rem\)/s,
  );
  assert.doesNotMatch(globalsCss, /font-size:\s*clamp\(6rem,\s*28vw,\s*9rem\)/);
  assert.match(
    globalsCss,
    /\.contact-copy\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto/s,
  );
  assert.match(globalsCss, /\.contact-connect\s*\{[^}]*min-width:\s*178px/s);
  assert.match(i18n, /Servidor FiveM/);
  assert.match(i18n, /FiveM server/);
  assert.match(i18n, /Desarrollé y adapté scripts en Lua/);
  assert.match(i18n, /I developed and adapted Lua scripts/);
  assert.match(contactControls, /href="\/cv-facundo-robayna\.pdf"/);
  assert.match(contactControls, /download="Facundo-Robayna-CV\.pdf"/);
  assert.doesNotMatch(page, /aria-disabled="true"/);
  assert.match(languageContext, /navigator\.language\.toLowerCase\(\)/);
  assert.match(languageContext, /\? "es"\s*:\s*"en"/);
  assert.match(languageContext, /dialog\.showModal\(\)/);
  assert.match(languageContext, /event\.preventDefault\(\)/);
  assert.doesNotMatch(languageContext, /localStorage|sessionStorage/);
  assert.match(i18n, /¿Cómo querés ver el portfolio\?/);
  assert.match(i18n, /How would you like to view the portfolio\?/);
  assert.match(layout, /<LanguageProvider>\{children\}<\/LanguageProvider>/);
  assert.match(
    layout,
    /<html lang="en" translate="no" className="notranslate">/,
  );
  assert.match(layout, /google:\s*"notranslate"/);
  assert.match(page, /className="tech-grid notranslate"/);
  assert.match(projectShowcase, /className="tags notranslate"/);
  assert.match(layout, /https:\/\/fakudll\.github\.io\//);
  assert.match(layout, /url:\s*"\/favicon-fr\.svg"/);
  assert.match(favicon, />FR<\/text>/);
  assert.match(favicon, /#b8f24a/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
