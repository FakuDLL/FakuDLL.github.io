import {
  ConnectProfileButton,
  SectionLink,
} from "./ContactControls";

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
    type: "Proyecto acadÃ©mico grupal",
    title: "StellarMinds",
    subtitle: "GestiÃ³n para un observatorio astronÃ³mico",
    description:
      "Sistema desarrollado en equipo para administrar socios, equipamiento astronÃ³mico, prÃ©stamos, devoluciones y sesiones de observaciÃ³n. La soluciÃ³n aplica arquitectura en capas, DTOs, mappers y control de roles. TambiÃ©n integra Gemini como apoyo para evaluar equipamiento de observaciÃ³n.",
    stack: [
      "C#",
      ".NET",
      "ASP.NET Web API",
      "Entity Framework Core",
      "SQL Server",
      "REST API",
    ],
    repositoryUrl: "https://github.com/FakuDLL/StellarMinds",
  },
  {
    number: "02",
    type: "Proyecto personal",
    title: "Portfolio personal",
    subtitle: "Sitio web para presentar mi perfil y proyectos",
    description:
      "Portfolio web diseÃ±ado y desarrollado para presentar mi perfil profesional, tecnologÃ­as, proyectos y formas de contacto. Incluye una interfaz responsive, navegaciÃ³n accesible, metadatos para compartir el sitio y pruebas automatizadas de renderizado.",
    stack: ["Next.js", "React", "TypeScript", "CSS", "GitHub Pages"],
    repositoryUrl: "https://github.com/FakuDLL/FakuDLL.github.io",
  },
  {
    number: "03",
    type: "Proyecto personal",
    title: "GestiÃ³n de atenciones",
    subtitle: "Herramienta interna para cosmetologÃ­a mÃ©dica",
    description:
      "AplicaciÃ³n orientada a centralizar el registro y anÃ¡lisis de atenciones de un equipo de cosmetologÃ­a mÃ©dica. Permite consultar mÃ©tricas diarias, semanales y mensuales, filtrar servicios realizados y generar resÃºmenes de ingresos para facilitar el seguimiento operativo.",
    stack: ["GestiÃ³n de datos", "MÃ©tricas operativas", "Filtros", "Reportes"],
  },
  {
    number: "04",
    type: "Prototipo con agentes de IA",
    title: "Seguimiento nutricional",
    subtitle: "Prototipo Android de calorÃ­as y macronutrientes",
    description:
      "Prototipo funcional creado y validado mediante un flujo de agentes de IA. PermitÃ­a registrar alimentos por texto, chat e imÃ¡genes, calcular calorÃ­as y macronutrientes y consultar una base precargada de alimentos. Gemini apoyaba el anÃ¡lisis de la informaciÃ³n nutricional. No fue publicado comercialmente.",
    stack: ["Inteligencia artificial", "Gemini", "Desarrollo Android"],
  },
  {
    number: "05",
    type: "Proyecto independiente Â· Mar 2023 â€” Ene 2024",
    title: "Servidor FiveM",
    subtitle: "Desarrollo para servidor multijugador de GTA V",
    description:
      "DesarrollÃ© y adaptÃ© scripts en Lua, diseÃ±Ã© y administrÃ© una base de datos de jugadores con MySQL y HeidiSQL, y trabajÃ© sobre la configuraciÃ³n, estabilidad, seguridad y rendimiento del servidor. TambiÃ©n desarrollÃ© su pÃ¡gina promocional con HTML, CSS y JavaScript.",
    stack: ["Lua", "MySQL", "HeidiSQL", "HTML", "CSS", "JavaScript"],
  },
];

const experience = [
  {
    period: "Mar 2025 â€” May 2025",
    role: "Soporte tÃ©cnico presencial",
    place: "SONDA",
    description:
      "DiagnÃ³stico y resoluciÃ³n de incidencias de hardware y software, ademÃ¡s de configuraciÃ³n y mantenimiento de equipos.",
  },
];

const navItems = [
  ["Inicio", "inicio"],
  ["Sobre mÃ­", "sobre-mi"],
  ["TecnologÃ­as", "tecnologias"],
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

          <nav className="desktop-nav" aria-label="NavegaciÃ³n principal">
            {navItems.map(([label, targetId], index) => (
              <SectionLink targetId={targetId} key={targetId}>
                <span aria-hidden="true">0{index + 1}</span>
                {label}
              </SectionLink>
            ))}
          </nav>

          <details className="mobile-nav">
            <summary>Secciones</summary>
            <nav aria-label="NavegaciÃ³n mÃ³vil">
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
                    Ver proyectos <span aria-hidden="true">â†˜</span>
                  </SectionLink>
                  <a
                    className="button button-ghost"
                    href="https://github.com/FakuDLL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <span aria-hidden="true">â†—</span>
                  </a>
                  <a
                    className="button button-ghost"
                    href="https://www.linkedin.com/in/facundo-robayna-6612a7290/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <span aria-hidden="true">â†—</span>
                  </a>
                </div>
              </div>

              <aside className="profile-panel" aria-label="Resumen profesional">
                <div className="panel-header">
                  <span>perfil.json</span>
                  <span className="panel-state">â— activo</span>
                </div>
                <dl>
                  <div>
                    <dt>FormaciÃ³n</dt>
                    <dd>Analista en TI Â· ORT</dd>
                  </div>
                  <div>
                    <dt>Avance</dt>
                    <dd>4.Âº semestre</dd>
                  </div>
                  <div>
                    <dt>GraduaciÃ³n</dt>
                    <dd>Julio 2027</dd>
                  </div>
                  <div>
                    <dt>Foco</dt>
                    <dd>Web Â· APIs Â· Datos</dd>
                  </div>
                </dl>
              </aside>
            </div>

            <SectionLink className="scroll-cue" targetId="sobre-mi">
              Scroll para explorar <span aria-hidden="true">â†“</span>
            </SectionLink>
          </div>
        </section>

        <section className="section about-section" id="sobre-mi">
          <div className="container">
            <div className="section-label">
              <span>01</span>
              <p>Sobre mÃ­</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="about-grid">
              <h2>
                Desarrollo con curiosidad,
                <span>estructura y propÃ³sito.</span>
              </h2>
              <div className="about-copy">
                <p className="large-copy">
                  Soy estudiante de Analista en TecnologÃ­as de la InformaciÃ³n en
                  ORT Uruguay, actualmente cursando el cuarto semestre y
                  orientado al desarrollo de software.
                </p>
                <p>
                  Me interesa construir soluciones Ãºtiles, mantenibles y bien
                  estructuradas, con foco en desarrollo web, APIs, bases de datos
                  e inteligencia artificial aplicada al desarrollo. Valoro
                  entender el problema antes de elegir la herramienta y
                  comunicar con claridad durante el proceso.
                </p>
              </div>
            </div>

            <div className="principles">
              <article>
                <span>01 / MÃ©todo</span>
                <h3>Aprender haciendo</h3>
                <p>
                  Convertir conceptos en soluciones concretas y revisar cada
                  decisiÃ³n con criterio.
                </p>
              </article>
              <article>
                <span>02 / Estructura</span>
                <h3>Orden antes de escala</h3>
                <p>
                  Priorizar cÃ³digo entendible, responsabilidades claras y bases
                  mantenibles.
                </p>
              </article>
              <article>
                <span>03 / Producto</span>
                <h3>Construir para personas</h3>
                <p>
                  DiseÃ±ar experiencias directas, accesibles y enfocadas en el
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
              <p>TecnologÃ­as</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="section-heading">
              <h2>Mi stack actual.</h2>
              <p>
                Herramientas y conceptos que uso en proyectos acadÃ©micos y
                personales, sin inflar experiencia.
              </p>
            </div>

            <ul className="tech-grid" aria-label="TecnologÃ­as y conocimientos">
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
                Proyectos acadÃ©micos, personales y experimentales. Algunos
                repositorios estÃ¡n publicados y otros se mantienen privados
                segÃºn el proyecto.
              </p>
            </div>

            <div className="projects-list">
              {projects.map((project) => (
                <article
                  className={`project-card${project.repositoryUrl ? " project-card--linked" : ""}`}
                  key={project.number}
                >
                  {project.repositoryUrl && (
                    <a
                      className="project-card-link"
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Ver el cÃ³digo de ${project.title} en GitHub`}
                    />
                  )}
                  <div className="project-header">
                    <span className="project-number">{project.number}</span>
                    {project.repositoryUrl && (
                      <span className="project-arrow" aria-hidden="true">
                        â†—
                      </span>
                    )}
                  </div>
                  <div className="project-content">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-description">
                      {project.description}
                    </p>
                    <ul
                      className="tags"
                      aria-label={`TecnologÃ­as de ${project.title}`}
                    >
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
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
                <h2>MÃ¡s allÃ¡ del cÃ³digo.</h2>
                <p>
                  Experiencias que fortalecieron mi autonomÃ­a, diagnÃ³stico y
                  atenciÃ³n al detalle.
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
                <p className="contact-kicker">Â¿TenÃ©s una oportunidad o idea?</p>
                <h2>Hablemos.</h2>
              </div>
              <div className="contact-copy">
                <p>
                  Estoy abierto a conversar sobre oportunidades junior,
                  prÃ¡cticas y proyectos donde pueda aportar, aprender y crecer.
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
          <p>Â© {new Date().getFullYear()} Facundo Robayna</p>
          <p>Desarrollador de Software Junior Â· Montevideo</p>
          <SectionLink targetId="inicio">Volver arriba â†‘</SectionLink>
        </div>
      </footer>
    </>
  );
}

