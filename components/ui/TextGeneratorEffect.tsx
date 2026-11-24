"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";
import SketchHighlight from "./SketchHighlight";

const EASE = [0.22, 1, 0.36, 1] as const;

export const TextGenerateEffect = ({
  words,
  className,
  lines,
  delay = 0.15,
  stagger = 0.15,
  wordDuration = 0.7,
  sketchLastWord = false,
}: {
  words: string;
  className?: string;
  /** Optional explicit line breaks for multi-line hero headlines */
  lines?: string[];
  /** seconds before the first word appears */
  delay?: number;
  /** seconds between consecutive words */
  stagger?: number;
  wordDuration?: number;
  /** draw the sketch underline beneath the final word */
  sketchLastWord?: boolean;
}) => {
  const reduce = useReducedMotion();
  const linesArray = lines?.length ? lines : [words];
  const totalWords = linesArray.join(" ").split(" ").length;

  let runningIndex = 0;

  return (
    <div className={cn("font-bold", className)}>
      <div className="dark:text-white xl:text-[68px] lg:text-[56px] md:text-[48px] sm:text-[36px] xs:text-[30px] text-[28px] text-black leading-[1.15] lg:tracking-wide tracking-normal">
        {linesArray.map((line, lineIdx) => (
          <div key={`${line}-${lineIdx}`} className="block">
            {line.split(" ").map((word) => {
              const idx = runningIndex++;
              const isPurple = idx > 3;
              const isLast = idx === totalWords - 1;
              const wordDelay = delay + idx * stagger;

              const content =
                sketchLastWord && isLast ? (
                  <SketchHighlight delay={reduce ? 0 : wordDelay + wordDuration * 0.6}>
                    {word}
                  </SketchHighlight>
                ) : (
                  word
                );

              return (
                <React.Fragment key={`${word}-${idx}`}>
                  <motion.span
                    className={`inline-block ${
                      isPurple
                        ? "dark:text-purple text-[#634196]"
                        : "dark:text-white text-black"
                    }`}
                    initial={
                      reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: wordDuration,
                      delay: wordDelay,
                      ease: EASE,
                    }}
                  >
                    {content}
                  </motion.span>{" "}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
