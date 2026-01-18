"use client";

import { useRef, type ReactNode, type ComponentProps } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "~/lib/utils";

type MovingBorderButtonProps = ComponentProps<"button"> & {
  borderRadius?: string;
  children: ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
};

export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...props
}: MovingBorderButtonProps) {
  return (
    <button
      className={cn(
        "relative h-12 w-12 overflow-hidden bg-transparent p-[1px]",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(var(--purple-500)_40%,transparent_60%)] opacity-80",
              borderClassName
            )}
            style={{
              "--purple-500": "#a855f7",
            } as React.CSSProperties}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800/50 backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </button>
  );
}

type MovingBorderProps = {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
};

function MovingBorder({
  children,
  duration = 2000,
  rx,
  ry,
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
