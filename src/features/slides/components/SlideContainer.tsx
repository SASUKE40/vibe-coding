import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { slides } from "../data/slides-content";
import { useSlideNavigation } from "../hooks/useSlideNavigation";
import { useFullscreen } from "../hooks/useFullscreen";
import { Slide } from "./Slide";
import { SlideProgress } from "./SlideProgress";
import { AuroraBackground } from "~/components/ui/aurora-background";
import { Particles } from "~/components/ui/particles";

type SlideContainerProps = {
  slideNumber: number;
};

export function SlideContainer({ slideNumber }: SlideContainerProps) {
  const { currentSlide, totalSlides, nextSlide, prevSlide } =
    useSlideNavigation(slideNumber);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleTheme = () => setIsLightMode((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }

      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        toggleTheme();
      }

      if (e.key === "Escape" && isFullscreen) {
        // Browser handles this, but we track state
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen, isFullscreen, toggleTheme]);

  const slide = slides[currentSlide - 1];

  if (!slide) {
    return (
      <div className="slide-container flex items-center justify-center">
        <p className="text-2xl text-gray-400">Slide not found</p>
      </div>
    );
  }

  return (
    <div className={isLightMode ? "slide-container-light" : "slide-container"}>
      {/* Aurora background effect */}
      <AuroraBackground
        className="absolute inset-0 z-0"
        isLightMode={isLightMode}
        showRadialGradient={true}
      >
        <span className="sr-only">Aurora background effect</span>
      </AuroraBackground>

      {/* Particles overlay */}
      <Particles
        className="z-10"
        quantity={50}
        staticity={50}
        ease={50}
        isLightMode={isLightMode}
      />

      <AnimatePresence mode="wait">
        <Slide key={slide.id} slide={slide} isLightMode={isLightMode} />
      </AnimatePresence>

      <SlideProgress
        current={currentSlide}
        total={totalSlides}
        isLightMode={isLightMode}
      />

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-16 p-2 rounded-lg transition-all z-50 ${
          isLightMode
            ? "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 hover:text-gray-900"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
        }`}
        aria-label={
          isLightMode ? "Switch to dark mode" : "Switch to light mode"
        }
        title={
          isLightMode ? "Switch to dark mode (L)" : "Switch to light mode (L)"
        }
      >
        {isLightMode ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>

      {/* Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className={`fixed top-4 right-4 p-2 rounded-lg transition-all z-50 ${
          isLightMode
            ? "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 hover:text-gray-900"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
        }`}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        title={isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}
      >
        {isFullscreen ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 9L4 4m0 0v5m0-5h5M15 9l5-5m0 0v5m0-5h-5M9 15l-5 5m0 0v-5m0 5h5M15 15l5 5m0 0v-5m0 5h-5"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
            />
          </svg>
        )}
      </button>

      <button
        onClick={prevSlide}
        disabled={currentSlide === 1}
        className={`fixed left-4 top-1/2 -translate-y-1/2 p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all z-50 ${
          isLightMode
            ? "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 hover:text-gray-900"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
        }`}
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={currentSlide === totalSlides}
        className={`fixed right-4 top-1/2 -translate-y-1/2 p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all z-50 ${
          isLightMode
            ? "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50 hover:text-gray-900"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
        }`}
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
