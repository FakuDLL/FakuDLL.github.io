"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { type Locale, uiCopy } from "./i18n";

type LanguageContextValue = {
  locale: Locale;
  reopenLanguageSelector: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = "portfolio-language";

function detectDeviceLocale(): Locale {
  const deviceLanguage = navigator.language.toLowerCase();
  return deviceLanguage === "es" || deviceLanguage.startsWith("es-")
    ? "es"
    : "en";
}

export function LanguageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const spanishButtonRef = useRef<HTMLButtonElement>(null);
  const englishButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [locale, setLocale] = useState<Locale>("en");
  const [deviceLocale, setDeviceLocale] = useState<Locale>("en");
  const [isReady, setIsReady] = useState(false);
  const [hasPreference, setHasPreference] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const detectedLocale = detectDeviceLocale();
    let savedLocale: string | null = null;

    try {
      savedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in hardened browser contexts.
    }

    setDeviceLocale(detectedLocale);

    if (savedLocale === "es" || savedLocale === "en") {
      setLocale(savedLocale);
      setHasPreference(true);
      setIsSelectorOpen(false);
    } else {
      setLocale(detectedLocale);
      setIsSelectorOpen(true);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = uiCopy[locale].metaTitle;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", uiCopy[locale].metaDescription);
  }, [locale]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isReady) return;

    if (isSelectorOpen) {
      if (!dialog.open) dialog.showModal();
      const preferredButton =
        deviceLocale === "es"
          ? spanishButtonRef.current
          : englishButtonRef.current;
      requestAnimationFrame(() => preferredButton?.focus());
      return;
    }

    if (dialog.open) dialog.close();
  }, [deviceLocale, isReady, isSelectorOpen]);

  const selectLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setHasPreference(true);
    setIsSelectorOpen(false);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    } catch {
      // The selected language still applies to the current visit.
    }
  };

  const selectorLocale = hasPreference ? locale : deviceLocale;
  const selectorCopy = uiCopy[selectorLocale].selector;

  return (
    <LanguageContext.Provider
      value={{
        locale,
        reopenLanguageSelector: () => setIsSelectorOpen(true),
      }}
    >
      {children}

      <dialog
        className="language-dialog"
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => event.preventDefault()}
      >
        <article className="language-card">
          <div className="language-card-topline">
            <span>language.config</span>
            <span>ES / EN</span>
          </div>

          <div className="language-card-copy">
            <p>{selectorCopy.eyebrow}</p>
            <h2 id={titleId}>{selectorCopy.title}</h2>
            <p id={descriptionId}>{selectorCopy.description}</p>
          </div>

          <div className="language-options">
            <button
              type="button"
              ref={spanishButtonRef}
              onClick={() => selectLanguage("es")}
              data-recommended={deviceLocale === "es"}
            >
              <span className="language-option-index">01 / ES</span>
              <strong>{selectorCopy.spanish}</strong>
              {deviceLocale === "es" && (
                <small>{selectorCopy.recommended}</small>
              )}
              <span className="language-option-arrow" aria-hidden="true">
                ↗
              </span>
            </button>

            <button
              type="button"
              ref={englishButtonRef}
              onClick={() => selectLanguage("en")}
              data-recommended={deviceLocale === "en"}
            >
              <span className="language-option-index">02 / EN</span>
              <strong>{selectorCopy.english}</strong>
              {deviceLocale === "en" && (
                <small>{selectorCopy.recommended}</small>
              )}
              <span className="language-option-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>

          <p className="language-device-hint">
            <span aria-hidden="true">●</span>
            {selectorCopy.deviceHint}:{" "}
            {deviceLocale === "es" ? "Español" : "English"}
          </p>
        </article>
      </dialog>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return value;
}
