import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "../data/slides-content";
import { useSlideNavigation } from "../hooks/useSlideNavigation";
import { useFullscreen } from "../hooks/useFullscreen";
import { Slide } from "./Slide";
import { AuroraBackground } from "~/components/ui/aurora-background";
import { Particles } from "~/components/ui/particles";

type SlideContainerProps = {
  slideNumber: number;
};

export function SlideContainer({ slideNumber }: SlideContainerProps) {
  const { currentSlide, totalSlides, nextSlide, prevSlide, goToSlide } =
    useSlideNavigation(slideNumber);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isOverviewMode, setIsOverviewMode] = useState(false);

  const toggleTheme = () => setIsLightMode((prev) => !prev);
  const toggleOverview = () => setIsOverviewMode((prev) => !prev);

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

      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        toggleOverview();
      }

      if (e.key === "Escape") {
        if (isOverviewMode) {
          e.preventDefault();
          setIsOverviewMode(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen, isFullscreen, toggleTheme, toggleOverview, isOverviewMode]);

  // Scroll navigation
  useEffect(() => {
    if (isOverviewMode) return;

    let lastScrollTime = 0;
    const scrollThrottle = 500; // ms between scroll navigations

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;

      if (e.deltaY > 0 && currentSlide < totalSlides) {
        lastScrollTime = now;
        nextSlide();
      } else if (e.deltaY < 0 && currentSlide > 1) {
        lastScrollTime = now;
        prevSlide();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOverviewMode, currentSlide, totalSlides, nextSlide, prevSlide]);

  const slide = slides[currentSlide - 1];

  if (!slide) {
    return (
      <div className="slide-container flex items-center justify-center">
        <p className="text-2xl text-gray-400">Slide not found</p>
      </div>
    );
  }

  const handleSlideClick = (e: React.MouseEvent) => {
    // Don't navigate if in overview mode or clicking on a button or link
    if (isOverviewMode) return;
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLAnchorElement ||
      (e.target instanceof Element && e.target.closest("button, a"))
    ) {
      return;
    }
    if (currentSlide < totalSlides) {
      nextSlide();
    }
  };

  const handleOverviewSlideClick = (slideIndex: number) => {
    goToSlide(slideIndex + 1);
    setIsOverviewMode(false);
  };

  return (
    <div
      className={isLightMode ? "slide-container-light" : "slide-container"}
      onClick={handleSlideClick}
      style={{ cursor: !isOverviewMode && currentSlide < totalSlides ? "pointer" : "default" }}
    >
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
        quantity={30}
        staticity={40}
        ease={60}
        isLightMode={isLightMode}
      />

      {/* Overview Grid */}
      <AnimatePresence>
        {isOverviewMode && (
          <motion.div
            className="fixed inset-0 z-40 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`min-h-screen p-8 pt-16 ${isLightMode ? "bg-gray-100/95" : "bg-gray-900/95"}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {slides.map((s, index) => (
                  <motion.button
                    key={s.id}
                    onClick={() => handleOverviewSlideClick(index)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      currentSlide === index + 1
                        ? isLightMode
                          ? "border-purple-500 ring-4 ring-purple-500/30"
                          : "border-purple-400 ring-4 ring-purple-400/30"
                        : isLightMode
                          ? "border-gray-300 hover:border-purple-400"
                          : "border-gray-700 hover:border-purple-500"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* Scaled slide preview */}
                    <div
                      className={`absolute inset-0 origin-top-left ${isLightMode ? "bg-gray-100" : "bg-gray-900"}`}
                      style={{
                        width: "1920px",
                        height: "1080px",
                        transform: "scale(0.15)",
                        transformOrigin: "top left",
                      }}
                    >
                      <div className={`w-full h-full ${isLightMode ? "slide-container-light" : "slide-container"}`}>
                        <Slide slide={s} isLightMode={isLightMode} />
                      </div>
                    </div>
                    {/* Slide number badge */}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold z-10 ${
                      currentSlide === index + 1
                        ? "bg-purple-500 text-white"
                        : isLightMode
                          ? "bg-gray-200/80 text-gray-700"
                          : "bg-gray-800/80 text-gray-300"
                    }`}>
                      {index + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Slide key={slide.id} slide={slide} isLightMode={isLightMode} />
      </AnimatePresence>

      {/* Bottom toolbar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 p-2 rounded-2xl z-50 backdrop-blur-md ${
        isLightMode
          ? "bg-white/70 shadow-lg border border-gray-200/50"
          : "bg-gray-900/70 shadow-2xl border border-gray-700/50"
      }`}>
        {/* Overview button */}
        <button
          onClick={toggleOverview}
          className={`p-2.5 rounded-xl transition-all ${
            isOverviewMode
              ? "bg-purple-500 text-white"
              : isLightMode
                ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
                : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
          }`}
          aria-label={isOverviewMode ? "Exit overview" : "Show all slides"}
          title="Overview (G)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>

        {/* Divider */}
        <div className={`w-px h-6 mx-1 ${isLightMode ? "bg-gray-300" : "bg-gray-600"}`} />

        {/* Previous slide */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className={`p-2.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all ${
            isLightMode
              ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
              : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
          }`}
          aria-label="Previous slide"
          title="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slide counter */}
        <span className={`px-3 text-sm font-medium tabular-nums ${isLightMode ? "text-gray-700" : "text-gray-300"}`}>
          {currentSlide} / {totalSlides}
        </span>

        {/* Next slide */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          className={`p-2.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all ${
            isLightMode
              ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
              : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
          }`}
          aria-label="Next slide"
          title="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Divider */}
        <div className={`w-px h-6 mx-1 ${isLightMode ? "bg-gray-300" : "bg-gray-600"}`} />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all ${
            isLightMode
              ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
              : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
          }`}
          aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
          title={isLightMode ? "Dark mode (L)" : "Light mode (L)"}
        >
          {isLightMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className={`p-2.5 rounded-xl transition-all ${
            isLightMode
              ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
              : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
          }`}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0v5m0-5h5M15 9l5-5m0 0v5m0-5h-5M9 15l-5 5m0 0v-5m0 5h5M15 15l5 5m0 0v-5m0 5h-5" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
