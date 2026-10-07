"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  easeInOut,
} from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGeneratorEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setMounted(true);
    setVh(window.innerHeight || 800);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  const { scrollY } = useScroll();

  const fadeEnd = Math.max(vh * 0.88, 440);
  const opacity = useTransform(scrollY, [0, fadeEnd], [1, 0], {
    ease: easeInOut,
  });
  const scale = useTransform(scrollY, [0, fadeEnd], [1, 0.95], {
    ease: easeInOut,
  });
  const blurValue = useTransform(scrollY, [0, fadeEnd], [0, 8], {
    ease: easeInOut,
  });
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <section
      id="home"
      className="sticky top-0 z-0 h-[100svh] min-h-[660px] w-full overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale, filter }}
        className="relative h-full w-full"
      >
        <div>
          <div
            className="absolute -top-28 h-[80vh] w-[100vw] pointer-events-none z-[2]"
            style={{ transform: "scaleX(-1)" }}
          >
            <Spotlight
              className="top-0 left-0"
              fill={isDark ? "white" : "purple"}
            />
          </div>
        </div>

        <div className="absolute inset-0 w-full dark:bg-black bg-white dark:bg-grid-white/10 bg-grid-black/[0.08] flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[32vh]"
          style={{
            background:
              "radial-gradient(ellipse 75% 100% at 50% 100%, rgba(124,58,237,0.16) 0%, rgba(88,28,135,0.08) 40%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center justify-center px-5 sm:px-8">
          <div className="w-full max-w-[89vw] md:max-w-3xl lg:max-w-4xl xl:max-w-7xl flex flex-col items-center lg:items-start pt-32 pb-16">
            <div className="mb-7 mt-7 sm:mt-0 sm:mb-10 flex w-full flex-col items-start justify-start gap-2 self-start sm:flex-row sm:flex-wrap">
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300/70 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm px-3 py-1"
                aria-label="Available for work"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#22c55e]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-neutral-300 whitespace-nowrap">
                  Available for work
                </span>
              </span>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] gap-y-4 sm:gap-y-8 lg:gap-x-10 lg:gap-y-7 items-center">
              <div className="order-1 text-left lg:col-start-1 lg:row-start-1 lg:order-none">
                <TextGenerateEffect
                  words="Transforming Concepts into Seamless User Experiences Powered by AI"
                  lines={[
                    "Transforming Concepts",
                    "Into Seamless User",
                    "Experiences.",
                  ]}
                  className="text-left"
                />
              </div>

              <div className="order-2 mt-7 sm:mt-4  flex flex-col items-start text-left lg:col-start-1 lg:row-start-2 lg:order-none">
                <h2 className="text-base sm:text-lg md:text-3xl font-semibold dark:text-white text-slate-800 tracking-tight">
                  Rohab Aamir{" "}
                  <span className="text-slate-400 dark:text-white/40">—</span>{" "}
                  <span className="dark:text-purple text-[#9a5df5]">
                    Software Engineer
                  </span>
                </h2>
                <p className="text-muted-foreground font-[400] font-system-ui text-sm leading-relaxed max-w-[22rem] sm:max-w-md md:max-w-lg mt-4">
                  I help small businesses launch complete digital systems —
                  frontend, backend, deployment, and AI automation, end to end.
                </p>
              </div>

              <div className="relative mt-6 sm:mt-0 order-3 flex items-center justify-center self-center lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:order-none">
                <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-56 lg:w-56 xl:h-72 xl:w-72 overflow-hidden rounded-full border border-black/10 shadow-[0_0_0_30px_rgba(255,255,255,0.06)]">
                  <Image
                    src="/myProfile-hd.webp"
                    alt="Rohab Aamir"
                    width={640}
                    height={640}
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 208px, (max-width: 1280px) 224px, 288px"
                    className="h-full w-full object-cover object-center rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-center">
              <p className="mt-14 text-left text-xl font-medium leading-snug text-slate-900 sm:text-2xl md:text-3xl lg:tracking-wider tracking-normal dark:text-white">
                I build fast, business-ready systems powered by{" "}
                <span className="dark:text-purple text-[#9a5df5]">AI.</span>
                <span
                  className="ml-3 inline-block h-[2rem] w-[3px] translate-y-[0.1em] bg-[#9a5df5] dark:bg-purple animate-blink"
                  aria-hidden
                />
              </p>
              <a href="#projects" className="self-start">
                <MagicButton
                  title="View my work"
                  icon={<FaLocationArrow />}
                  position="right"
                  otherClasses="!mt-5 sm:!mt-6 md:!mt-12 !w-44 sm:!w-48 md:!w-56"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
