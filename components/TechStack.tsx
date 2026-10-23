"use client";

import React from "react";
import Image from "next/image";
import { techStackRows, TechStackItem } from "@/data";

const BrandIcon = ({ item }: { item: TechStackItem }) => {
  if (item.tint) {
    const isWhiteTint = item.tint.trim().toLowerCase() === "#ffffff";
    return (
      <span
        aria-hidden="true"
        className="w-6 h-6 md:w-8 md:h-8 shrink-0"
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
      width={28}
      height={28}
      className="w-6 h-6 md:w-8 md:h-8 object-contain shrink-0"
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
      className="group relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center py-2 will-change-transform"
        style={{
          animation: `tech-marquee-${direction} ${duration}s linear infinite`,
          backfaceVisibility: "hidden",
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="mx-2.5 flex items-center gap-3 whitespace-nowrap rounded-lg border dark:border-slate-800 border-[#1b3a54] dark:bg-[rgb(4,7,29)] bg-white px-6 py-3.5 transition-colors duration-300 hover:border-[#b3b0b1] hover:bg-[#F3F4F6] dark:hover:border-[#2b5c85] dark:hover:bg-[#102c47]"
          >
            <BrandIcon item={item} />
            <span className="text-sm md:text-base font-medium text-black dark:text-white">
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
    <section id="tech-stack" className="pb-0 sm:pb-20">
      <div className="relative overflow-hidden px-4 py-16 md:px-10 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "var(--tech-stack-glow)",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <h1 className="heading dark:text-white text-slate-900">
            Connects to my entire{" "}
            <span className="dark:text-purple text-[#634196]">tech stack</span>
          </h1>
          <p className="mt-8 dark:text-white-200 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tools, frameworks, APIs, and platforms I use to design, build, and
            ship production-ready applications.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-20 flex flex-col gap-4">
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
