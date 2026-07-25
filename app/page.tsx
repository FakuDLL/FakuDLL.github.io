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
  },
  {
    number: "02",
    type: "Proyecto personal",
    title: "Gestión de atenciones",
    subtitle: "Herramienta interna para cosmetología médica",
    description:
      "Aplicación orientada a centralizar el registro y análisis de atenciones de un equipo de cosmetología médica. Permite consultar métricas diarias, semanales y mensuales, filtrar servicios realizados y generar resúmenes de ingresos para facilitar el seguimiento operativo.",
    stack: ["Gestión de datos", "Métricas operativas", "Filtros", "Reportes"],
  },
  {
    number: "03",
    type: "Prototipo con agentes de IA",
    title: "Seguimiento nutricional",
    subtitle: "Prototipo Android de calorías y macronutrientes",
    description:
      "Prototipo funcional creado y validado mediante un flujo de agentes de IA. Permitía registrar alimentos por texto, chat e imágenes, calcular calorías y macronutrientes y consultar una base precargada de alimentos. Gemini apoyaba el análisis de la información nutricional. No fue publicado comercialmente.",
    stack: ["Inteligencia artificial", "Gemini", "Desarrollo Android"],
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
  {
    period: "Mar 2023 — Ene 2024",
    role: "Desarrollador y administrador de servidor",
    place: "FiveM / GTA V",
    description:
      "Desarrollo y adaptación de scripts Lua, gestión de MySQL con HeidiSQL, configuración del servidor y trabajo sobre estabilidad, seguridad y rendimiento. También desarrollé una página promocional con HTML, CSS y JavaScript.",
  },
];

const navItems = [
  ["Inicio", "#inicio"],
  ["Sobre mí", "#sobre-mi"],
  ["Tecnologías", "#tecnologias"],
  ["Proyectos", "#proyectos"],
  ["Contacto", "#contacto"],
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="#inicio" aria-label="Ir al inicio">
            <span className="brand-mark" aria-hidden="true">
              FR
            </span>
            <span className="brand-name">Facundo Robayna</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map(([label, href], index) => (
              <a href={href} key={href}>
                <span aria-hidden="true">0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>

          <details className="mobile-nav">
            <summary>Menú</summary>
            <nav aria-label="Navegación móvil">
              {navItems.map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section className="hero section" id="inicio">
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" aria-hidden="true" />
                Montevideo, Uruguay · Abierto a oportunidades junior
              </p>
              <h1>
                Desarrollo software
                <span>con criterio y propósito.</span>
              </h1>
              <p className="hero-intro">
                Soy <strong>Facundo Robayna</strong>, estudiante de TI y
                desarrollador de software junior. Construyo soluciones web,
                APIs y herramientas de gestión con una base técnica clara y
                ganas de seguir aprendiendo.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#proyectos">
                  Ver proyectos
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/FakuDLL"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="button button-secondary"
                  href="https://www.linkedin.com/in/facundo-robayna-6612a7290/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <aside className="profile-card" aria-label="Resumen profesional">
              <div className="profile-card-top">
                <span>Perfil / 2026</span>
                <span className="profile-status">En formación</span>
              </div>
              <div className="monogram" aria-hidden="true">
                FR
              </div>
              <div className="profile-details">
                <p>Analista en Tecnologías de la Información</p>
                <strong>Universidad ORT Uruguay</strong>
              </div>
              <dl className="profile-facts">
                <div>
                  <dt>Avance</dt>
                  <dd>4.º semestre</dd>
                </div>
                <div>
                  <dt>Graduación estimada</dt>
                  <dd>Julio de 2027</dd>
                </div>
                <div>
                  <dt>Foco</dt>
                  <dd>Web · APIs · Datos</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="section section-lined" id="sobre-mi">
          <div className="container about-grid">
            <div className="section-heading">
              <p className="section-number">01 / Sobre mí</p>
              <h2>Curiosidad técnica, trabajo ordenado.</h2>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                Soy estudiante de Analista en Tecnologías de la Información en
                ORT Uruguay, actualmente cursando el cuarto semestre y orientado
                al desarrollo de software.
              </p>
              <p>
                Me interesa construir soluciones útiles, mantenibles y bien
                estructuradas, con foco en desarrollo web, APIs, bases de datos
                e inteligencia artificial aplicada al desarrollo. Valoro
                entender el problema antes de elegir la herramienta y comunicar
                con claridad durante el proceso.
              </p>
              <div className="principles">
                <div>
                  <span>01</span>
                  <p>Aprender haciendo</p>
                </div>
                <div>
                  <span>02</span>
                  <p>Estructurar antes de escalar</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Construir para personas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="tecnologias">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <p className="section-number">02 / Tecnologías</p>
                <h2>Herramientas que uso y estudio.</h2>
              </div>
              <p className="section-note">
                Una selección honesta de mi stack actual y los conceptos que
                aplico en proyectos académicos y personales.
              </p>
            </div>
            <ul className="tech-grid" aria-label="Tecnologías y conocimientos">
              {technologies.map((technology, index) => (
                <li key={technology}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-dark" id="proyectos">
          <div className="container">
            <div className="section-heading section-heading-row project-heading">
              <div>
                <p className="section-number">03 / Proyectos</p>
                <h2>Problemas reales, soluciones concretas.</h2>
              </div>
              <p className="section-note">
                Proyectos académicos, personales y experimentales. El código de
                estos trabajos no está publicado actualmente.
              </p>
            </div>

            <div className="projects-list">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className="project-index">{project.number}</div>
                  <div className="project-content">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-description">
                      {project.description}
                    </p>
                    <ul className="tags" aria-label={`Tecnologías de ${project.title}`}>
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

        <section className="section" id="experiencia">
          <div className="container experience-grid">
            <div className="section-heading">
              <p className="section-number">04 / Experiencia adicional</p>
              <h2>Experiencia que complementa mi perfil.</h2>
              <p className="section-note">
                Soporte, operación y desarrollo en contextos que exigieron
                autonomía, diagnóstico y atención al detalle.
              </p>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={item.period}>
                  <p className="timeline-period">{item.period}</p>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-place">{item.place}</p>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="container contact-grid">
            <div>
              <p className="section-number">05 / Contacto</p>
              <h2>¿Construimos algo juntos?</h2>
              <p>
                Estoy abierto a conversar sobre oportunidades junior, prácticas
                y proyectos donde pueda aportar, aprender y crecer.
              </p>
            </div>
            <div className="contact-actions">
              <a
                className="button button-light"
                href="mailto:facundorobayna03@gmail.com?subject=Contacto%20desde%20tu%20portfolio"
              >
                Escribirme por email <span aria-hidden="true">↗</span>
              </a>
              <span
                className="button button-disabled"
                aria-disabled="true"
                title="El CV estará disponible cuando se incorpore el archivo PDF"
              >
                Descargar CV · Próximamente
              </span>
            </div>
          </div>
          <div className="container contact-details">
            <a href="mailto:facundorobayna03@gmail.com">
              facundorobayna03@gmail.com
            </a>
            <a href="tel:+59896402801">096 402 801</a>
            <span>Montevideo, Uruguay</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Facundo Robayna</p>
          <p>Diseñado y desarrollado con atención al detalle.</p>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
