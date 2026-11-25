"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

/*
 * Vortex background — Aceternity UI.
 * Particle maths, timings and glow are the original. Project changes:
 *  - the canvas is sized to its container (not the window), so the swirl is
 *    never cropped at the edges of a section that is taller/narrower than
 *    the viewport;
 *  - the canvas is transparent (background comes from CSS) so the additive
 *    glow only brightens particles, never the backdrop colour;
 *  - `variant="light"` uses normal blending, because additive ("lighter")
 *    glow washes out to white on a light page;
 *  - colours are read from refs, so a theme switch restyles the running
 *    animation without restarting it;
 *  - the loop pauses while off-screen and freezes for reduced motion.
 */

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** classes for the particle layer only (e.g. an edge-fade mask) */
  canvasClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  rangeHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  variant?: "dark" | "light";
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  // live-updatable look (theme can change while the loop runs)
  const look = useRef({
    variant: props.variant || "dark",
    baseHue: props.baseHue || 220,
    rangeHue: props.rangeHue || 100,
  });
  look.current.variant = props.variant || "dark";
  look.current.baseHue = props.baseHue || 220;
  look.current.rangeHue = props.rangeHue || 100;

  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;

    let tick = 0;
    const noise3D = createNoise3D();
    let particleProps = new Float32Array(particlePropsLength);
    const center: [number, number] = [0, 0];

    const TAU = 2 * Math.PI;
    const rand = (n: number) => n * Math.random();
    const randRange = (n: number) => n - rand(2 * n);
    const fadeInOut = (t: number, m: number) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };
    const lerp = (n1: number, n2: number, speed: number) =>
      (1 - speed) * n1 + speed * n2;

    const initParticle = (i: number) => {
      const x = rand(canvas.width);
      const y = center[1] + randRange(rangeY);
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      // store hue as an offset so a theme switch can shift the palette
      const hueOffset = rand(1);
      particleProps.set([x, y, 0, 0, 0, ttl, speed, radius, hueOffset], i);
    };

    const initParticles = () => {
      tick = 0;
      particleProps = new Float32Array(particlePropsLength);
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    };

    const checkBounds = (x: number, y: number) =>
      x > canvas.width || x < 0 || y > canvas.height || y < 0;

    const drawParticle = (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) => {
      const light = look.current.variant === "light";
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = light
        ? `hsla(${hue},48%,44%,${fadeInOut(life, ttl)})`
        : `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    const updateParticle = (i: number) => {
      const x = particleProps[i];
      const y = particleProps[i + 1];
      const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
      const vx = lerp(particleProps[i + 2], Math.cos(n), 0.5);
      const vy = lerp(particleProps[i + 3], Math.sin(n), 0.5);
      let life = particleProps[i + 4];
      const ttl = particleProps[i + 5];
      const speed = particleProps[i + 6];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps[i + 7];
      const hue =
        look.current.baseHue + particleProps[i + 8] * look.current.rangeHue;

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      life++;
      particleProps[i] = x2;
      particleProps[i + 1] = y2;
      particleProps[i + 2] = vx;
      particleProps[i + 3] = vy;
      particleProps[i + 4] = life;

      (checkBounds(x, y) || life > ttl) && initParticle(i);
    };

    const renderGlow = () => {
      const light = look.current.variant === "light";
      ctx.save();
      if (light) ctx.globalAlpha = 0.35;
      ctx.filter = light ? "blur(8px)" : "blur(8px) brightness(200%)";
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      ctx.save();
      if (light) ctx.globalAlpha = 0.5;
      ctx.filter = light ? "blur(4px)" : "blur(4px) brightness(200%)";
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    };

    const renderToScreen = () => {
      const light = look.current.variant === "light";
      ctx.save();
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    };

    const frame = () => {
      tick++;
      // transparent canvas: the additive glow passes below would otherwise
      // keep brightening any non-black fill (e.g. navy turns bright blue).
      // The section's own CSS background shows through instead.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
      renderGlow();
      renderToScreen();
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let running = false;
    const loop = () => {
      frame();
      animationFrameId.current = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };

    // reduced motion: settle the particles into trails, then hold one frame
    const paintStill = () => {
      for (let k = 0; k < 120; k++) frame();
    };

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      center[0] = 0.5 * canvas.width;
      center[1] = 0.5 * canvas.height;
    };

    resize();
    initParticles();
    if (reduceMotion) paintStill();

    const ro = new ResizeObserver(() => {
      resize();
      initParticles();
      if (reduceMotion) paintStill();
    });
    ro.observe(container);

    // only animate while the section is on screen
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "100px" }
    );
    io.observe(container);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn("relative h-full w-full", props.containerClassName)}
      style={props.backgroundColor ? { backgroundColor: props.backgroundColor } : undefined}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className={cn(
          "absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent",
          props.canvasClassName
        )}
      >
        <canvas ref={canvasRef} className="block h-full w-full"></canvas>
      </motion.div>

      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};
