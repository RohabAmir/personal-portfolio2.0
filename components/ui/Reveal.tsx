"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** vertical offset (px) the section rises from */
  y?: number;
};

/**
 * Fades + un-blurs + lifts a section into place the first time it scrolls
 * into view. Clears transform/filter afterwards so sticky/fixed children
 * inside the section keep working normally.
 */
const Reveal = ({ children, className, delay = 0, y = 48 }: RevealProps) => {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transitionEnd: { filter: "none", transform: "none" },
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
