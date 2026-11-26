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
  useReducedMotion,
} from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGeneratorEffect";
import MagicButton from "./ui/MagicButton";
import AnimatedButton from "./ui/AnimatedButton";
import { FaLocationArrow } from "react-icons/fa";
import SketchHighlight from "./ui/SketchHighlight";

/* ── Hero load timeline (seconds) ─────────────────────────────────────────
 * 1. headline words blur in one by one
 * 2. "Rohab Aamir — Software Engineer" blurs in, underline draws
 * 3. everything else (badge, avatar, copy, CTAs) fades up
 * ───────────────────────────────────────────────────────────────────────── */
const HEADLINE_START = 0.1;
const NAME_START = 0.8;
const NAME_STAGGER = 0.07;
const REST_START = 1.25;
const EASE = [0.22, 1, 0.36, 1] as const;

const BlurWord = ({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setMounted(true);
    setVh(window.innerHeight || 800);
  }, []);

  const isDark = mounted ? theme === "dark" : true;
  const reduce = useReducedMotion();

  /** fade + lift + un-blur, used for everything after the headline */
  const appear = (step: number, extra?: { scale?: number }) =>
    reduce
      ? {}
      : {
          initial: {
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
            ...(extra?.scale ? { scale: extra.scale } : {}),
          },
          animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
          transition: {
            duration: 0.6,
            delay: REST_START + step * 0.1,
            ease: EASE,
          },
        };

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
      className="sticky top-0 z-0 h-[100svh] min-h-[600px] sm:min-h-[660px] w-full overflow-hidden bg-[#F3F3F3] dark:bg-black-100"
    >
      <motion.div
        style={{ opacity, scale, filter }}
        className="relative h-full w-full"
      >
        <div
          className="absolute  h-[60vh] w-[100vw] pointer-events-none z-[2] hidden lg:block"
          style={{ transform: "scaleX(-1)" }}
        >
          <Spotlight
            className="top-0 left-0"
            fill={isDark ? "white" : "white"}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[#F3F3F3] dark:bg-black [background-size:75px_75px] [background-image:linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#F3F3F3] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[32vh]"
          style={{
            background:
              "radial-gradient(ellipse 75% 100% at 50% 100%, rgba(124,58,237,0.16) 0%, rgba(88,28,135,0.08) 40%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center justify-center px-5 sm:px-0">
          <div className="w-full max-w-[89vw] md:max-w-3xl lg:max-w-4xl xl:max-w-7xl flex flex-col items-center lg:items-start pt-24 sm:pt-32 2xl:pt-40 3xl:pt-28 pb-8 sm:pb-16">
            <motion.div
              {...appear(0)}
              className="mb-4 sm:mb-10 flex w-full flex-col items-start justify-start gap-2 self-start sm:flex-row sm:flex-wrap"
            >
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#c6c3c4] dark:border-white/20 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm px-3 py-1"
                aria-label="Available for work"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full dark:bg-purple bg-[#634196]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full dark:bg-purple bg-[#634196] shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-neutral-300 whitespace-nowrap">
                  Available for work
                </span>
              </span>
            </motion.div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] gap-y-3 sm:gap-y-8 lg:gap-x-10 lg:gap-y-7 items-center">
              <div className="order-1 text-left lg:col-start-1 lg:row-start-1 lg:order-none">
                <TextGenerateEffect
                  words="Transforming Concepts into Seamless User Experiences Powered by AI"
                  lines={[
                    "Transforming Concepts",
                    "Into Seamless User",
                    "Experiences.",
                  ]}
                  className="text-left"
                  delay={HEADLINE_START}
                  stagger={0.1}
                  wordDuration={0.55}
                  sketchLastWord
                />
              </div>

              <div className="order-2 mt-1 sm:mt-4 flex flex-col items-start text-left lg:col-start-1 lg:row-start-2 lg:order-none">
                <h2 className="text-base sm:text-lg md:text-3xl font-semibold dark:text-white text-black tracking-tight">
                  <BlurWord delay={NAME_START}>Rohab</BlurWord>{" "}
                  <BlurWord delay={NAME_START + NAME_STAGGER}>Aamir</BlurWord>{" "}
                  <BlurWord
                    delay={NAME_START + NAME_STAGGER * 2}
                    className="text-slate-400 dark:text-white/40"
                  >
                    —
                  </BlurWord>{" "}
                  <SketchHighlight
                    delay={reduce ? 0 : NAME_START + NAME_STAGGER * 4 + 0.3}
                  >
                    <BlurWord delay={NAME_START + NAME_STAGGER * 3}>
                      Software
                    </BlurWord>{" "}
                    <BlurWord delay={NAME_START + NAME_STAGGER * 4}>
                      Engineer
                    </BlurWord>
                  </SketchHighlight>
                </h2>
                <motion.p
                  {...appear(1)}
                  className="text-muted-foreground font-[400] font-system-ui text-sm leading-relaxed max-w-[22rem] sm:max-w-md md:max-w-lg mt-2 sm:mt-4">
                  I help small businesses launch complete digital systems —
                  frontend, backend, deployment, and AI automation, end to end.
                </motion.p>
              </div>

              <div className="relative mt-1 sm:mt-0 order-3 flex items-center justify-center self-center lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:order-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-[24vh] left-1/2 -z-10 h-[80vh] w-[100vw] lg:hidden"
                  style={{ transform: "translateX(-50%) scaleX(-1)" }}
                >
                  <Spotlight
                    className="top-0 left-0"
                    fill={isDark ? "white" : "white"}
                  />
                </div>
                <motion.div {...appear(0, { scale: 0.92 })} className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-6 rounded-full bg-[#634196]/15 blur-2xl dark:bg-[#8b5cf6]/20"
                  />

                  {/* slow dashed orbit */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-[#634196]/30 motion-safe:animate-[spin_40s_linear_infinite] dark:border-purple/25"
                  />

                  <div className="relative h-32 w-32 xs:h-36 xs:w-36 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-56 lg:w-56 xl:h-72 xl:w-72 overflow-hidden rounded-full shadow-[0_30px_70px_-22px_rgba(99,65,150,0.6),0_8px_20px_-10px_rgba(99,65,150,0.35)] dark:shadow-[0_30px_70px_-24px_rgba(139,92,246,0.35),0_8px_20px_-12px_rgba(203,172,249,0.15)]">
                    {/* slowly turning gradient ring */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#634196,#b89be0,#f3ecfc,#8b65c7,#634196)] motion-safe:animate-[spin_10s_linear_infinite] dark:hidden"
                    />
                    <div className="absolute inset-[4px] overflow-hidden rounded-full ring-[3px] ring-white dark:ring-white/20">
                    <Image
                      src="/myProfile-light.webp"
                      alt="Rohab Aamir"
                      width={640}
                      height={640}
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 208px, (max-width: 1280px) 224px, 288px"
                      className="h-full w-full object-cover object-center rounded-full dark:hidden"
                    />
                    {/* theme tint + top gloss so the grey backdrop blends in */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-[#634196]/30 via-[#b89be0]/10 to-white/10 mix-blend-soft-light dark:from-[#393BB2]/40 dark:via-[#CBACF9]/10 dark:to-transparent"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.28),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.12),transparent_45%)]"
                    />
                    <Image
                      src="/myProfile-hd.webp"
                      alt="Rohab Aamir"
                      width={640}
                      height={640}
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 208px, (max-width: 1280px) 224px, 288px"
                      className="hidden h-full w-full object-cover object-center rounded-full dark:block"
                    />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-center">
              <motion.p
                {...appear(2)}
                className="mt-5 sm:mt-14 text-left text-xl font-medium leading-snug text-black sm:text-2xl md:text-3xl lg:tracking-wider tracking-normal dark:text-white">
                I build fast, business-ready systems powered by{" "}
                <span className="dark:text-purple text-[#634196]">AI.</span>
                <span
                  className="ml-3 inline-block h-[1.5rem] sm:h-[2rem] w-[3px] translate-y-[0.1em] bg-[#634196] dark:bg-purple animate-blink"
                  aria-hidden
                />
              </motion.p>
              <motion.div
                {...appear(3)}
                className="mt-4 sm:mt-6 md:mt-12 grid w-full grid-cols-1 gap-3 min-[361px]:grid-cols-2 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a href="#projects" className="block w-full sm:w-auto">
                  <MagicButton
                    title="View my work"
                    icon={<FaLocationArrow />}
                    position="right"
                    otherClasses="!mt-0 !w-full sm:!w-44 md:!w-52"
                  />
                </a>
                <AnimatedButton
                  title="Start a project"
                  href="#contact"
                  variant="outline"
                  showArrow={false}
                  className="!w-full sm:!w-44 md:!w-52"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
