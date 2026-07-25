"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "facundorobayna03@gmail.com";

type SectionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  targetId: string;
};

export function SectionLink({
  targetId,
  onClick,
  ...props
}: SectionLinkProps) {
  return (
    <a
      {...props}
      href={`#${targetId}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        event.preventDefault();
        const target = document.getElementById(targetId);
        if (!target) return;

        const header = document.querySelector<HTMLElement>(".site-header");
        const headerOffset =
          targetId === "inicio"
            ? 0
            : Math.ceil((header?.getBoundingClientRect().bottom ?? 0) + 14);
        const targetTop =
          targetId === "inicio"
            ? 0
            : Math.max(
                0,
                Math.round(
                  window.scrollY +
                    target.getBoundingClientRect().top -
                    headerOffset,
                ),
              );

        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
        window.scrollTo(0, targetTop);
        event.currentTarget.blur();

        const mobileMenu = event.currentTarget.closest("details");
        if (mobileMenu) mobileMenu.open = false;
      }}
    />
  );
}

async function copyEmailToClipboard() {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = EMAIL;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

export function ConnectProfileButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const openProfile = () => {
    setCopied(false);
    dialogRef.current?.showModal();
  };

  const closeProfile = () => {
    dialogRef.current?.close();
  };

  const copyEmail = async () => {
    await copyEmailToClipboard();
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2600);
  };

  return (
    <>
      <button
        className="nav-connect"
        type="button"
        onClick={openProfile}
        aria-haspopup="dialog"
      >
        <span className="status-dot" aria-hidden="true" />
        Conectar
      </button>

      <dialog
        className="connect-dialog"
        ref={dialogRef}
        aria-labelledby="connect-profile-title"
        onCancel={() => setCopied(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProfile();
        }}
      >
        <article className="connect-card">
          <div className="connect-card-topline">
            <span>perfil.local</span>
            <button
              className="connect-close"
              type="button"
              onClick={closeProfile}
              aria-label="Cerrar perfil"
            >
              ×
            </button>
          </div>

          <div className="connect-identity">
            <span className="connect-monogram" aria-hidden="true">
              FR
            </span>
            <div>
              <p className="connect-availability">
                <span className="status-dot" aria-hidden="true" />
                Disponible para oportunidades junior
              </p>
              <h2 id="connect-profile-title">Facundo Robayna</h2>
              <p>Estudiante de TI · Desarrollador de Software Junior</p>
            </div>
          </div>

          <dl className="connect-facts">
            <div>
              <dt>Ubicación</dt>
              <dd>Montevideo, Uruguay</dd>
            </div>
            <div>
              <dt>Formación</dt>
              <dd>Analista en TI · ORT Uruguay</dd>
            </div>
            <div>
              <dt>Foco</dt>
              <dd>Web · APIs · Datos</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>C# · .NET · SQL · JavaScript</dd>
            </div>
          </dl>

          <div className="connect-actions">
            <button type="button" onClick={copyEmail} aria-live="polite">
              {copied ? "Email copiado ✓" : "Copiar email"}
            </button>
            <a
              href="https://www.linkedin.com/in/facundo-robayna-6612a7290/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/FakuDLL"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="/cv-facundo-robayna.pdf"
              download="Facundo-Robayna-CV.pdf"
            >
              CV ↓
            </a>
          </div>
        </article>
      </dialog>
    </>
  );
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    await copyEmailToClipboard();
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2600);
  };

  return (
    <button
      className="button button-primary"
      type="button"
      onClick={copyEmail}
      aria-live="polite"
    >
      {copied ? "Email copiado" : "Copiar email"}
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
    </button>
  );
}
