"use client";

import { cn } from "~/lib/utils";
import type { ReactNode } from "react";

type AuroraBackgroundProps = {
  children: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
  isLightMode?: boolean;
};

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  isLightMode = false,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          isLightMode
            ? `
              [--aurora:repeating-linear-gradient(100deg,var(--purple-200)_10%,var(--indigo-200)_15%,var(--pink-200)_20%,var(--purple-200)_25%,var(--blue-200)_30%)]
              [background-image:var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              after:content-[''] after:absolute after:inset-0
              after:[background-image:var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora after:[background-attachment:fixed]
              after:mix-blend-multiply
              opacity-40
            `
            : `
              [--aurora:repeating-linear-gradient(100deg,var(--purple-900)_10%,var(--indigo-800)_15%,var(--pink-900)_20%,var(--purple-800)_25%,var(--blue-900)_30%)]
              [background-image:var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              after:content-[''] after:absolute after:inset-0
              after:[background-image:var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora after:[background-attachment:fixed]
              after:mix-blend-soft-light
              opacity-50
            `,
          showRadialGradient &&
            (isLightMode
              ? "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
              : "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]")
        )}
        style={{
          "--purple-200": "#e9d5ff",
          "--indigo-200": "#c7d2fe",
          "--pink-200": "#fbcfe8",
          "--blue-200": "#bfdbfe",
          "--purple-900": "#581c87",
          "--indigo-800": "#3730a3",
          "--pink-900": "#831843",
          "--purple-800": "#6b21a8",
          "--blue-900": "#1e3a8a",
        } as React.CSSProperties}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
