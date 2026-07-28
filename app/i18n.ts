import type { ProjectShowcaseItem } from "./ProjectShowcase";

export type Locale = "es" | "en";

type Localized<T> = Record<Locale, T>;

const localized = <T,>(es: T, en: T): Localized<T> => ({ es, en });

export const uiCopy = {
  es: {
    metaTitle: "Facundo Robayna — Desarrollador de Software Junior",
    metaDescription:
      "Portfolio de Facundo Robayna, estudiante de TI y desarrollador de software junior en Montevideo, Uruguay.",
    selector: {
      eyebrow: "Preferencia de idioma",
      title: "¿Cómo querés ver el portfolio?",
      description:
        "Elegí el idioma para esta visita. Esta pantalla volverá a aparecer la próxima vez que entres.",
      deviceHint: "Sugerencia basada en el idioma de tu dispositivo",
      recommended: "Recomendado",
      spanish: "Continuar en español",
      english: "Continue in English",
    },
    nav: {
      homeLabel: "Ir al inicio",
      desktopLabel: "Navegación principal",
      mobileLabel: "Navegación móvil",
      sections: "Secciones",
      changeLanguage: "Cambiar idioma",
      items: [
        ["Inicio", "inicio"],
        ["Sobre mí", "sobre-mi"],
        ["Tecnologías", "tecnologias"],
        ["Proyectos", "proyectos"],
        ["Contacto", "contacto"],
      ] as const,
    },
    hero: {
      availability: "Disponible para oportunidades junior",
      headlineFirst: "Construyo soluciones",
      headlineSecond: "web y de software.",
      intro:
        "Estudiante de TI y Desarrollador de Software Junior en Montevideo, Uruguay.",
      projectsButton: "Ver proyectos",
      panelLabel: "Resumen profesional",
      panelFile: "perfil.json",
      active: "● activo",
      role: "Desarrollador de Software Junior",
      portraitAlt: "Retrato de Facundo Robayna",
      facts: [
        ["Formación", "Analista en TI · ORT"],
        ["Avance", "4.º semestre"],
        ["Graduación", "Julio 2027"],
        ["Foco", "Web · APIs · Datos"],
      ] as const,
      scroll: "Scroll para explorar",
    },
    about: {
      label: "Sobre mí",
      headingFirst: "Desarrollo con curiosidad,",
      headingSecond: "estructura y propósito.",
      portraitAlt:
        "Facundo Robayna, desarrollador de software junior",
      location: "Montevideo · UY",
      lead:
        "Soy estudiante de Analista en Tecnologías de la Información en ORT Uruguay, actualmente cursando el cuarto semestre y orientado al desarrollo de software.",
      body:
        "Me interesa construir soluciones útiles, mantenibles y bien estructuradas, con foco en desarrollo web, APIs, bases de datos e inteligencia artificial aplicada al desarrollo. Valoro entender el problema antes de elegir la herramienta y comunicar con claridad durante el proceso.",
      principles: [
        {
          eyebrow: "01 / Método",
          title: "Aprender haciendo",
          description:
            "Convertir conceptos en soluciones concretas y revisar cada decisión con criterio.",
        },
        {
          eyebrow: "02 / Estructura",
          title: "Orden antes de escala",
          description:
            "Priorizar código entendible, responsabilidades claras y bases mantenibles.",
        },
        {
          eyebrow: "03 / Producto",
          title: "Construir para personas",
          description:
            "Diseñar experiencias directas, accesibles y enfocadas en el problema real.",
        },
      ],
    },
    technologies: {
      label: "Tecnologías",
      heading: "Mi stack actual.",
      description:
        "Herramientas y conceptos que uso en proyectos académicos y personales, sin inflar experiencia.",
      listLabel: "Tecnologías y conocimientos",
    },
    projectsSection: {
      label: "Proyectos",
      heading: "Trabajo seleccionado.",
      description:
        "Proyectos académicos, personales y experimentales. Algunos repositorios están publicados y otros se mantienen privados según el proyecto.",
    },
    experience: {
      label: "Experiencia adicional",
      heading: "Más allá del código.",
      description:
        "Experiencias que fortalecieron mi autonomía, diagnóstico y atención al detalle.",
      items: [
        {
          period: "Mar 2025 — May 2025",
          role: "Soporte técnico presencial",
          place: "SONDA",
          description:
            "Diagnóstico y resolución de incidencias de hardware y software, además de configuración y mantenimiento de equipos.",
        },
      ],
    },
    contact: {
      label: "Contacto",
      kicker: "¿Tenés una oportunidad o idea?",
      heading: "Hablemos.",
      description:
        "Estoy abierto a conversar sobre oportunidades junior, prácticas y proyectos donde pueda aportar, aprender y crecer.",
    },
    footer: {
      role: "Desarrollador de Software Junior · Montevideo",
      backToTop: "Volver arriba",
    },
    connect: {
      trigger: "Conectar",
      file: "perfil.local",
      close: "Cerrar perfil",
      availability: "Disponible para oportunidades junior",
      role: "Estudiante de TI · Desarrollador de Software Junior",
      facts: [
        ["Ubicación", "Montevideo, Uruguay"],
        ["Formación", "Analista en TI · ORT Uruguay"],
        ["Foco", "Web · APIs · Datos"],
        ["Stack", "C# · .NET · SQL · JavaScript"],
      ] as const,
      copyEmail: "Copiar email",
      emailCopied: "Email copiado ✓",
    },
    projectDialog: {
      openDetails: "Abrir detalles de",
      technologiesOf: "Tecnologías de",
      filePrefix: "proyecto",
      sheet: "● ficha de proyecto",
      closeDetails: "Cerrar detalles de",
      galleryOf: "Galería de",
      material: "Material del proyecto",
      realScreenshots: "Capturas reales",
      previous: "Ver contenido anterior",
      next: "Ver contenido siguiente",
      videoFallback: "Tu navegador no puede reproducir este video.",
      openFullImage: "Abrir imagen en tamaño completo",
      viewContent: "Ver contenido",
      visibleContent: "contenidos visibles",
      showing: "Mostrando",
      of: "de",
      contents: "contenidos",
      showLess: "Mostrar menos",
      showAll: "Mostrar todo el contenido",
      visualMaterial: "Material visual",
      comingSoon: "Capturas disponibles próximamente.",
      status: "Estado",
      problem: "Problema que resuelve",
      includes: "Qué incluye",
      decisions: "Decisiones técnicas",
      technologies: "Tecnologías",
      viewCode: "Ver código en GitHub",
    },
  },
  en: {
    metaTitle: "Facundo Robayna — Junior Software Developer",
    metaDescription:
      "Portfolio of Facundo Robayna, an IT student and junior software developer based in Montevideo, Uruguay.",
    selector: {
      eyebrow: "Language preference",
      title: "How would you like to view the portfolio?",
      description:
        "Choose a language for this visit. This screen will appear again the next time you enter.",
      deviceHint: "Suggested from your device language",
      recommended: "Recommended",
      spanish: "Continuar en español",
      english: "Continue in English",
    },
    nav: {
      homeLabel: "Go to home",
      desktopLabel: "Main navigation",
      mobileLabel: "Mobile navigation",
      sections: "Sections",
      changeLanguage: "Change language",
      items: [
        ["Home", "inicio"],
        ["About", "sobre-mi"],
        ["Technologies", "tecnologias"],
        ["Projects", "proyectos"],
        ["Contact", "contacto"],
      ] as const,
    },
    hero: {
      availability: "Open to junior opportunities",
      headlineFirst: "I build web and",
      headlineSecond: "software solutions.",
      intro:
        "IT student and Junior Software Developer based in Montevideo, Uruguay.",
      projectsButton: "View projects",
      panelLabel: "Professional summary",
      panelFile: "profile.json",
      active: "● active",
      role: "Junior Software Developer",
      portraitAlt: "Portrait of Facundo Robayna",
      facts: [
        ["Education", "IT Analyst · ORT"],
        ["Progress", "4th semester"],
        ["Graduation", "July 2027"],
        ["Focus", "Web · APIs · Data"],
      ] as const,
      scroll: "Scroll to explore",
    },
    about: {
      label: "About me",
      headingFirst: "Development with curiosity,",
      headingSecond: "structure and purpose.",
      portraitAlt: "Facundo Robayna, junior software developer",
      location: "Montevideo · UY",
      lead:
        "I am studying Information Technology Analysis at ORT Uruguay. I am currently in my fourth semester and focused on software development.",
      body:
        "I enjoy building useful, maintainable and well-structured solutions, with a focus on web development, APIs, databases and AI-assisted development. I value understanding the problem before choosing a tool and communicating clearly throughout the process.",
      principles: [
        {
          eyebrow: "01 / Method",
          title: "Learn by building",
          description:
            "Turn concepts into concrete solutions and review each decision thoughtfully.",
        },
        {
          eyebrow: "02 / Structure",
          title: "Order before scale",
          description:
            "Prioritize understandable code, clear responsibilities and maintainable foundations.",
        },
        {
          eyebrow: "03 / Product",
          title: "Build for people",
          description:
            "Design direct, accessible experiences focused on the real problem.",
        },
      ],
    },
    technologies: {
      label: "Technologies",
      heading: "My current stack.",
      description:
        "Tools and concepts I use in academic and personal projects, without overstating my experience.",
      listLabel: "Technologies and skills",
    },
    projectsSection: {
      label: "Projects",
      heading: "Selected work.",
      description:
        "Academic, personal and experimental projects. Some repositories are public, while others remain private depending on the project.",
    },
    experience: {
      label: "Additional experience",
      heading: "Beyond code.",
      description:
        "Experiences that strengthened my autonomy, diagnostic skills and attention to detail.",
      items: [
        {
          period: "Mar 2025 — May 2025",
          role: "On-site technical support",
          place: "SONDA",
          description:
            "Diagnosed and resolved hardware and software incidents, and configured and maintained computer equipment.",
        },
      ],
    },
    contact: {
      label: "Contact",
      kicker: "Do you have an opportunity or an idea?",
      heading: "Let's talk.",
      description:
        "I am open to discussing junior opportunities, internships and projects where I can contribute, learn and grow.",
    },
    footer: {
      role: "Junior Software Developer · Montevideo",
      backToTop: "Back to top",
    },
    connect: {
      trigger: "Connect",
      file: "profile.local",
      close: "Close profile",
      availability: "Open to junior opportunities",
      role: "IT Student · Junior Software Developer",
      facts: [
        ["Location", "Montevideo, Uruguay"],
        ["Education", "IT Analyst · ORT Uruguay"],
        ["Focus", "Web · APIs · Data"],
        ["Stack", "C# · .NET · SQL · JavaScript"],
      ] as const,
      copyEmail: "Copy email",
      emailCopied: "Email copied ✓",
    },
    projectDialog: {
      openDetails: "Open details for",
      technologiesOf: "Technologies used in",
      filePrefix: "project",
      sheet: "● project overview",
      closeDetails: "Close details for",
      galleryOf: "Gallery for",
      material: "Project material",
      realScreenshots: "Real screenshots",
      previous: "View previous content",
      next: "View next content",
      videoFallback: "Your browser cannot play this video.",
      openFullImage: "Open full-size image",
      viewContent: "View content",
      visibleContent: "items visible",
      showing: "Showing",
      of: "of",
      contents: "items",
      showLess: "Show less",
      showAll: "Show all content",
      visualMaterial: "Visual material",
      comingSoon: "Screenshots coming soon.",
      status: "Status",
      problem: "Problem it solves",
      includes: "What it includes",
      decisions: "Technical decisions",
      technologies: "Technologies",
      viewCode: "View code on GitHub",
    },
  },
} as const;

export const technologiesByLocale: Record<Locale, string[]> = {
  es: [
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
  ],
  en: [
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
    "Git and GitHub",
    "REST APIs",
    "Layered architecture",
    "DTOs and mappers",
    "AI-assisted development",
  ],
};

type GalleryDefinition = {
  src: string;
  alt: Localized<string>;
  caption: Localized<string>;
  mediaType?: "image" | "video";
  poster?: string;
};

type ProjectDefinition = {
  number: string;
  featured?: boolean;
  type: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
  description: Localized<string>;
  status?: Localized<string>;
  problem?: Localized<string>;
  stack: Localized<string[]>;
  highlights: Localized<string[]>;
  decisions?: Localized<string[]>;
  repositoryUrl?: string;
  repositoryNote?: Localized<string>;
  primaryAction?: {
    url: string;
    label: Localized<string>;
  };
  secondaryAction?: {
    url: string;
    label: Localized<string>;
  };
  galleryTitle?: Localized<string>;
  gallery?: GalleryDefinition[];
};

const projectDefinitions: ProjectDefinition[] = [
  {
    number: "01",
    featured: true,
    type: localized(
      "Plataforma empresarial multiusuario",
      "Multi-tenant enterprise platform",
    ),
    title: localized("NexoDesk", "NexoDesk"),
    subtitle: localized(
      "Gestión de soporte técnico para organizaciones",
      "Technical support management for organizations",
    ),
    description: localized(
      "Plataforma web en producción para registrar, asignar y seguir incidencias dentro de distintas organizaciones. Combina roles, SLA, auditoría, notificaciones y métricas operativas en una experiencia responsive en español e inglés.",
      "A production web platform for creating, assigning and tracking incidents across separate organizations. It combines roles, SLAs, auditing, notifications and operational metrics in a responsive Spanish and English experience.",
    ),
    status: localized("En producción", "In production"),
    problem: localized(
      "Centraliza el trabajo de soporte y mantiene aislada la información de cada organización, para que administradores, agentes y solicitantes colaboren con trazabilidad y tiempos de atención claros.",
      "It centralizes support work while keeping each organization's information isolated, so administrators, agents and requesters can collaborate with traceability and clear response targets.",
    ),
    stack: localized(
      [
        ".NET 10",
        "ASP.NET Core Web API",
        "React",
        "TypeScript",
        "Entity Framework Core",
        "SQL Server / Azure SQL",
        "Identity + JWT",
        "SignalR",
        "TanStack Query",
        "xUnit",
      ],
      [
        ".NET 10",
        "ASP.NET Core Web API",
        "React",
        "TypeScript",
        "Entity Framework Core",
        "SQL Server / Azure SQL",
        "Identity + JWT",
        "SignalR",
        "TanStack Query",
        "xUnit",
      ],
    ),
    highlights: localized(
      [
        "Registro e inicio de sesión con roles Administrador, Agente y Solicitante",
        "Aislamiento de datos por organización",
        "Incidencias con asignación, prioridades, estados y comentarios públicos o internos",
        "Seguimiento de SLA, auditoría y notificaciones internas",
        "Búsqueda, filtros, ordenamiento, paginación y dashboard operativo",
      ],
      [
        "Registration and sign-in with Administrator, Agent and Requester roles",
        "Organization-level data isolation",
        "Incident assignment, priorities, statuses, and public or internal comments",
        "SLA tracking, auditing and internal notifications",
        "Search, filters, sorting, pagination and an operational dashboard",
      ],
    ),
    decisions: localized(
      [
        "Autorización por roles y pertenencia a la organización en la API",
        "Identity y JWT para autenticación; SignalR para actualizaciones internas",
        "Pruebas unitarias y de integración dentro del flujo de GitHub Actions",
        "Frontend en Cloudflare Pages y API con Azure SQL en Azure",
      ],
      [
        "API authorization based on role and organization membership",
        "Identity and JWT for authentication; SignalR for internal updates",
        "Unit and integration tests in the GitHub Actions workflow",
        "Frontend on Cloudflare Pages and API with Azure SQL on Azure",
      ],
    ),
    galleryTitle: localized(
      "Operaciones, incidencias y trazabilidad",
      "Operations, incidents and traceability",
    ),
    gallery: [
      {
        src: "/projects/nexodesk/dashboard-desktop.png",
        alt: localized(
          "Dashboard operativo de NexoDesk con métricas de incidencias y SLA",
          "NexoDesk operational dashboard with incident and SLA metrics",
        ),
        caption: localized(
          "Dashboard · carga operativa y señales de SLA",
          "Dashboard · operational workload and SLA signals",
        ),
      },
      {
        src: "/projects/nexodesk/incidents-desktop.png",
        alt: localized(
          "Cola de incidencias de NexoDesk con búsqueda, filtros, estados y responsables",
          "NexoDesk incident queue with search, filters, statuses and assignees",
        ),
        caption: localized(
          "Incidencias · búsqueda, filtros, estados y prioridades",
          "Incidents · search, filters, statuses and priorities",
        ),
      },
      {
        src: "/projects/nexodesk/create-incident-desktop.png",
        alt: localized(
          "Formulario de NexoDesk para crear una incidencia y definir su prioridad",
          "NexoDesk form for creating an incident and setting its priority",
        ),
        caption: localized(
          "Nueva incidencia · contexto, categoría y prioridad",
          "New incident · context, category and priority",
        ),
      },
      {
        src: "/projects/nexodesk/conversation-desktop.png",
        alt: localized(
          "Detalle de una incidencia de NexoDesk con conversación, nota interna y controles",
          "NexoDesk incident detail with conversation, internal note and controls",
        ),
        caption: localized(
          "Detalle · conversación, responsables y cronología del SLA",
          "Detail · conversation, ownership and SLA timeline",
        ),
      },
      {
        src: "/projects/nexodesk/audit-desktop.png",
        alt: localized(
          "Detalle de auditoría e historial inalterable de una incidencia en NexoDesk",
          "Immutable audit and status history for a NexoDesk incident",
        ),
        caption: localized(
          "Auditoría · cambios importantes e historial de estados",
          "Audit · important changes and status history",
        ),
      },
      {
        src: "/projects/nexodesk/dashboard-mobile.png",
        alt: localized(
          "Dashboard operativo de NexoDesk adaptado a un teléfono celular",
          "NexoDesk operational dashboard adapted to a mobile phone",
        ),
        caption: localized(
          "Dashboard · versión para celular",
          "Dashboard · mobile version",
        ),
      },
      {
        src: "/projects/nexodesk/login-en-desktop.png",
        alt: localized(
          "Inicio de sesión de NexoDesk en inglés con accesos a los roles de demostración",
          "NexoDesk English sign-in page with demo role access",
        ),
        caption: localized(
          "Acceso · experiencia bilingüe y roles de demostración",
          "Sign-in · bilingual experience and demo roles",
        ),
      },
    ],
    primaryAction: {
      url: "https://nexodesk-fakudll.pages.dev",
      label: localized("Probar aplicación", "Try application"),
    },
    repositoryNote: localized(
      "Código temporalmente privado",
      "Code temporarily private",
    ),
  },
  {
    number: "02",
    featured: true,
    type: localized(
      "Herramienta de ingeniería",
      "Engineering tool",
    ),
    title: localized("RepoSignal", "RepoSignal"),
    subtitle: localized(
      "Evidencias observables de ingeniería en repositorios GitHub",
      "Observable engineering evidence from GitHub repositories",
    ),
    description: localized(
      "Herramienta en producción que analiza repositorios públicos de GitHub y genera informes determinísticos sobre documentación, pruebas, integración continua, seguridad observable, mantenibilidad y experiencia de desarrollo.",
      "A production tool that analyzes public GitHub repositories and produces deterministic reports covering documentation, testing, continuous integration, observable security, maintainability and developer experience.",
    ),
    status: localized("En producción", "In production"),
    problem: localized(
      "Convierte señales públicas dispersas de un repositorio en un informe explicable con puntuación, confianza y evidencias, sin presentar su resultado como una evaluación absoluta de la calidad del código.",
      "It turns scattered public repository signals into an explainable report with scores, confidence and evidence, without presenting the result as an absolute judgment of code quality.",
    ),
    stack: localized(
      [
        ".NET 10",
        "ASP.NET Core Web API",
        "React",
        "TypeScript",
        "Entity Framework Core",
        "PostgreSQL + Neon",
        "TanStack Query",
        "GitHub API",
        "xUnit + Testcontainers",
        "Vitest",
      ],
      [
        ".NET 10",
        "ASP.NET Core Web API",
        "React",
        "TypeScript",
        "Entity Framework Core",
        "PostgreSQL + Neon",
        "TanStack Query",
        "GitHub API",
        "xUnit + Testcontainers",
        "Vitest",
      ],
    ),
    highlights: localized(
      [
        "Puntuación, confianza, categorías y evidencias observables",
        "Documentación, pruebas, CI, higiene, seguridad, mantenibilidad, releases y DX",
        "Estructura relevante, historial de informes y comparación",
        "Procesamiento en segundo plano con GitHub API autenticada",
      ],
      [
        "Scores, confidence, categories and observable evidence",
        "Documentation, tests, CI, hygiene, security, maintainability, releases and DX",
        "Relevant structure, report history and comparison",
        "Background processing with the authenticated GitHub API",
      ],
    ),
    decisions: localized(
      [
        "Reglas determinísticas: la IA no decide la puntuación",
        "El análisis no clona ni ejecuta código del repositorio",
        "Cada resultado expone evidencia y confianza para explicar sus límites",
        "API en Azure Container Apps, datos en Neon y frontend en Cloudflare Pages",
      ],
      [
        "Deterministic rules: AI does not decide the score",
        "The analysis never clones or executes repository code",
        "Every result exposes evidence and confidence to explain its limits",
        "API on Azure Container Apps, data on Neon and frontend on Cloudflare Pages",
      ],
    ),
    galleryTitle: localized(
      "Producto e informe real",
      "Product and real report",
    ),
    gallery: [
      {
        src: "/projects/reposignal/landing-desktop.png",
        alt: localized(
          "Página principal de RepoSignal con el formulario para analizar un repositorio público",
          "RepoSignal home page with the form for analyzing a public repository",
        ),
        caption: localized(
          "Inicio · análisis de un repositorio público",
          "Home · public repository analysis",
        ),
      },
      {
        src: "/projects/reposignal/report-overview-desktop.png",
        alt: localized(
          "Resumen de un informe de RepoSignal con puntuación, confianza y categorías",
          "RepoSignal report overview with score, confidence and categories",
        ),
        caption: localized(
          "Informe · puntuación, confianza y señales por categoría",
          "Report · score, confidence and category signals",
        ),
      },
      {
        src: "/projects/reposignal/ci-evidence-desktop.png",
        alt: localized(
          "Detalle de evidencia de integración continua en un informe de RepoSignal",
          "Continuous integration evidence detail in a RepoSignal report",
        ),
        caption: localized(
          "Evidencias · detalle de integración continua",
          "Evidence · continuous integration detail",
        ),
      },
      {
        src: "/projects/reposignal/report-mobile.png",
        alt: localized(
          "Informe de RepoSignal adaptado a un teléfono celular",
          "RepoSignal report adapted to a mobile phone",
        ),
        caption: localized(
          "Informe · versión para celular",
          "Report · mobile version",
        ),
      },
    ],
    primaryAction: {
      url: "https://reposignal-fakudll.pages.dev",
      label: localized(
        "Analizar un repositorio",
        "Analyze a repository",
      ),
    },
    secondaryAction: {
      url: "https://reposignal-fakudll.pages.dev/reports/019fa647-08f2-76c2-b693-9c532fb3b58b",
      label: localized(
        "Ver informe de ejemplo",
        "View sample report",
      ),
    },
    repositoryNote: localized(
      "Código temporalmente privado",
      "Code temporarily private",
    ),
  },
  {
    number: "03",
    type: localized("Proyecto académico grupal", "Academic group project"),
    title: localized("StellarMinds", "StellarMinds"),
    subtitle: localized(
      "Gestión para un observatorio astronómico",
      "Management system for an astronomical observatory",
    ),
    description: localized(
      "Sistema desarrollado en equipo para administrar socios, equipamiento astronómico, préstamos, devoluciones y sesiones de observación. La solución aplica arquitectura en capas, DTOs, mappers y control de roles. También integra Gemini como apoyo para evaluar equipamiento de observación.",
      "A team-built system for managing members, astronomical equipment, loans, returns and observation sessions. The solution uses layered architecture, DTOs, mappers and role-based access control. It also integrates Gemini to support the evaluation of observation equipment.",
    ),
    stack: localized(
      [
        "C#",
        ".NET",
        "ASP.NET Web API",
        "Entity Framework Core",
        "SQL Server",
        "REST API",
      ],
      [
        "C#",
        ".NET",
        "ASP.NET Web API",
        "Entity Framework Core",
        "SQL Server",
        "REST API",
      ],
    ),
    highlights: localized(
      [
        "Administración de socios y roles",
        "Préstamos y devoluciones de equipamiento",
        "Sesiones de observación y evaluación asistida por Gemini",
      ],
      [
        "Member and role management",
        "Equipment loans and returns",
        "Observation sessions and Gemini-assisted evaluation",
      ],
    ),
    galleryTitle: localized(
      "Sistema, roles y arquitectura",
      "System, roles and architecture",
    ),
    gallery: [
      {
        src: "/projects/stellarminds/presentacion.svg",
        alt: localized(
          "Presentación visual del proyecto StellarMinds",
          "Visual presentation of the StellarMinds project",
        ),
        caption: localized(
          "Presentación general del sistema",
          "System overview",
        ),
      },
      {
        src: "/projects/stellarminds/equipos-admin.webp",
        alt: localized(
          "Catálogo de equipos astronómicos administrado en StellarMinds",
          "Astronomical equipment catalog managed in StellarMinds",
        ),
        caption: localized(
          "Administrador · catálogo y disponibilidad de equipos",
          "Administrator · equipment catalog and availability",
        ),
      },
      {
        src: "/projects/stellarminds/alta-prestamo-coordinador.webp",
        alt: localized(
          "Formulario de alta de préstamos para el rol coordinador en StellarMinds",
          "Loan creation form for the coordinator role in StellarMinds",
        ),
        caption: localized(
          "Coordinador · alta de préstamo y selección de equipamiento",
          "Coordinator · loan creation and equipment selection",
        ),
      },
      {
        src: "/projects/stellarminds/devoluciones-coordinador.webp",
        alt: localized(
          "Gestión de devoluciones de préstamos en StellarMinds",
          "Loan return management in StellarMinds",
        ),
        caption: localized(
          "Coordinador · préstamos pendientes de devolución",
          "Coordinator · loans pending return",
        ),
      },
      {
        src: "/projects/stellarminds/mis-prestamos-socio.webp",
        alt: localized(
          "Consulta mensual de préstamos del rol socio en StellarMinds",
          "Monthly loan view for the member role in StellarMinds",
        ),
        caption: localized(
          "Socio · consulta de préstamos y atrasos",
          "Member · loans and overdue items",
        ),
      },
      {
        src: "/projects/stellarminds/auditoria-admin.webp",
        alt: localized(
          "Historial de auditoría de préstamos y devoluciones en StellarMinds",
          "Loan and return audit history in StellarMinds",
        ),
        caption: localized(
          "Administrador · auditoría de operaciones",
          "Administrator · operations audit",
        ),
      },
      {
        src: "/projects/stellarminds/socios-telescopio-admin.webp",
        alt: localized(
          "Consulta de socios asociados a un telescopio en StellarMinds",
          "Members associated with a telescope in StellarMinds",
        ),
        caption: localized(
          "Consulta de socios por telescopio",
          "Members by telescope",
        ),
      },
      {
        src: "/projects/stellarminds/ranking-objetos.webp",
        alt: localized(
          "Ranking de objetos celestes observados en StellarMinds",
          "Ranking of observed celestial objects in StellarMinds",
        ),
        caption: localized(
          "Ranking de objetos celestes por observaciones",
          "Celestial object ranking by observations",
        ),
      },
      {
        src: "/projects/stellarminds/login.webp",
        alt: localized(
          "Pantalla de inicio de sesión de StellarMinds ejecutándose localmente",
          "StellarMinds sign-in screen running locally",
        ),
        caption: localized(
          "Acceso al cliente web MVC",
          "MVC web client sign-in",
        ),
      },
      {
        src: "/projects/stellarminds/arquitectura-capas.webp",
        alt: localized(
          "Estructura de carpetas por capas de la solución StellarMinds",
          "Layered folder structure of the StellarMinds solution",
        ),
        caption: localized(
          "Solución organizada por dominio, aplicación, DTOs, datos y API",
          "Solution organized by domain, application, DTOs, data and API",
        ),
      },
      {
        src: "/projects/stellarminds/swagger-api.webp",
        alt: localized(
          "Documentación Swagger de la API REST de StellarMinds",
          "Swagger documentation for the StellarMinds REST API",
        ),
        caption: localized(
          "Contratos y endpoints de la Web API",
          "Web API contracts and endpoints",
        ),
      },
      {
        src: "/projects/stellarminds/casos-de-uso.png",
        alt: localized(
          "Diagrama de casos de uso de StellarMinds",
          "StellarMinds use-case diagram",
        ),
        caption: localized(
          "Casos de uso, actores y funciones principales",
          "Use cases, actors and main features",
        ),
      },
    ],
    repositoryUrl: "https://github.com/FakuDLL/StellarMinds",
  },
  {
    number: "04",
    type: localized("Proyecto personal", "Personal project"),
    title: localized("Portfolio personal", "Personal portfolio"),
    subtitle: localized(
      "Sitio web para presentar mi perfil y proyectos",
      "Website showcasing my profile and projects",
    ),
    description: localized(
      "Portfolio web diseñado y desarrollado para presentar mi perfil profesional, tecnologías, proyectos y formas de contacto. Incluye una interfaz responsive, navegación accesible, metadatos para compartir el sitio y pruebas automatizadas de renderizado.",
      "A web portfolio designed and developed to present my professional profile, technologies, projects and contact information. It includes a responsive interface, accessible navigation, sharing metadata and automated rendering tests.",
    ),
    stack: localized(
      ["Next.js", "React", "TypeScript", "CSS", "GitHub Pages"],
      ["Next.js", "React", "TypeScript", "CSS", "GitHub Pages"],
    ),
    highlights: localized(
      [
        "Diseño responsive para escritorio y dispositivos móviles",
        "Navegación accesible y fichas detalladas de proyectos",
        "Pruebas automatizadas y publicación continua",
      ],
      [
        "Responsive design for desktop and mobile devices",
        "Accessible navigation and detailed project profiles",
        "Automated tests and continuous publishing",
      ],
    ),
    galleryTitle: localized(
      "Escritorio y celular",
      "Desktop and mobile",
    ),
    gallery: [
      {
        src: "/projects/portfolio/vista-inicio.webp",
        alt: localized(
          "Portada del portfolio personal vista en escritorio",
          "Personal portfolio home page on desktop",
        ),
        caption: localized(
          "Inicio · versión de escritorio",
          "Home · desktop version",
        ),
      },
      {
        src: "/projects/portfolio/sobre-mi-desktop.webp",
        alt: localized(
          "Sección Sobre mí del portfolio vista en escritorio",
          "Portfolio About section on desktop",
        ),
        caption: localized(
          "Sobre mí · versión de escritorio",
          "About · desktop version",
        ),
      },
      {
        src: "/projects/portfolio/tecnologias-desktop.webp",
        alt: localized(
          "Sección de tecnologías del portfolio vista en escritorio",
          "Portfolio technologies section on desktop",
        ),
        caption: localized(
          "Tecnologías · versión de escritorio",
          "Technologies · desktop version",
        ),
      },
      {
        src: "/projects/portfolio/seccion-proyectos.webp",
        alt: localized(
          "Sección de proyectos del portfolio vista en escritorio",
          "Portfolio projects section on desktop",
        ),
        caption: localized(
          "Proyectos · versión de escritorio",
          "Projects · desktop version",
        ),
      },
      {
        src: "/projects/portfolio/inicio-mobile.webp",
        alt: localized(
          "Portada del portfolio adaptada a un teléfono celular",
          "Portfolio home page adapted to a mobile phone",
        ),
        caption: localized(
          "Inicio · versión para celular",
          "Home · mobile version",
        ),
      },
      {
        src: "/projects/portfolio/sobre-mi-mobile.webp",
        alt: localized(
          "Sección Sobre mí del portfolio adaptada a un teléfono celular",
          "Portfolio About section adapted to a mobile phone",
        ),
        caption: localized(
          "Sobre mí · versión para celular",
          "About · mobile version",
        ),
      },
      {
        src: "/projects/portfolio/tecnologias-mobile.webp",
        alt: localized(
          "Sección de tecnologías adaptada a un teléfono celular",
          "Technologies section adapted to a mobile phone",
        ),
        caption: localized(
          "Tecnologías · versión para celular",
          "Technologies · mobile version",
        ),
      },
      {
        src: "/projects/portfolio/proyectos-mobile.webp",
        alt: localized(
          "Sección de proyectos adaptada a un teléfono celular",
          "Projects section adapted to a mobile phone",
        ),
        caption: localized(
          "Proyectos · versión para celular",
          "Projects · mobile version",
        ),
      },
      {
        src: "/projects/portfolio/contacto-mobile.webp",
        alt: localized(
          "Sección de contacto adaptada a un teléfono celular",
          "Contact section adapted to a mobile phone",
        ),
        caption: localized(
          "Contacto · versión para celular",
          "Contact · mobile version",
        ),
      },
    ],
    repositoryUrl: "https://github.com/FakuDLL/FakuDLL.github.io",
  },
  {
    number: "05",
    type: localized("Proyecto personal", "Personal project"),
    title: localized("Gestión de atenciones", "Appointment management"),
    subtitle: localized(
      "Herramienta interna para cosmetología médica",
      "Internal tool for medical cosmetology",
    ),
    description: localized(
      "Aplicación orientada a centralizar el registro y análisis de atenciones de un equipo de cosmetología médica. Permite consultar métricas diarias, semanales y mensuales, filtrar servicios realizados y generar resúmenes de ingresos para facilitar el seguimiento operativo.",
      "An application designed to centralize appointment records and analysis for a medical cosmetology team. It provides daily, weekly and monthly metrics, filters completed services and generates revenue summaries to support operational monitoring.",
    ),
    stack: localized(
      ["Gestión de datos", "Métricas operativas", "Filtros", "Reportes"],
      ["Data management", "Operational metrics", "Filters", "Reports"],
    ),
    highlights: localized(
      [
        "Registro y edición de atenciones",
        "Configuración de servicios, precios y porcentajes",
        "Indicadores diarios, semanales, mensuales e históricos",
        "Filtros, copias de seguridad e importación de datos",
      ],
      [
        "Appointment creation and editing",
        "Service, price and percentage configuration",
        "Daily, weekly, monthly and historical indicators",
        "Filters, backups and data import",
      ],
    ),
    gallery: [
      {
        src: "/projects/gestion-atenciones/vista-general.webp",
        alt: localized(
          "Vista general de la aplicación de gestión de atenciones",
          "Overview of the appointment management application",
        ),
        caption: localized(
          "Vista general del sistema",
          "System overview",
        ),
      },
      {
        src: "/projects/gestion-atenciones/servicios.png",
        alt: localized(
          "Configuración de servicios y precios de la aplicación",
          "Service and price configuration",
        ),
        caption: localized(
          "Administración de servicios y precios",
          "Service and price management",
        ),
      },
      {
        src: "/projects/gestion-atenciones/tabla-atenciones.webp",
        alt: localized(
          "Tabla de atenciones con filtros, importación y copias de seguridad",
          "Appointment table with filters, import and backups",
        ),
        caption: localized(
          "Gestión y edición de atenciones",
          "Appointment management and editing",
        ),
      },
      {
        src: "/projects/gestion-atenciones/ganancia-semanal.png",
        alt: localized(
          "Consulta de ganancia semanal",
          "Weekly revenue view",
        ),
        caption: localized(
          "Consulta semanal por fecha",
          "Weekly view by date",
        ),
      },
      {
        src: "/projects/gestion-atenciones/ganancia-mensual.png",
        alt: localized(
          "Consulta de ganancia mensual",
          "Monthly revenue view",
        ),
        caption: localized(
          "Resumen mensual por período",
          "Monthly summary by period",
        ),
      },
      {
        src: "/projects/gestion-atenciones/resumen.png",
        alt: localized(
          "Panel de resumen con métricas de atenciones",
          "Summary panel with appointment metrics",
        ),
        caption: localized(
          "Panel general de métricas",
          "General metrics dashboard",
        ),
      },
    ],
  },
  {
    number: "06",
    type: localized(
      "Prototipo con agentes de IA",
      "AI-agent prototype",
    ),
    title: localized("Seguimiento nutricional", "Nutrition tracking"),
    subtitle: localized(
      "Prototipo Android de calorías y macronutrientes",
      "Android calorie and macronutrient prototype",
    ),
    description: localized(
      "Prototipo funcional creado y validado mediante un flujo de agentes de IA. Permitía registrar alimentos por texto, chat e imágenes, calcular calorías y macronutrientes y consultar una base precargada de alimentos. Gemini apoyaba el análisis de la información nutricional. No fue publicado comercialmente.",
      "A functional prototype created and validated through an AI-agent workflow. It supported food logging through text, chat and images, calculated calories and macronutrients, and queried a preloaded food database. Gemini supported nutritional information analysis. It was not commercially released.",
    ),
    stack: localized(
      ["Inteligencia artificial", "Gemini", "Desarrollo Android"],
      ["Artificial intelligence", "Gemini", "Android development"],
    ),
    highlights: localized(
      [
        "Registro de alimentos por texto, chat e imágenes",
        "Cálculo de calorías y macronutrientes",
        "Análisis nutricional asistido por Gemini",
      ],
      [
        "Food logging through text, chat and images",
        "Calorie and macronutrient calculations",
        "Gemini-assisted nutritional analysis",
      ],
    ),
  },
  {
    number: "07",
    type: localized(
      "Proyecto independiente · Mar 2023 — Ene 2024",
      "Independent project · Mar 2023 — Jan 2024",
    ),
    title: localized("Servidor FiveM", "FiveM server"),
    subtitle: localized(
      "Desarrollo para servidor multijugador de GTA V",
      "Development for a GTA V multiplayer server",
    ),
    description: localized(
      "Desarrollé y adapté scripts en Lua, diseñé y administré una base de datos de jugadores con MySQL y HeidiSQL, y trabajé sobre la configuración, estabilidad, seguridad y rendimiento del servidor. También desarrollé su página promocional con HTML, CSS y JavaScript.",
      "I developed and adapted Lua scripts, designed and managed a player database with MySQL and HeidiSQL, and worked on server configuration, stability, security and performance. I also developed its promotional website with HTML, CSS and JavaScript.",
    ),
    stack: localized(
      ["Lua", "MySQL", "HeidiSQL", "HTML", "CSS", "JavaScript"],
      ["Lua", "MySQL", "HeidiSQL", "HTML", "CSS", "JavaScript"],
    ),
    highlights: localized(
      [
        "Desarrollo y adaptación de scripts en Lua",
        "Administración de jugadores y datos con MySQL",
        "Mejoras de estabilidad, seguridad y rendimiento",
        "Sitio web promocional del servidor",
      ],
      [
        "Lua script development and adaptation",
        "Player and data management with MySQL",
        "Stability, security and performance improvements",
        "Promotional server website",
      ],
    ),
  },
];

export function getProjects(locale: Locale): ProjectShowcaseItem[] {
  return projectDefinitions.map((project) => ({
    number: project.number,
    featured: project.featured,
    type: project.type[locale],
    title: project.title[locale],
    subtitle: project.subtitle[locale],
    description: project.description[locale],
    status: project.status?.[locale],
    problem: project.problem?.[locale],
    stack: project.stack[locale],
    highlights: project.highlights[locale],
    decisions: project.decisions?.[locale],
    repositoryUrl: project.repositoryUrl,
    repositoryNote: project.repositoryNote?.[locale],
    primaryAction: project.primaryAction
      ? {
          url: project.primaryAction.url,
          label: project.primaryAction.label[locale],
        }
      : undefined,
    secondaryAction: project.secondaryAction
      ? {
          url: project.secondaryAction.url,
          label: project.secondaryAction.label[locale],
        }
      : undefined,
    galleryTitle: project.galleryTitle?.[locale],
    gallery: project.gallery?.map((media) => ({
      src: media.src,
      alt: media.alt[locale],
      caption: media.caption[locale],
      mediaType: media.mediaType,
      poster: media.poster,
    })),
  }));
}
