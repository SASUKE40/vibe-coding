"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

type TypewriterEffectProps = {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  isLightMode?: boolean;
};

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  isLightMode = false,
}: TypewriterEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.1,
          delay: stagger(0.05),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    "hidden opacity-0",
                    isLightMode ? "text-gray-700" : "text-gray-300",
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "text-xl md:text-3xl lg:text-4xl italic leading-relaxed",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-8 md:h-10 lg:h-12",
          isLightMode ? "bg-purple-600" : "bg-purple-400",
          cursorClassName
        )}
      />
    </div>
  );
}
