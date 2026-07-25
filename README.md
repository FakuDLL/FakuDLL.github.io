# Portfolio de Facundo Robayna

Portfolio profesional de **Facundo Robayna**, estudiante de Analista en
Tecnologías de la Información en Universidad ORT Uruguay y desarrollador de
software junior en Montevideo.

El sitio presenta formación, tecnologías, proyectos académicos y personales,
experiencia adicional y vías de contacto con un diseño responsive, accesible y
optimizado para buscadores y redes sociales.

## Tecnologías del sitio

- React y TypeScript
- Vinext / Vite
- CSS moderno sin bibliotecas visuales externas
- Despliegue automático en GitHub Pages
- Despliegue compatible con Cloudflare Workers mediante Sites

## Ejecutar en local

Requisitos:

- Node.js 22.13 o superior
- npm

```bash
npm install
npm run dev
```

La aplicación estará disponible normalmente en
`http://localhost:3000`.

## Validar una versión

```bash
npm run build
npm test
```

El build genera la salida de producción y los tests comprueban que el HTML
principal contiene el contenido final, la metadata correcta y no conserva
elementos de la plantilla inicial.

## Actualizar contenidos

- **Textos, tecnologías, proyectos y experiencia:** editar `app/page.tsx`.
- **Colores, espaciado y responsive:** editar `app/globals.css`.
- **SEO y tarjeta al compartir:** editar `app/layout.tsx` y reemplazar
  `public/og.png` si cambia la identidad visual.
- **Datos de contacto:** buscar la sección `Contacto` en `app/page.tsx`.

### Actualizar el CV

El botón “Descargar CV” apunta a `public/cv-facundo-robayna.pdf`. Para publicar
una versión nueva, reemplazar ese archivo manteniendo el mismo nombre.

## Publicación

Los cambios enviados a la rama `main` se publican mediante GitHub Pages. El
workflow de `.github/workflows/deploy-pages.yml` compila el sitio, prepara la
salida estática y crea el despliegue.

Para actualizar el portfolio:

```bash
git add .
git commit -m "Actualiza portfolio"
git push
```

## Privacidad y contenido

El formulario se reemplazó por acciones locales para ir a la sección de contacto
y copiar el email, sin exponer secretos ni depender de una aplicación de correo.
Los proyectos enlazan a código únicamente cuando existe un repositorio público
verificable.

## Contacto

- [GitHub](https://github.com/FakuDLL)
- [LinkedIn](https://www.linkedin.com/in/facundo-robayna-6612a7290/)
- [Email](mailto:facundorobayna03@gmail.com)

---

© Facundo Robayna
