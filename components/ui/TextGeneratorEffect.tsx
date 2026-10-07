/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  lines,
}: {
  words: string;
  className?: string;
  /** Optional explicit line breaks for multi-line hero headlines */
  lines?: string[];
}) => {
  const [scope, animate] = useAnimate();
  const linesArray = lines?.length ? lines : [words];

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    let runningIndex = 0;
    return (
      <motion.div ref={scope}>
        {linesArray.map((line, lineIdx) => (
          <div key={`${line}-${lineIdx}`} className="block">
            {line.split(" ").map((word) => {
              const idx = runningIndex++;
              return (
                <motion.span
                  key={`${word}-${idx}`}
                  className={`${
                    idx > 3
                      ? "dark:text-purple text-[#9a5df5]"
                      : "dark:text-white text-slate-800"
                  } opacity-0`}
                >
                  {word}{" "}
                </motion.span>
              );
            })}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="">
        <div className="dark:text-white xl:text-[60px] lg:text-[56px] md:text-[48px] text-[32px] sm:text-[36px] text-black leading-[1.15] lg:tracking-wide tracking-normal">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
