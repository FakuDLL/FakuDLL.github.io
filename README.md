# Portfolio de Facundo Robayna

Portfolio profesional desarrollado para presentar mi perfil como estudiante de
Tecnologías de la Información y Desarrollador de Software Junior en Montevideo,
Uruguay.

**Sitio publicado:** [fakudll.github.io](https://fakudll.github.io/)

![Vista previa del portfolio](public/og.png)

## Sobre el proyecto

El objetivo no fue utilizar una plantilla genérica, sino construir una
experiencia personal que combinara una estética técnica y editorial con
contenido verificable sobre mi formación, proyectos y experiencia.

La dirección visual toma como referencia el lenguaje oscuro, minimalista y
tipográfico de [mxb.dev](https://mxb.dev/), sin copiar su código, textos,
componentes ni identidad. El sistema visual fue implementado desde cero con CSS.

El resultado es un sitio de una sola página, rápido y responsive, con cinco
recorridos principales:

- Inicio y presentación profesional.
- Perfil y forma de trabajo.
- Tecnologías y conocimientos actuales.
- Proyectos académicos, personales e independientes.
- Contacto y descarga directa del CV.

## Decisiones de producto

### Contenido antes que decoración

Cada sección fue escrita a partir de experiencia real. Los proyectos se
diferencian entre académicos, personales, prototipos e independientes, evitando
presentar pruebas de concepto como productos comerciales.

### Identidad visual propia

El diseño utiliza fondo oscuro, una única tonalidad verde lima como acento,
tipografía de gran escala, grilla sutil y navegación flotante con efecto
glassmorphism. Las animaciones son breves y se desactivan cuando el sistema
solicita reducir el movimiento.

### Contacto sin depender del sistema operativo

El primer enfoque utilizaba un enlace `mailto:`, pero eso obligaba al visitante
a tener una aplicación de correo configurada. Se reemplazó por una interacción
propia: “Contactar” desplaza la página hasta la sección correspondiente y
“Copiar email” utiliza la API del portapapeles con una alternativa compatible
para navegadores más antiguos.

### Publicación estática

El portfolio se desarrolla con React, TypeScript y Vinext. Para GitHub Pages se
genera una portada estática dentro de `dist/client`, por lo que el sitio público
no necesita una base de datos, secretos, sesiones ni un servidor de aplicación.

También conserva una salida compatible con Cloudflare Workers para su
publicación mediante Sites.

## Tecnologías

- React 19 y TypeScript.
- Next.js y Vinext sobre Vite.
- CSS moderno sin librerías visuales externas.
- React Server Components y componentes cliente únicamente donde hay
  interacción.
- GitHub Actions y GitHub Pages.
- Cloudflare Workers para la publicación alternativa.
- Node Test Runner y ESLint para validación.

## Arquitectura

```text
app/
├── page.tsx               Contenido y estructura principal
├── ContactControls.tsx    Interacciones de contacto
├── globals.css            Sistema visual y responsive
└── layout.tsx             Metadata, SEO y configuración global

public/
├── cv-facundo-robayna.pdf
├── og.png
├── robots.txt
└── sitemap.xml

scripts/
└── prerender-static.mjs   Generación para GitHub Pages

tests/
└── rendered-html.test.mjs Pruebas del HTML y contenido publicado
```

## Accesibilidad y rendimiento

- HTML semántico con encabezados, navegación y regiones identificables.
- Contraste alto y estados de foco visibles para navegación por teclado.
- Adaptación completa para escritorio y móvil.
- Compatibilidad con `prefers-reduced-motion`.
- Sin videos, fondos 3D ni dependencias visuales pesadas.
- Imagen Open Graph, `robots.txt`, sitemap y metadata social.
- CV servido como archivo PDF directo.

## Seguridad y privacidad

En la revisión más reciente se comprobó lo siguiente:

- No hay contraseñas, tokens, claves API, claves privadas ni archivos `.env`
  versionados.
- Tampoco se encontraron patrones de secretos en el historial alcanzable de
  Git.
- Los archivos `.env*`, certificados y salidas locales están excluidos mediante
  `.gitignore`.
- `npm audit` informa **0 vulnerabilidades conocidas** después de actualizar y
  fijar las dependencias corregidas.
- El sitio de GitHub Pages es estático y no procesa datos introducidos por
  visitantes.
- El identificador de `.openai/hosting.json` referencia el proyecto de
  publicación, pero no es una credencial y no permite autenticarse.

El email y el número telefónico sí son datos públicos de forma intencional:
aparecen en el portfolio y dentro del CV descargable. Esto facilita el contacto
profesional, aunque puede generar spam. Ninguna auditoría puede garantizar riesgo
cero para siempre; las dependencias deben revisarse nuevamente al actualizarlas.

## Ejecutar localmente

Requisitos:

- Node.js 22.13 o superior.
- npm.

```bash
git clone https://github.com/FakuDLL/FakuDLL.github.io.git
cd FakuDLL.github.io
npm install
npm run dev
```

La aplicación queda disponible normalmente en `http://localhost:3000`.

## Validación

```bash
npm run lint
npm test
npm run build:pages
npm audit
```

Las pruebas renderizan la aplicación y verifican el título, contenido principal,
proyectos, metadata, contacto, enlace del CV y ausencia de enlaces `mailto:` en
la interfaz.

## Publicación

Cada actualización enviada a `main` ejecuta
`.github/workflows/deploy-pages.yml`:

1. Instala las dependencias con `npm ci`.
2. Compila la aplicación.
3. Genera el HTML estático para GitHub Pages.
4. Empaqueta `dist/client`.
5. Publica el resultado en producción.

## Evolución del portfolio

El proyecto pasó por varias iteraciones:

1. Definición del contenido profesional y estructura inicial.
2. Rediseño oscuro y técnico con sistema visual propio.
3. Navegación responsive y mejoras de accesibilidad.
4. Corrección del contacto para eliminar la dependencia de `mailto:`.
5. Incorporación del CV y presentación de FiveM como proyecto de desarrollo.
6. Auditoría de secretos, actualización de dependencias y eliminación de código
   de plantilla que no era utilizado.

## Autor

**Facundo Robayna**

- [GitHub](https://github.com/FakuDLL)
- [LinkedIn](https://www.linkedin.com/in/facundo-robayna-6612a7290/)
- Email: `facundorobayna03@gmail.com`

## Uso del código

El repositorio es público para que reclutadores y otros desarrolladores puedan
examinar el proceso y la calidad técnica. Actualmente no incluye una licencia de
código abierto; su publicación no concede automáticamente permiso para copiar,
modificar o redistribuir el proyecto.
