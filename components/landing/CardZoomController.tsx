"use client";

import { useEffect } from "react";

const CARD_SELECTORS = ".why-card, .step, .portal, .ai-card, .res, .ben, .consent, .priv-item";

export function CardZoomController() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Handle consent switch toggles
      const toggleBtn = target.closest(".toggle");
      if (toggleBtn) {
        e.preventDefault();
        const current = toggleBtn.getAttribute("aria-checked") === "true";
        toggleBtn.setAttribute("aria-checked", (!current).toString());
        return;
      }

      // If user clicked inside an interactive link/button inside card, don't interrupt link
      if (target.closest("a, button:not(.toggle)")) {
        return;
      }

      // Check if user clicked a card
      const card = target.closest(CARD_SELECTORS);
      const allCards = document.querySelectorAll(CARD_SELECTORS);

      if (card) {
        const isCurrentlyZoomed = card.classList.contains("is-zoomed");

        // Remove from all cards first
        allCards.forEach((c) => c.classList.remove("is-zoomed"));

        // Toggle on clicked card if it was not already zoomed
        if (!isCurrentlyZoomed) {
          card.classList.add("is-zoomed");
        }
      } else {
        // Clicked outside any card
        allCards.forEach((c) => c.classList.remove("is-zoomed"));
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const allCards = document.querySelectorAll(CARD_SELECTORS);
        allCards.forEach((c) => c.classList.remove("is-zoomed"));
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
