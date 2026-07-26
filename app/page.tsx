import {
  ConnectProfileButton,
  SectionLink,
} from "./ContactControls";
import { ProjectShowcase } from "./ProjectShowcase";

const technologies = [
  "C#",
  ".NET",
  "ASP.NET Web API",
  "Entity Framework Core",
  "SQL Server",
  "MySQL",
  "JavaScript",
  "HTML",
  "CSS",
  "Bootstrap",
  "Git y GitHub",
  "REST APIs",
  "Arquitectura en capas",
  "DTOs y mappers",
  "IA aplicada al desarrollo",
];

const projects = [
  {
    number: "01",
    type: "Proyecto académico grupal",
    title: "StellarMinds",
    subtitle: "Gestión para un observatorio astronómico",
    description:
      "Sistema desarrollado en equipo para administrar socios, equipamiento astronómico, préstamos, devoluciones y sesiones de observación. La solución aplica arquitectura en capas, DTOs, mappers y control de roles. También integra Gemini como apoyo para evaluar equipamiento de observación.",
    stack: [
      "C#",
      ".NET",
      "ASP.NET Web API",
      "Entity Framework Core",
      "SQL Server",
      "REST API",
    ],
    highlights: [
      "Administración de socios y roles",
      "Préstamos y devoluciones de equipamiento",
      "Sesiones de observación y evaluación asistida por Gemini",
    ],
    galleryTitle: "Sistema, roles y arquitectura",
    gallery: [
      {
        src: "/projects/stellarminds/presentacion.svg",
        alt: "Presentación visual del proyecto StellarMinds",
        caption: "Presentación general del sistema",
      },
      {
        src: "/projects/stellarminds/equipos-admin.webp",
        alt: "Catálogo de equipos astronómicos administrado en StellarMinds",
        caption: "Administrador · catálogo y disponibilidad de equipos",
      },
      {
        src: "/projects/stellarminds/alta-prestamo-coordinador.webp",
        alt: "Formulario de alta de préstamos para el rol coordinador en StellarMinds",
        caption: "Coordinador · alta de préstamo y selección de equipamiento",
      },
      {
        src: "/projects/stellarminds/devoluciones-coordinador.webp",
        alt: "Gestión de devoluciones de préstamos en StellarMinds",
        caption: "Coordinador · préstamos pendientes de devolución",
      },
      {
        src: "/projects/stellarminds/mis-prestamos-socio.webp",
        alt: "Consulta mensual de préstamos del rol socio en StellarMinds",
        caption: "Socio · consulta de préstamos y atrasos",
      },
      {
        src: "/projects/stellarminds/auditoria-admin.webp",
        alt: "Historial de auditoría de préstamos y devoluciones en StellarMinds",
        caption: "Administrador · auditoría de operaciones",
      },
      {
        src: "/projects/stellarminds/socios-telescopio-admin.webp",
        alt: "Consulta de socios asociados a un telescopio en StellarMinds",
        caption: "Consulta de socios por telescopio",
      },
      {
        src: "/projects/stellarminds/ranking-objetos.webp",
        alt: "Ranking de objetos celestes observados en StellarMinds",
        caption: "Ranking de objetos celestes por observaciones",
      },
      {
        src: "/projects/stellarminds/login.webp",
        alt: "Pantalla de inicio de sesión de StellarMinds ejecutándose localmente",
        caption: "Acceso al cliente web MVC",
      },
      {
        src: "/projects/stellarminds/arquitectura-capas.webp",
        alt: "Estructura de carpetas por capas de la solución StellarMinds",
        caption: "Solución organizada por dominio, aplicación, DTOs, datos y API",
      },
      {
        src: "/projects/stellarminds/swagger-api.webp",
        alt: "Documentación Swagger de la API REST de StellarMinds",
        caption: "Contratos y endpoints de la Web API",
      },
      {
        src: "/projects/stellarminds/casos-de-uso.png",
        alt: "Diagrama de casos de uso de StellarMinds",
        caption: "Casos de uso, actores y funciones principales",
      },
    ],
    repositoryUrl: "https://github.com/FakuDLL/StellarMinds",
  },
  {
    number: "02",
    type: "Proyecto personal",
    title: "Portfolio personal",
    subtitle: "Sitio web para presentar mi perfil y proyectos",
    description:
      "Portfolio web diseñado y desarrollado para presentar mi perfil profesional, tecnologías, proyectos y formas de contacto. Incluye una interfaz responsive, navegación accesible, metadatos para compartir el sitio y pruebas automatizadas de renderizado.",
    stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub Pages"],
    highlights: [
      "Diseño responsive para escritorio y dispositivos móviles",
      "Navegación accesible y fichas detalladas de proyectos",
      "Pruebas automatizadas y publicación continua",
    ],
    galleryTitle: "Escritorio y celular",
    gallery: [
      {
        src: "/projects/portfolio/vista-inicio.webp",
        alt: "Portada del portfolio personal vista en escritorio",
        caption: "Inicio · versión de escritorio",
      },
      {
        src: "/projects/portfolio/sobre-mi-desktop.webp",
        alt: "Sección Sobre mí del portfolio vista en escritorio",
        caption: "Sobre mí · versión de escritorio",
      },
      {
        src: "/projects/portfolio/tecnologias-desktop.webp",
        alt: "Sección de tecnologías del portfolio vista en escritorio",
        caption: "Tecnologías · versión de escritorio",
      },
      {
        src: "/projects/portfolio/seccion-proyectos.webp",
        alt: "Sección de proyectos del portfolio vista en escritorio",
        caption: "Proyectos · versión de escritorio",
      },
      {
        src: "/projects/portfolio/inicio-mobile.webp",
        alt: "Portada del portfolio adaptada a un teléfono celular",
        caption: "Inicio · versión para celular",
      },
      {
        src: "/projects/portfolio/sobre-mi-mobile.webp",
        alt: "Sección Sobre mí del portfolio adaptada a un teléfono celular",
        caption: "Sobre mí · versión para celular",
      },
      {
        src: "/projects/portfolio/tecnologias-mobile.webp",
        alt: "Sección de tecnologías adaptada a un teléfono celular",
        caption: "Tecnologías · versión para celular",
      },
      {
        src: "/projects/portfolio/proyectos-mobile.webp",
        alt: "Sección de proyectos adaptada a un teléfono celular",
        caption: "Proyectos · versión para celular",
      },
      {
        src: "/projects/portfolio/contacto-mobile.webp",
        alt: "Sección de contacto adaptada a un teléfono celular",
        caption: "Contacto · versión para celular",
      },
    ],
    repositoryUrl: "https://github.com/FakuDLL/FakuDLL.github.io",
  },
  {
    number: "03",
    type: "Proyecto personal",
    title: "Gestión de atenciones",
    subtitle: "Herramienta interna para cosmetología médica",
    description:
      "Aplicación orientada a centralizar el registro y análisis de atenciones de un equipo de cosmetología médica. Permite consultar métricas diarias, semanales y mensuales, filtrar servicios realizados y generar resúmenes de ingresos para facilitar el seguimiento operativo.",
    stack: ["Gestión de datos", "Métricas operativas", "Filtros", "Reportes"],
    highlights: [
      "Registro y edición de atenciones",
      "Configuración de servicios, precios y porcentajes",
      "Indicadores diarios, semanales, mensuales e históricos",
      "Filtros, copias de seguridad e importación de datos",
    ],
    gallery: [
      {
        src: "/projects/gestion-atenciones/vista-general.webp",
        alt: "Vista general de la aplicación de gestión de atenciones",
        caption: "Vista general del sistema",
      },
      {
        src: "/projects/gestion-atenciones/servicios.png",
        alt: "Configuración de servicios y precios de la aplicación",
        caption: "Administración de servicios y precios",
      },
      {
        src: "/projects/gestion-atenciones/tabla-atenciones.webp",
        alt: "Tabla de atenciones con filtros, importación y copias de seguridad",
        caption: "Gestión y edición de atenciones",
      },
      {
        src: "/projects/gestion-atenciones/ganancia-semanal.png",
        alt: "Consulta de ganancia semanal",
        caption: "Consulta semanal por fecha",
      },
      {
        src: "/projects/gestion-atenciones/ganancia-mensual.png",
        alt: "Consulta de ganancia mensual",
        caption: "Resumen mensual por período",
      },
      {
        src: "/projects/gestion-atenciones/resumen.png",
        alt: "Panel de resumen con métricas de atenciones",
        caption: "Panel general de métricas",
      },
    ],
  },
  {
    number: "04",
    type: "Prototipo con agentes de IA",
    title: "Seguimiento nutricional",
    subtitle: "Prototipo Android de calorías y macronutrientes",
    description:
      "Prototipo funcional creado y validado mediante un flujo de agentes de IA. Permitía registrar alimentos por texto, chat e imágenes, calcular calorías y macronutrientes y consultar una base precargada de alimentos. Gemini apoyaba el análisis de la información nutricional. No fue publicado comercialmente.",
    stack: ["Inteligencia artificial", "Gemini", "Desarrollo Android"],
    highlights: [
      "Registro de alimentos por texto, chat e imágenes",
      "Cálculo de calorías y macronutrientes",
      "Análisis nutricional asistido por Gemini",
    ],
  },
  {
    number: "05",
    type: "Proyecto independiente · Mar 2023 — Ene 2024",
    title: "Servidor FiveM",
    subtitle: "Desarrollo para servidor multijugador de GTA V",
    description:
      "Desarrollé y adapté scripts en Lua, diseñé y administré una base de datos de jugadores con MySQL y HeidiSQL, y trabajé sobre la configuración, estabilidad, seguridad y rendimiento del servidor. También desarrollé su página promocional con HTML, CSS y JavaScript.",
    stack: ["Lua", "MySQL", "HeidiSQL", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Desarrollo y adaptación de scripts en Lua",
      "Administración de jugadores y datos con MySQL",
      "Mejoras de estabilidad, seguridad y rendimiento",
      "Sitio web promocional del servidor",
    ],
  },
];

const experience = [
  {
    period: "Mar 2025 — May 2025",
    role: "Soporte técnico presencial",
    place: "SONDA",
    description:
      "Diagnóstico y resolución de incidencias de hardware y software, además de configuración y mantenimiento de equipos.",
  },
];

const navItems = [
  ["Inicio", "inicio"],
  ["Sobre mí", "sobre-mi"],
  ["Tecnologías", "tecnologias"],
  ["Proyectos", "proyectos"],
  ["Contacto", "contacto"],
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <SectionLink
            className="brand"
            targetId="inicio"
            aria-label="Ir al inicio"
          >
            <span aria-hidden="true">FR</span>
          </SectionLink>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map(([label, targetId], index) => (
              <SectionLink targetId={targetId} key={targetId}>
                <span aria-hidden="true">0{index + 1}</span>
                {label}
              </SectionLink>
            ))}
          </nav>

          <details className="mobile-nav">
            <summary>Secciones</summary>
            <nav aria-label="Navegación móvil">
              {navItems.map(([label, targetId], index) => (
                <SectionLink targetId={targetId} key={targetId}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {label}
                </SectionLink>
              ))}
            </nav>
          </details>

          <ConnectProfileButton />
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-inner container">
            <div className="hero-topline">
              <p>Facundo Robayna</p>
              <p>Portfolio / 2026</p>
            </div>

            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" aria-hidden="true" />
                Disponible para oportunidades junior
              </p>
              <h1>
                <span>Construyo soluciones</span>
                <span className="accent-text">web y de software.</span>
              </h1>
            </div>

            <div className="hero-bottom">
              <div>
                <p className="hero-intro">
                  Estudiante de TI y Desarrollador de Software Junior en
                  Montevideo, Uruguay.
                </p>
                <div className="hero-actions">
                  <SectionLink
                    className="button button-primary"
                    targetId="proyectos"
                  >
                    Ver proyectos <span aria-hidden="true">↘</span>
                  </SectionLink>
                  <a
                    className="button button-ghost"
                    href="https://github.com/FakuDLL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    className="button button-ghost"
                    href="https://www.linkedin.com/in/facundo-robayna-6612a7290/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <aside className="profile-panel" aria-label="Resumen profesional">
                <div className="panel-header">
                  <span>perfil.json</span>
                  <span className="panel-state">● activo</span>
                </div>
                <div className="profile-identity">
                  <img
                    src="/profile/facundo-robayna.webp"
                    alt="Retrato de Facundo Robayna"
                    width="900"
                    height="900"
                  />
                  <div>
                    <strong>Facundo Robayna</strong>
                    <span>Desarrollador de Software Junior</span>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>Formación</dt>
                    <dd>Analista en TI · ORT</dd>
                  </div>
                  <div>
                    <dt>Avance</dt>
                    <dd>4.º semestre</dd>
                  </div>
                  <div>
                    <dt>Graduación</dt>
                    <dd>Julio 2027</dd>
                  </div>
                  <div>
                    <dt>Foco</dt>
                    <dd>Web · APIs · Datos</dd>
                  </div>
                </dl>
              </aside>
            </div>

            <SectionLink className="scroll-cue" targetId="sobre-mi">
              Scroll para explorar <span aria-hidden="true">↓</span>
            </SectionLink>
          </div>
        </section>

        <section className="section about-section" id="sobre-mi">
          <div className="container">
            <div className="section-label">
              <span>01</span>
              <p>Sobre mí</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="about-grid">
              <h2>
                Desarrollo con curiosidad,
                <span>estructura y propósito.</span>
              </h2>
              <div className="about-copy">
                <figure className="about-portrait">
                  <img
                    src="/profile/facundo-robayna.webp"
                    alt="Facundo Robayna, desarrollador de software junior"
                    width="900"
                    height="900"
                    loading="lazy"
                  />
                  <figcaption>
                    <span>Facundo Robayna</span>
                    <span>Montevideo · UY</span>
                  </figcaption>
                </figure>
                <p className="large-copy">
                  Soy estudiante de Analista en Tecnologías de la Información en
                  ORT Uruguay, actualmente cursando el cuarto semestre y
                  orientado al desarrollo de software.
                </p>
                <p>
                  Me interesa construir soluciones útiles, mantenibles y bien
                  estructuradas, con foco en desarrollo web, APIs, bases de datos
                  e inteligencia artificial aplicada al desarrollo. Valoro
                  entender el problema antes de elegir la herramienta y
                  comunicar con claridad durante el proceso.
                </p>
              </div>
            </div>

            <div className="principles">
              <article>
                <span>01 / Método</span>
                <h3>Aprender haciendo</h3>
                <p>
                  Convertir conceptos en soluciones concretas y revisar cada
                  decisión con criterio.
                </p>
              </article>
              <article>
                <span>02 / Estructura</span>
                <h3>Orden antes de escala</h3>
                <p>
                  Priorizar código entendible, responsabilidades claras y bases
                  mantenibles.
                </p>
              </article>
              <article>
                <span>03 / Producto</span>
                <h3>Construir para personas</h3>
                <p>
                  Diseñar experiencias directas, accesibles y enfocadas en el
                  problema real.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section technologies-section" id="tecnologias">
          <div className="container">
            <div className="section-label">
              <span>02</span>
              <p>Tecnologías</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="section-heading">
              <h2>Mi stack actual.</h2>
              <p>
                Herramientas y conceptos que uso en proyectos académicos y
                personales, sin inflar experiencia.
              </p>
            </div>

            <ul className="tech-grid" aria-label="Tecnologías y conocimientos">
              {technologies.map((technology, index) => (
                <li key={technology}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{technology}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section projects-section" id="proyectos">
          <div className="container">
            <div className="section-label">
              <span>03</span>
              <p>Proyectos</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="section-heading">
              <h2>Trabajo seleccionado.</h2>
              <p>
                Proyectos académicos, personales y experimentales. Algunos
                repositorios están publicados y otros se mantienen privados
                según el proyecto.
              </p>
            </div>

            <ProjectShowcase projects={projects} />
          </div>
        </section>

        <section className="section experience-section" id="experiencia">
          <div className="container">
            <div className="section-label">
              <span>04</span>
              <p>Experiencia adicional</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="experience-grid">
              <div className="section-heading">
                <h2>Más allá del código.</h2>
                <p>
                  Experiencias que fortalecieron mi autonomía, diagnóstico y
                  atención al detalle.
                </p>
              </div>
              <div className="timeline">
                {experience.map((item, index) => (
                  <article className="timeline-item" key={item.period}>
                    <span className="timeline-index">0{index + 1}</span>
                    <div>
                      <p className="timeline-period">{item.period}</p>
                      <h3>{item.role}</h3>
                      <p className="timeline-place">{item.place}</p>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-glow" aria-hidden="true" />
          <div className="container">
            <div className="section-label">
              <span>05</span>
              <p>Contacto</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="contact-grid">
              <div className="contact-heading">
                <p className="contact-kicker">¿Tenés una oportunidad o idea?</p>
                <h2>Hablemos.</h2>
              </div>
              <div className="contact-copy">
                <p>
                  Estoy abierto a conversar sobre oportunidades junior,
                  prácticas y proyectos donde pueda aportar, aprender y crecer.
                </p>
                <ConnectProfileButton placement="contact" />
              </div>
            </div>

            <div className="contact-details">
              <span>facundorobayna03@gmail.com</span>
              <a href="tel:+59896402801">096 402 801</a>
              <span>Montevideo, Uruguay</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Facundo Robayna</p>
          <p>Desarrollador de Software Junior · Montevideo</p>
          <SectionLink targetId="inicio">Volver arriba ↑</SectionLink>
        </div>
      </footer>
    </>
  );
}

