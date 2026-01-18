"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type ParticlesProps = {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  isLightMode?: boolean;
};

type ParticleShape = "circle" | "star" | "diamond" | "triangle" | "plus" | "ring";

type Particle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
  shape: ParticleShape;
  rotation: number;
  rotationSpeed: number;
};

type MousePosition = {
  x: number;
  y: number;
};

export function Particles({
  className = "",
  quantity = 25,
  staticity = 50,
  ease = 50,
  refresh = false,
  isLightMode = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    const animationId = animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted, isLightMode]);

  useEffect(() => {
    if (!mounted) return;

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    initCanvas();
  }, [refresh, mounted]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      particles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const createParticle = (): Particle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    // Varied sizes: mostly small with occasional larger ones
    const sizeRandom = Math.random();
    const size = sizeRandom > 0.95 ? 3 + Math.random() * 2 : sizeRandom > 0.8 ? 2 + Math.random() : 0.5 + Math.random() * 1.5;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(2));
    // Slower, more elegant movement
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 2;
    // Color hue for subtle variation (purple to cyan range)
    const hue = isLightMode ? 260 + Math.random() * 60 : 200 + Math.random() * 80;
    // Pulse effect
    const pulse = Math.random() * Math.PI * 2;
    const pulseSpeed = 0.01 + Math.random() * 0.02;
    // Random shape
    const shapes: ParticleShape[] = ["circle", "circle", "star", "diamond", "triangle", "plus", "ring"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    // Rotation
    const rotation = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() - 0.5) * 0.02;

    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
      hue,
      pulse,
      pulseSpeed,
      shape,
      rotation,
      rotationSpeed,
    };
  };

  const drawShape = (ctx: CanvasRenderingContext2D, shape: ParticleShape, x: number, y: number, size: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    switch (shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case "star":
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const innerAngle = outerAngle + Math.PI / 5;
          const outerX = Math.cos(outerAngle) * size;
          const outerY = Math.sin(outerAngle) * size;
          const innerX = Math.cos(innerAngle) * size * 0.4;
          const innerY = Math.sin(innerAngle) * size * 0.4;
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case "diamond":
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case "triangle":
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        break;

      case "plus":
        const thickness = size * 0.35;
        ctx.beginPath();
        ctx.rect(-thickness, -size, thickness * 2, size * 2);
        ctx.rect(-size, -thickness, size * 2, thickness * 2);
        ctx.fill();
        break;

      case "ring":
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.arc(0, 0, size * 0.5, 0, 2 * Math.PI, true);
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  const drawParticle = (particle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, hue, pulse, shape, rotation } = particle;
      const ctx = context.current;

      ctx.save();
      ctx.translate(translateX, translateY);

      // Pulsing size effect
      const pulseSize = size + Math.sin(pulse) * size * 0.2;
      const pulseAlpha = alpha * (0.8 + Math.sin(pulse) * 0.2);

      // Draw glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 3);
      if (isLightMode) {
        gradient.addColorStop(0, `hsla(${hue}, 60%, 50%, ${pulseAlpha * 0.3})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${pulseAlpha * 0.1})`);
        gradient.addColorStop(1, `hsla(${hue}, 60%, 50%, 0)`);
      } else {
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${pulseAlpha * 0.4})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 70%, ${pulseAlpha * 0.15})`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 70%, 0)`);
      }

      ctx.beginPath();
      ctx.arc(x, y, pulseSize * 3, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw core shape
      ctx.fillStyle = isLightMode
        ? `hsla(${hue}, 50%, 40%, ${pulseAlpha})`
        : `hsla(${hue}, 70%, 80%, ${pulseAlpha})`;
      drawShape(ctx, shape, x, y, pulseSize, rotation);

      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        particles.current.push(particle);
      }
    }
  };

  const drawConnections = () => {
    if (!context.current) return;
    const ctx = context.current;
    const connectionDistance = 120;

    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];
        const dx = (p1.x + p1.translateX) - (p2.x + p2.translateX);
        const dy = (p1.y + p1.translateY) - (p2.y + p2.translateY);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15 * Math.min(p1.alpha, p2.alpha);
          ctx.beginPath();
          ctx.moveTo(p1.x + p1.translateX, p1.y + p1.translateY);
          ctx.lineTo(p2.x + p2.translateX, p2.y + p2.translateY);
          ctx.strokeStyle = isLightMode
            ? `rgba(120, 80, 200, ${opacity})`
            : `rgba(200, 200, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const particle = createParticle();
      drawParticle(particle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = (): number => {
    clearContext();

    // Draw connections first (behind particles)
    drawConnections();

    particles.current.forEach((particle, i) => {
      const edge = [
        particle.x + particle.translateX - particle.size,
        canvasSize.current.w - particle.x - particle.translateX - particle.size,
        particle.y + particle.translateY - particle.size,
        canvasSize.current.h - particle.y - particle.translateY - particle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        particle.alpha += 0.01;
        if (particle.alpha > particle.targetAlpha) {
          particle.alpha = particle.targetAlpha;
        }
      } else {
        particle.alpha = particle.targetAlpha * remapClosestEdge;
      }

      // Update position
      particle.x += particle.dx;
      particle.y += particle.dy;

      // Update pulse
      particle.pulse += particle.pulseSpeed;

      // Update rotation
      particle.rotation += particle.rotationSpeed;

      // Mouse interaction
      particle.translateX +=
        (mouse.current.x / (staticity / particle.magnetism) - particle.translateX) /
        ease;
      particle.translateY +=
        (mouse.current.y / (staticity / particle.magnetism) - particle.translateY) /
        ease;

      if (
        particle.x < -particle.size ||
        particle.x > canvasSize.current.w + particle.size ||
        particle.y < -particle.size ||
        particle.y > canvasSize.current.h + particle.size
      ) {
        particles.current.splice(i, 1);
        const newParticle = createParticle();
        drawParticle(newParticle);
      } else {
        drawParticle(particle, true);
      }
    });
    return window.requestAnimationFrame(animate);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={canvasContainerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
