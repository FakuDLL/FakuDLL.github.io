"use client";

import {
  ConnectProfileButton,
  SectionLink,
} from "./ContactControls";
import { getProjects, technologiesByLocale, uiCopy } from "./i18n";
import { useLanguage } from "./LanguageContext";
import { ProjectShowcase } from "./ProjectShowcase";

export default function Home() {
  const { locale, reopenLanguageSelector } = useLanguage();
  const copy = uiCopy[locale];
  const technologies = technologiesByLocale[locale];
  const projects = getProjects(locale);

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <SectionLink
            className="brand"
            targetId="inicio"
            aria-label={copy.nav.homeLabel}
          >
            <span aria-hidden="true">FR</span>
          </SectionLink>

          <nav className="desktop-nav" aria-label={copy.nav.desktopLabel}>
            {copy.nav.items.map(([label, targetId], index) => (
              <SectionLink targetId={targetId} key={targetId}>
                <span aria-hidden="true">0{index + 1}</span>
                {label}
              </SectionLink>
            ))}
          </nav>

          <details className="mobile-nav">
            <summary>{copy.nav.sections}</summary>
            <nav aria-label={copy.nav.mobileLabel}>
              {copy.nav.items.map(([label, targetId], index) => (
                <SectionLink targetId={targetId} key={targetId}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {label}
                </SectionLink>
              ))}
            </nav>
          </details>

          <div className="nav-actions">
            <button
              className="language-reopen"
              type="button"
              onClick={reopenLanguageSelector}
              aria-label={copy.nav.changeLanguage}
            >
              {locale.toUpperCase()}
            </button>
            <ConnectProfileButton />
          </div>
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
                {copy.hero.availability}
              </p>
              <h1>
                <span>{copy.hero.headlineFirst}</span>
                <span className="accent-text">
                  {copy.hero.headlineSecond}
                </span>
              </h1>
            </div>

            <div className="hero-bottom">
              <div>
                <p className="hero-intro">{copy.hero.intro}</p>
                <div className="hero-actions">
                  <SectionLink
                    className="button button-primary"
                    targetId="proyectos"
                  >
                    {copy.hero.projectsButton}{" "}
                    <span aria-hidden="true">↘</span>
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

              <aside
                className="profile-panel"
                aria-label={copy.hero.panelLabel}
              >
                <div className="panel-header">
                  <span>{copy.hero.panelFile}</span>
                  <span className="panel-state">{copy.hero.active}</span>
                </div>
                <div className="profile-identity">
                  <img
                    src="/profile/facundo-robayna.webp"
                    alt={copy.hero.portraitAlt}
                    width="900"
                    height="900"
                  />
                  <div>
                    <strong>Facundo Robayna</strong>
                    <span>{copy.hero.role}</span>
                  </div>
                </div>
                <dl>
                  {copy.hero.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>

            <SectionLink className="scroll-cue" targetId="sobre-mi">
              {copy.hero.scroll} <span aria-hidden="true">↓</span>
            </SectionLink>
          </div>
        </section>

        <section className="section about-section" id="sobre-mi">
          <div className="container">
            <div className="section-label">
              <span>01</span>
              <p>{copy.about.label}</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="about-grid">
              <h2>
                {copy.about.headingFirst}
                <span>{copy.about.headingSecond}</span>
              </h2>
              <div className="about-copy">
                <figure className="about-portrait">
                  <img
                    src="/profile/facundo-robayna.webp"
                    alt={copy.about.portraitAlt}
                    width="900"
                    height="900"
                    loading="lazy"
                  />
                  <figcaption>
                    <span>Facundo Robayna</span>
                    <span>{copy.about.location}</span>
                  </figcaption>
                </figure>
                <p className="large-copy">{copy.about.lead}</p>
                <p>{copy.about.body}</p>
              </div>
            </div>

            <div className="principles">
              {copy.about.principles.map((principle) => (
                <article key={principle.eyebrow}>
                  <span>{principle.eyebrow}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section technologies-section" id="tecnologias">
          <div className="container">
            <div className="section-label">
              <span>02</span>
              <p>{copy.technologies.label}</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="section-heading">
              <h2>{copy.technologies.heading}</h2>
              <p>{copy.technologies.description}</p>
            </div>

            <ul className="tech-grid" aria-label={copy.technologies.listLabel}>
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
              <p>{copy.projectsSection.label}</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="section-heading">
              <h2>{copy.projectsSection.heading}</h2>
              <p>{copy.projectsSection.description}</p>
            </div>

            <ProjectShowcase projects={projects} />
          </div>
        </section>

        <section className="section experience-section" id="experiencia">
          <div className="container">
            <div className="section-label">
              <span>04</span>
              <p>{copy.experience.label}</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="experience-grid">
              <div className="section-heading">
                <h2>{copy.experience.heading}</h2>
                <p>{copy.experience.description}</p>
              </div>
              <div className="timeline">
                {copy.experience.items.map((item, index) => (
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
              <p>{copy.contact.label}</p>
              <span className="label-line" aria-hidden="true" />
            </div>

            <div className="contact-grid">
              <div className="contact-heading">
                <p className="contact-kicker">{copy.contact.kicker}</p>
                <h2>{copy.contact.heading}</h2>
              </div>
              <div className="contact-copy">
                <p>{copy.contact.description}</p>
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
          <p>{copy.footer.role}</p>
          <SectionLink targetId="inicio">
            {copy.footer.backToTop} ↑
          </SectionLink>
        </div>
      </footer>
    </>
  );
}
