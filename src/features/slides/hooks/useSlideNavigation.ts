import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { TOTAL_SLIDES } from "../data/slides-content";
import type { SlideNavigation } from "../types";

export function useSlideNavigation(currentSlide: number): SlideNavigation {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);

  const goToSlide = useCallback(
    (n: number) => {
      const clampedSlide = Math.max(1, Math.min(n, TOTAL_SLIDES));
      navigate({
        to: "/slides",
        search: { slide: clampedSlide },
      });
    },
    [navigate]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const goToFirst = useCallback(() => {
    goToSlide(1);
  }, [goToSlide]);

  const goToLast = useCallback(() => {
    goToSlide(TOTAL_SLIDES);
  }, [goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToFirst();
          break;
        case "End":
          e.preventDefault();
          goToLast();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToFirst, goToLast]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      touchStartX.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return {
    currentSlide,
    totalSlides: TOTAL_SLIDES,
    goToSlide,
    nextSlide,
    prevSlide,
    goToFirst,
    goToLast,
  };
}
