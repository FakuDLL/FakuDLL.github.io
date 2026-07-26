"use client";

import { useEffect, useId, useRef, useState } from "react";

export type ProjectShowcaseItem = {
  number: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  highlights: string[];
  repositoryUrl?: string;
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);

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
      <div className="projects-list">
        {projects.map((project, projectIndex) => (
          <article
            className="project-card project-card--interactive"
            key={project.number}
          >
            <button
              className="project-card-trigger"
              type="button"
              onClick={() => openProject(projectIndex)}
              aria-haspopup="dialog"
              aria-label={`Abrir detalles de ${project.title}`}
            />
            <div className="project-header">
              <span className="project-number">{project.number}</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <div className="project-content">
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul
                className="tags"
                aria-label={`Tecnologías de ${project.title}`}
              >
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

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
                <span>proyecto_{activeProject.number}</span>
                <span className="project-dialog-state">● ficha de proyecto</span>
              </div>
              <button
                className="project-dialog-close"
                type="button"
                ref={closeButtonRef}
                onClick={closeProject}
                aria-label={`Cerrar detalles de ${activeProject.title}`}
              >
                ×
              </button>
            </header>

            <div className="project-dialog-body">
              <section className="project-dialog-hero">
                <p className="project-dialog-type">{activeProject.type}</p>
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
                  aria-label={`Galería de ${activeProject.title}`}
                >
                  <div className="project-gallery-heading">
                    <div>
                      <span>Material del proyecto</span>
                      <h3>
                        {activeProject.galleryTitle ?? "Capturas reales"}
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
                          aria-label="Ver contenido anterior"
                        >
                          ←
                        </button>
                        <button
                          className="project-gallery-arrow project-gallery-arrow--next"
                          type="button"
                          onClick={showNextMedia}
                          aria-label="Ver contenido siguiente"
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
                        Tu navegador no puede reproducir este video.
                      </video>
                    ) : (
                      <a
                        className="project-gallery-image-link"
                        href={activeMedia.src}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Abrir imagen en tamaño completo: ${activeMedia.caption}`}
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
                        aria-label={`Ver contenido ${imageIndex + 1}: ${media.caption}`}
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
                          ? `${activeGalleryLength} contenidos visibles`
                          : `Mostrando 3 de ${activeGalleryLength} contenidos`}
                      </p>
                      <button
                        type="button"
                        onClick={toggleAllMedia}
                        aria-expanded={showAllMedia}
                      >
                        {showAllMedia
                          ? "Mostrar menos"
                          : "Mostrar todo el contenido"}
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
                    <p>Material visual</p>
                    <strong>Capturas disponibles próximamente.</strong>
                  </div>
                </div>
              )}

              <div className="project-dialog-details">
                <section>
                  <p className="project-dialog-label">Qué incluye</p>
                  <ul className="project-highlights">
                    {activeProject.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </section>

                <aside>
                  <p className="project-dialog-label">Tecnologías</p>
                  <ul
                    className="tags project-dialog-tags"
                    aria-label={`Tecnologías de ${activeProject.title}`}
                  >
                    {activeProject.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  {activeProject.repositoryUrl && (
                    <a
                      className="button button-primary project-repository-link"
                      href={activeProject.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver código en GitHub <span aria-hidden="true">↗</span>
                    </a>
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
