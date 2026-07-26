"use client";

import { useEffect, useId, useRef, useState } from "react";
import { uiCopy } from "./i18n";
import { useLanguage } from "./LanguageContext";

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

type ConnectProfileButtonProps = {
  placement?: "navigation" | "contact";
};

export function ConnectProfileButton({
  placement = "navigation",
}: ConnectProfileButtonProps) {
  const { locale } = useLanguage();
  const copy = uiCopy[locale].connect;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isContactTrigger = placement === "contact";

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
        className={
          isContactTrigger
            ? "button button-primary contact-connect"
            : "nav-connect"
        }
        type="button"
        onClick={openProfile}
        aria-haspopup="dialog"
      >
        {!isContactTrigger && (
          <span className="status-dot" aria-hidden="true" />
        )}
        {copy.trigger}
        {isContactTrigger && <span aria-hidden="true">↗</span>}
      </button>

      <dialog
        className="connect-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={() => setCopied(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProfile();
        }}
      >
        <article className="connect-card">
          <div className="connect-card-topline">
            <span>{copy.file}</span>
            <button
              className="connect-close"
              type="button"
              onClick={closeProfile}
              aria-label={copy.close}
            >
              ×
            </button>
          </div>

          <div className="connect-identity">
            <img
              className="connect-avatar"
              src="/profile/facundo-robayna.webp"
              alt=""
              width="900"
              height="900"
            />
            <div>
              <p className="connect-availability">
                <span className="status-dot" aria-hidden="true" />
                {copy.availability}
              </p>
              <h2 id={titleId}>Facundo Robayna</h2>
              <p>{copy.role}</p>
            </div>
          </div>

          <dl className="connect-facts">
            {copy.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="connect-actions">
            <button type="button" onClick={copyEmail} aria-live="polite">
              {copied ? copy.emailCopied : copy.copyEmail}
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
