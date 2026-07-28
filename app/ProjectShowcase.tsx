"use client";

import { useEffect, useId, useRef, useState } from "react";
import { uiCopy } from "./i18n";
import { useLanguage } from "./LanguageContext";

export type ProjectShowcaseItem = {
  number: string;
  featured?: boolean;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  problem?: string;
  stack: string[];
  highlights: string[];
  decisions?: string[];
  repositoryUrl?: string;
  repositoryNote?: string;
  primaryAction?: {
    url: string;
    label: string;
  };
  hostingNote?: string;
  secondaryAction?: {
    url: string;
    label: string;
  };
  galleryTitle?: string;
  gallery?: {
    src: string;
    alt: string;
    caption: string;
    mediaType?: "image" | "video";
    poster?: string;
  }[];
};

type ProjectShowcaseProps = {
  projects: ProjectShowcaseItem[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const { locale } = useLanguage();
  const copy = uiCopy[locale].projectDialog;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const projectsListId = useId();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const initialProjectCount = 4;
  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, initialProjectCount);

  const activeProject =
    activeProjectIndex === null ? null : projects[activeProjectIndex];
  const activeGalleryLength = activeProject?.gallery?.length ?? 0;
  const activeMedia = activeProject?.gallery?.[activeImageIndex];
  const visibleGallery = activeProject?.gallery
    ? showAllMedia
      ? activeProject.gallery
      : activeProject.gallery.slice(0, 3)
    : [];

  useEffect(() => {
    if (activeProjectIndex === null || dialogRef.current?.open) return;

    dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
  }, [activeProjectIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || activeProjectIndex === null || activeGalleryLength < 2) {
      return;
    }

    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImageIndex(
          (currentIndex) =>
            (currentIndex - 1 + activeGalleryLength) % activeGalleryLength,
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImageIndex(
          (currentIndex) => (currentIndex + 1) % activeGalleryLength,
        );
      }
    };

    dialog.addEventListener("keydown", handleArrowNavigation);
    return () => dialog.removeEventListener("keydown", handleArrowNavigation);
  }, [activeGalleryLength, activeProjectIndex]);

  const openProject = (projectIndex: number) => {
    setActiveImageIndex(0);
    setShowAllMedia(false);
    setActiveProjectIndex(projectIndex);
  };

  const closeProject = () => {
    dialogRef.current?.close();
  };

  const showPreviousMedia = () => {
    if (activeGalleryLength < 2) return;

    setActiveImageIndex(
      (currentIndex) =>
        (currentIndex - 1 + activeGalleryLength) % activeGalleryLength,
    );
  };

  const showNextMedia = () => {
    if (activeGalleryLength < 2) return;

    setActiveImageIndex(
      (currentIndex) => (currentIndex + 1) % activeGalleryLength,
    );
  };

  const toggleAllMedia = () => {
    if (showAllMedia && activeImageIndex >= 3) {
      setActiveImageIndex(0);
    }

    setShowAllMedia((currentValue) => !currentValue);
  };

  return (
    <>
      <div className="projects-list" id={projectsListId}>
        {visibleProjects.map((project, projectIndex) => (
          <article
            className={`project-card project-card--interactive${
              project.featured ? " project-card--featured" : ""
            }${
              projectIndex >= initialProjectCount
                ? " project-card--revealed"
                : ""
            }`}
            key={project.number}
          >
            <button
              className="project-card-trigger"
              type="button"
              onClick={() => openProject(projectIndex)}
              aria-haspopup="dialog"
              aria-label={`${copy.openDetails} ${project.title}`}
            />
            <div className="project-header">
              <span className="project-number">{project.number}</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <div className="project-content">
              <div className="project-card-meta">
                <p className="project-type">{project.type}</p>
                {project.status && (
                  <span className="project-status">{project.status}</span>
                )}
              </div>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul
                className="tags notranslate"
                aria-label={`${copy.technologiesOf} ${project.title}`}
                translate="no"
              >
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {projects.length > initialProjectCount && (
        <div className="projects-toggle-shell">
          <button
            className="button button-ghost projects-toggle"
            type="button"
            onClick={() => setShowAllProjects((currentValue) => !currentValue)}
            aria-expanded={showAllProjects}
            aria-controls={projectsListId}
          >
            {showAllProjects
              ? uiCopy[locale].projectsSection.showLess
              : uiCopy[locale].projectsSection.showMore}
            <span aria-hidden="true">{showAllProjects ? "↑" : "↓"}</span>
          </button>
        </div>
      )}

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => setActiveProjectIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
      >
        {activeProject && (
          <article className="project-dialog-shell">
            <header className="project-dialog-topline">
              <div>
                <span>
                  {copy.filePrefix}_{activeProject.number}
                </span>
                <span className="project-dialog-state">{copy.sheet}</span>
              </div>
              <button
                className="project-dialog-close"
                type="button"
                ref={closeButtonRef}
                onClick={closeProject}
                aria-label={`${copy.closeDetails} ${activeProject.title}`}
              >
                ×
              </button>
            </header>

            <div className="project-dialog-body">
              <section className="project-dialog-hero">
                <div className="project-dialog-meta">
                  <p className="project-dialog-type">{activeProject.type}</p>
                  {activeProject.status && (
                    <span className="project-dialog-status">
                      {copy.status} · {activeProject.status}
                    </span>
                  )}
                </div>
                <h2 id={titleId}>{activeProject.title}</h2>
                <p className="project-dialog-subtitle">
                  {activeProject.subtitle}
                </p>
                <p className="project-dialog-description" id={descriptionId}>
                  {activeProject.description}
                </p>
              </section>

              {activeProject.gallery?.length && activeMedia ? (
                <section
                  className="project-gallery"
                  aria-label={`${copy.galleryOf} ${activeProject.title}`}
                >
                  <div className="project-gallery-heading">
                    <div>
                      <span>{copy.material}</span>
                      <h3>
                        {activeProject.galleryTitle ?? copy.realScreenshots}
                      </h3>
                    </div>
                    <span>
                      {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(activeProject.gallery.length).padStart(2, "0")}
                    </span>
                  </div>

                  <figure className="project-gallery-main">
                    {activeGalleryLength > 1 && (
                      <>
                        <button
                          className="project-gallery-arrow project-gallery-arrow--previous"
                          type="button"
                          onClick={showPreviousMedia}
                          aria-label={copy.previous}
                        >
                          ←
                        </button>
                        <button
                          className="project-gallery-arrow project-gallery-arrow--next"
                          type="button"
                          onClick={showNextMedia}
                          aria-label={copy.next}
                        >
                          →
                        </button>
                      </>
                    )}

                    {activeMedia.mediaType === "video" ? (
                      <video
                        className="project-gallery-video"
                        controls
                        preload="metadata"
                        poster={activeMedia.poster}
                      >
                        <source src={activeMedia.src} />
                        {copy.videoFallback}
                      </video>
                    ) : (
                      <a
                        className="project-gallery-image-link"
                        href={activeMedia.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${copy.openFullImage}: ${activeMedia.caption}`}
                      >
                        <img src={activeMedia.src} alt={activeMedia.alt} />
                      </a>
                    )}
                    <figcaption aria-live="polite">
                      {activeMedia.caption}
                    </figcaption>
                  </figure>

                  <div
                    className={`project-gallery-thumbnails${
                      visibleGallery.length <= 2
                        ? " project-gallery-thumbnails--compact"
                        : ""
                    }`}
                  >
                    {visibleGallery.map((media, imageIndex) => (
                      <button
                        className={
                          imageIndex === activeImageIndex ? "is-active" : ""
                        }
                        type="button"
                        key={media.src}
                        onClick={() => setActiveImageIndex(imageIndex)}
                        aria-label={`${copy.viewContent} ${imageIndex + 1}: ${media.caption}`}
                        aria-pressed={imageIndex === activeImageIndex}
                      >
                        {media.mediaType === "video" ? (
                          media.poster ? (
                            <img src={media.poster} alt="" />
                          ) : (
                            <span
                              className="project-gallery-video-icon"
                              aria-hidden="true"
                            >
                              ▶
                            </span>
                          )
                        ) : (
                          <img src={media.src} alt="" />
                        )}
                        <span className="project-gallery-thumbnail-index">
                          {String(imageIndex + 1).padStart(2, "0")}
                        </span>
                      </button>
                    ))}
                  </div>

                  {activeGalleryLength > 3 && (
                    <div className="project-gallery-toggle">
                      <p>
                        {showAllMedia
                          ? `${activeGalleryLength} ${copy.visibleContent}`
                          : `${copy.showing} 3 ${copy.of} ${activeGalleryLength} ${copy.contents}`}
                      </p>
                      <button
                        type="button"
                        onClick={toggleAllMedia}
                        aria-expanded={showAllMedia}
                      >
                        {showAllMedia
                          ? copy.showLess
                          : copy.showAll}
                        <span aria-hidden="true">
                          {showAllMedia ? "↑" : "↓"}
                        </span>
                      </button>
                    </div>
                  )}
                </section>
              ) : (
                <div className="project-gallery-empty">
                  <span aria-hidden="true">◇</span>
                  <div>
                    <p>{copy.visualMaterial}</p>
                    <strong>{copy.comingSoon}</strong>
                  </div>
                </div>
              )}

              <div className="project-dialog-details">
                <section>
                  {activeProject.problem && (
                    <div className="project-problem">
                      <p className="project-dialog-label">{copy.problem}</p>
                      <p>{activeProject.problem}</p>
                    </div>
                  )}
                  <p className="project-dialog-label">{copy.includes}</p>
                  <ul className="project-highlights">
                    {activeProject.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {activeProject.decisions?.length && (
                    <div className="project-decisions">
                      <p className="project-dialog-label">{copy.decisions}</p>
                      <ul className="project-highlights">
                        {activeProject.decisions.map((decision) => (
                          <li key={decision}>{decision}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>

                <aside>
                  <p className="project-dialog-label">
                    {copy.technologies}
                  </p>
                  <ul
                    className="tags project-dialog-tags notranslate"
                    aria-label={`${copy.technologiesOf} ${activeProject.title}`}
                    translate="no"
                  >
                    {activeProject.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  {(activeProject.primaryAction ||
                    activeProject.secondaryAction) && (
                    <div className="project-actions">
                      {activeProject.primaryAction && (
                        <a
                          className="button button-primary"
                          href={activeProject.primaryAction.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {activeProject.primaryAction.label}{" "}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {activeProject.secondaryAction && (
                        <a
                          className="button button-ghost"
                          href={activeProject.secondaryAction.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {activeProject.secondaryAction.label}{" "}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                  {activeProject.hostingNote && (
                    <p className="project-hosting-note">
                      {activeProject.hostingNote}
                    </p>
                  )}
                  {activeProject.repositoryUrl && (
                    <a
                      className="button button-primary project-repository-link"
                      href={activeProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.viewCode} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {activeProject.repositoryNote && (
                    <p className="project-repository-note">
                      {activeProject.repositoryNote}
                    </p>
                  )}
                </aside>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}
