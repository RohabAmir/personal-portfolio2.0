"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

type SketchHighlightProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds before the underline starts drawing once in view */
  delay?: number;
  /** seconds the stroke takes to draw */
  duration?: number;
};

/**
 * Purple highlighted word(s) with a hand-drawn underline that sweeps in
 * left → right the first time it scrolls into view. Works in both themes.
 *
 * The draw is done with a clip-path wipe (not stroke-dasharray), so the
 * stroke stays continuous at any width — dash maths breaks when the SVG is
 * stretched with preserveAspectRatio="none".
 */
export const SketchHighlight = ({
  children,
  className,
  delay = 0.3,
  duration = 0.8,
}: SketchHighlightProps) => {
  const reduce = useReducedMotion();

  return (
    // The in-view trigger lives on the (unclipped) wrapper: Chrome treats a
    // fully clip-path'd element as not intersecting, so it would never fire.
    <motion.span
      className={cn(
        "relative inline-block whitespace-nowrap dark:text-purple text-[#634196]",
        className
      )}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-[3%] -right-[3%] -bottom-[0.16em] block h-[0.28em] text-[#9d4edd] dark:text-[#c084fc]"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: {
            clipPath: "inset(0 0% 0 0)",
            transition: { delay, duration, ease: [0.65, 0, 0.35, 1] },
          },
        }}
      >
        <svg
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full overflow-visible"
        >
          {/* main stroke — full width */}
          <path
            d="M2 9.5C46 5.2 118 4 160 4.8C176 5.1 188 5.8 198 6.8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* lighter return stroke for the hand-drawn feel */}
          <path
            d="M8 13.4C58 10.4 132 9.4 192 10.6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeOpacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.span>
    </motion.span>
  );
};

export default SketchHighlight;
