"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "~/lib/utils";

type LetterPullUpProps = {
  words: string;
  className?: string;
  delay?: number;
  isLightMode?: boolean;
};

export function LetterPullUp({
  words,
  className,
  delay = 0,
  isLightMode = false,
}: LetterPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * 0.03,
        duration: 0.3,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    }),
  };

  return (
    <div ref={ref} className="flex flex-wrap">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={i}
          className={cn(
            isLightMode ? "text-gray-700" : "text-gray-300",
            letter === " " ? "w-2" : "",
            className
          )}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
