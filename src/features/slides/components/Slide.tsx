import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type {
  Slide as SlideType,
  TitleSlide,
  StandardSlide,
  CodeSlide,
  SplitSlide,
  QuoteSlide,
  ImageSlide,
  BulletItem,
} from "../types";
import { CodeBlock } from "./CodeBlock";
import {
  Keyboard,
  Search,
  ListChecks,
  CheckCircle,
  TrendingDown,
  FileText,
  Users,
  BookOpen,
  GitBranch,
  RefreshCw,
  TestTube,
  Monitor,
  Layers,
  Terminal,
  Rocket,
  ExternalLink,
  FolderOpen,
  Play,
  Zap,
  Globe,
  Eye,
  History,
  Share2,
  PenTool,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Keyboard,
  Search,
  ListChecks,
  CheckCircle,
  TrendingDown,
  FileText,
  Users,
  BookOpen,
  GitBranch,
  RefreshCw,
  TestTube,
  Monitor,
  Layers,
  Terminal,
  Rocket,
  ExternalLink,
  FolderOpen,
  Play,
  Zap,
  Globe,
  Eye,
  History,
  Share2,
  PenTool,
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

type SlideProps = {
  slide: SlideType;
  isLightMode?: boolean;
};

function BulletIcon({ iconName, isLightMode }: { iconName?: string; isLightMode?: boolean }) {
  const colorClass = isLightMode ? "text-cyan-600" : "text-cyan-400";
  if (!iconName || !iconMap[iconName]) {
    return <span className={`mt-1 ${colorClass}`}>▸</span>;
  }
  const Icon = iconMap[iconName];
  return <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${colorClass}`} />;
}

function HeadingIcon({ iconName, isLightMode }: { iconName?: string; isLightMode?: boolean }) {
  if (!iconName || !iconMap[iconName]) return null;
  const Icon = iconMap[iconName];
  const colorClass = isLightMode ? "text-cyan-600" : "text-cyan-400";
  return <Icon className={`w-7 h-7 flex-shrink-0 ${colorClass}`} />;
}

function TypewriterText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setShowCursor(true);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 500);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className="inline-block ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

function TitleSlideContent({ slide, isLightMode }: { slide: TitleSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-8"
    >
      <motion.h1
        className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 pt-2 text-center bg-gradient-to-r bg-clip-text text-transparent ${
          isLightMode
            ? "from-blue-600 via-cyan-500 to-teal-500"
            : "from-blue-400 via-cyan-400 to-teal-400"
        }`}
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] }}
      >
        {slide.title}
      </motion.h1>
      {slide.subtitle && (
        <motion.p
          className={`text-xl md:text-2xl lg:text-3xl max-w-3xl ${isLightMode ? "text-gray-800" : "text-gray-200"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <TypewriterText text={slide.subtitle} delay={0.8} />
        </motion.p>
      )}
    </motion.div>
  );
}

function renderBulletText(text: string, isLightMode?: boolean) {
  // Check if bullet contains a URL pattern
  const urlPattern = /(https?:\/\/[^\s]+|[a-z0-9-]+\.[a-z0-9-]+\.[a-z]{2,}[^\s]*)/gi;
  const match = text.match(urlPattern);

  if (match) {
    const url = match[0];
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    const parts = text.split(url);

    return (
      <>
        {parts[0]}
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={isLightMode ? "text-blue-600 hover:text-blue-500 underline" : "text-blue-400 hover:text-blue-300 underline"}
        >
          {url}
        </a>
        {parts[1]}
      </>
    );
  }

  return text;
}

function StandardSlideContent({ slide, isLightMode }: { slide: StandardSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 max-w-6xl mx-auto w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 ${isLightMode ? "text-gray-900" : "text-white"}`}
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {slide.title}
      </motion.h2>
      <ul className="space-y-4 md:space-y-6">
        {slide.bullets.map((bullet, index) => (
          <motion.li
            key={index}
            className={`flex items-start gap-4 text-lg md:text-2xl lg:text-3xl ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
            variants={itemVariants}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <BulletIcon iconName={bullet.icon} isLightMode={isLightMode} />
            <span>{renderBulletText(bullet.text, isLightMode)}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function CodeSlideContent({ slide, isLightMode }: { slide: CodeSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 ${isLightMode ? "text-gray-900" : "text-white"}`}
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {slide.title}
      </motion.h2>
      {slide.description && (
        <motion.p
          className={`text-lg md:text-xl mb-8 text-center max-w-3xl ${isLightMode ? "text-gray-600" : "text-gray-400"}`}
          variants={itemVariants}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {slide.description}
        </motion.p>
      )}
      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CodeBlock code={slide.code} language={slide.language} isLightMode={isLightMode} />
      </motion.div>
    </motion.div>
  );
}

function SplitSlideContent({ slide, isLightMode }: { slide: SplitSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 w-full max-w-7xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center ${isLightMode ? "text-gray-900" : "text-white"}`}
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {slide.title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
        <motion.div
          className={`rounded-xl p-6 md:p-8 ${isLightMode ? "bg-gray-200/50" : "bg-gray-800/50"}`}
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {slide.left.heading && (
            <h3 className={`flex items-center gap-3 text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${isLightMode ? "text-cyan-600" : "text-cyan-400"}`}>
              <HeadingIcon iconName={slide.left.icon} isLightMode={isLightMode} />
              {slide.left.heading}
            </h3>
          )}
          <ul className="space-y-3 md:space-y-4">
            {slide.left.bullets.map((bullet, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 text-base md:text-xl ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
              >
                <BulletIcon iconName={bullet.icon} isLightMode={isLightMode} />
                <span>{bullet.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className={`rounded-xl p-6 md:p-8 ${isLightMode ? "bg-gray-200/50" : "bg-gray-800/50"}`}
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {slide.right.heading && (
            <h3 className={`flex items-center gap-3 text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${isLightMode ? "text-cyan-600" : "text-cyan-400"}`}>
              <HeadingIcon iconName={slide.right.icon} isLightMode={isLightMode} />
              {slide.right.heading}
            </h3>
          )}
          <ul className="space-y-3 md:space-y-4">
            {slide.right.bullets.map((bullet, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 text-base md:text-xl ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
              >
                <BulletIcon iconName={bullet.icon} isLightMode={isLightMode} />
                <span>{bullet.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

function QuoteSlideContent({ slide, isLightMode }: { slide: QuoteSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 text-center max-w-5xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 ${isLightMode ? "text-gray-900" : "text-white"}`}
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {slide.title}
      </motion.h2>
      <motion.blockquote
        className={`text-xl md:text-3xl lg:text-4xl italic leading-relaxed ${isLightMode ? "text-gray-700" : "text-gray-300"}`}
        variants={itemVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        "{slide.quote}"
      </motion.blockquote>
      {slide.attribution && (
        <motion.cite
          className={`mt-6 md:mt-8 text-lg md:text-xl not-italic ${isLightMode ? "text-gray-500" : "text-gray-500"}`}
          variants={itemVariants}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          — {slide.attribution}
        </motion.cite>
      )}
    </motion.div>
  );
}

function ImageSlideContent({ slide, isLightMode }: { slide: ImageSlide; isLightMode?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 w-full max-w-6xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-center ${isLightMode ? "text-gray-900" : "text-white"}`}
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        {slide.title}
      </motion.h2>
      <motion.div
        className="relative w-full max-h-[60vh] flex items-center justify-center"
        variants={itemVariants}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>
      {slide.caption && (
        <motion.p
          className={`mt-4 md:mt-6 text-lg md:text-xl text-center ${isLightMode ? "text-gray-600" : "text-gray-400"}`}
          variants={itemVariants}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {slide.caption}
        </motion.p>
      )}
      {slide.source && (
        <motion.p
          className={`mt-2 text-sm ${isLightMode ? "text-gray-500" : "text-gray-500"}`}
          variants={itemVariants}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Source: {slide.source}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Slide({ slide, isLightMode }: SlideProps) {
  const renderContent = () => {
    switch (slide.type) {
      case "title":
        return <TitleSlideContent slide={slide} isLightMode={isLightMode} />;
      case "standard":
        return <StandardSlideContent slide={slide} isLightMode={isLightMode} />;
      case "code":
        return <CodeSlideContent slide={slide} isLightMode={isLightMode} />;
      case "split":
        return <SplitSlideContent slide={slide} isLightMode={isLightMode} />;
      case "quote":
        return <QuoteSlideContent slide={slide} isLightMode={isLightMode} />;
      case "image":
        return <ImageSlideContent slide={slide} isLightMode={isLightMode} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={slide.id}
      className="min-h-screen w-full flex items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
    </motion.div>
  );
}
