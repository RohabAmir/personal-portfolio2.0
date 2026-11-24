"use client";

import React from "react";
import Image from "next/image";
import { techStackRows, TechStackItem } from "@/data";
import SketchHighlight from "./ui/SketchHighlight";

const BrandIcon = ({ item }: { item: TechStackItem }) => {
  if (item.tint) {
    const isWhiteTint = item.tint.trim().toLowerCase() === "#ffffff";
    return (
      <span
        aria-hidden="true"
        className="w-6 h-6 shrink-0"
        style={{
          backgroundColor: isWhiteTint ? "var(--tint-contrast)" : item.tint,
          maskImage: `url(${item.img})`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          WebkitMaskImage: `url(${item.img})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }

  return (
    <Image
      src={item.img}
      alt=""
      width={24}
      height={24}
      className="w-6 h-6 object-contain shrink-0"
    />
  );
};

const MarqueeRow = ({
  items,
  direction,
  duration,
}: {
  items: TechStackItem[];
  direction: "left" | "right";
  duration: number;
}) => {
  const doubled = [...items, ...items];

  return (
    <div
      className="tech-marquee-row relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center py-1.5 will-change-transform tech-marquee-track"
        style={{
          animation: `tech-marquee-${direction} ${duration}s linear infinite`,
          backfaceVisibility: "hidden",
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="mx-2 flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04] px-5 py-3"
          >
            <BrandIcon item={item} />
            <span className="text-base font-medium text-slate-800 dark:text-white/90">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-20 sm:py-32">
      <div className="relative overflow-hidden px-4 md:px-10">
        <div className="relative flex flex-col items-center text-center">
          <h1 className="heading dark:text-white text-slate-900">
            Connects to my entire{" "}
            <SketchHighlight>tech stack</SketchHighlight>
          </h1>
          <p className="mt-8 dark:text-white-200 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tools, frameworks, APIs, and platforms I use to design, build, and
            ship production-ready applications.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-20 flex flex-col gap-8 sm:gap-10">
          <MarqueeRow items={techStackRows[0]} direction="left" duration={60} />
          <MarqueeRow
            items={techStackRows[1]}
            direction="right"
            duration={60}
          />
          <MarqueeRow items={techStackRows[2]} direction="left" duration={60} />
        </div>
      </div>

      <style>{`
        .tech-marquee-row:hover .tech-marquee-track { animation-play-state: paused !important; }
        @keyframes tech-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes tech-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
