"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, summary, input, textarea, select, [role='button'], [data-cursor-interactive]";

export function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let active = false;

    const updateInteractiveState = (target: EventTarget | null) => {
      cursor.classList.toggle(
        "is-interactive",
        target instanceof Element &&
          Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const paint = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate3d(-50%, -50%, 0)`;
      cursor.classList.add("is-visible");
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateInteractiveState(event.target);

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(paint);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      updateInteractiveState(event.target);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        cursor.classList.remove("is-visible", "is-interactive", "is-pressed");
        return;
      }

      updateInteractiveState(event.relatedTarget);
    };

    const handlePointerDown = () => cursor.classList.add("is-pressed");
    const handlePointerUp = () => cursor.classList.remove("is-pressed");
    const hideCursor = () =>
      cursor.classList.remove("is-visible", "is-interactive", "is-pressed");

    const deactivate = () => {
      if (!active) return;
      active = false;
      root.removeAttribute("data-custom-cursor");
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", hideCursor);
      hideCursor();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const activate = () => {
      if (active || !finePointer.matches || reducedMotion.matches) return;
      active = true;
      root.setAttribute("data-custom-cursor", "enabled");
      document.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      document.addEventListener("pointerover", handlePointerOver, {
        passive: true,
      });
      document.addEventListener("pointerout", handlePointerOut, {
        passive: true,
      });
      document.addEventListener("pointerdown", handlePointerDown, {
        passive: true,
      });
      document.addEventListener("pointerup", handlePointerUp, {
        passive: true,
      });
      document.addEventListener("pointercancel", handlePointerUp, {
        passive: true,
      });
      window.addEventListener("blur", hideCursor);
    };

    const syncCursor = () => {
      deactivate();
      activate();
    };

    finePointer.addEventListener("change", syncCursor);
    reducedMotion.addEventListener("change", syncCursor);
    activate();

    return () => {
      finePointer.removeEventListener("change", syncCursor);
      reducedMotion.removeEventListener("change", syncCursor);
      deactivate();
    };
  }, []);

  return (
    <span className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-dot" />
    </span>
  );
}
