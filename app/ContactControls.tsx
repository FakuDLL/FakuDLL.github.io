"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "facundorobayna03@gmail.com";

export function ContactNavButton() {
  const goToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (!contactSection) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.replaceState(null, "", "#contacto");
    contactSection.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      className="nav-contact"
      type="button"
      onClick={goToContact}
      aria-label="Ir a la sección de contacto"
    >
      <span className="status-dot" aria-hidden="true" />
      Contactar
    </button>
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
