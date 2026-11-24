"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Lottie from "react-lottie";
import { IoCopyOutline } from "react-icons/io5";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiVuedotjs,
  SiNestjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiPrisma,
  SiGraphql,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import GridGlobe from "./ui/GridGlobe";
import MagicButton from "./ui/MagicButton";
import OrbitingSkillsCompact from "./OrbitingSkillsCompact";
import animationData from "@/data/confetti.json";

const EMAIL = "rohabamir2@gmail.com";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── shared building blocks ─────────────────────────────────────────────── */

type Tone = "surface" | "ink";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Bento card. `surface` follows the theme (white ↔ deep navy);
 * `ink` stays dark in both themes for image-led cards.
 * A soft purple spotlight follows the cursor on hover.
 */
const Card = ({
  children,
  className,
  tone = "surface",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={onMove}
      className={cn(
        "group/card relative isolate overflow-hidden rounded-[22px] border transition-[border-color,box-shadow] duration-300",
        tone === "surface"
          ? "border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(99,65,150,0.22)] hover:border-[#634196]/30 dark:border-white/[0.08] dark:bg-[#0a0c24] dark:shadow-none dark:hover:border-purple/30"
          : "border-white/[0.08] bg-[#06081d] shadow-[0_12px_32px_-16px_rgba(6,8,29,0.6)] hover:border-purple/30",
        className
      )}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.10), transparent 45%)",
        }}
      />
      {children}
    </motion.div>
  );
};

const Eyebrow = ({
  children,
  tone = "surface",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em]",
      tone === "surface"
        ? "text-[#634196] dark:text-purple/90"
        : "text-purple/90"
    )}
  >
    <span
      aria-hidden
      className={cn(
        "h-1.5 w-1.5 rounded-full",
        tone === "surface" ? "bg-[#634196] dark:bg-purple" : "bg-purple"
      )}
    />
    {children}
  </span>
);

const Title = ({
  children,
  tone = "surface",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) => (
  <h3
    className={cn(
      "mt-3 font-sans text-xl font-bold leading-[1.2] tracking-tight sm:text-2xl lg:text-[28px]",
      tone === "surface" ? "text-slate-900 dark:text-white" : "text-white",
      className
    )}
  >
    {children}
  </h3>
);

/* ── 1 · collaboration (image-led) ──────────────────────────────────────── */

const CollaborationCard = () => (
  <Card
    tone="ink"
    className="md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[420px] sm:min-h-[480px] lg:min-h-0"
  >
    <Image
      src="/b1.svg"
      alt=""
      fill
      sizes="(max-width: 1024px) 100vw, 66vw"
      className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
    />
    {/* legibility wash */}
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-t from-[#06081d] via-[#06081d]/55 to-transparent"
    />
    <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
      <Eyebrow tone="ink">How I work</Eyebrow>
      <Title tone="ink" className="max-w-md lg:text-[34px]">
        I prioritize client collaboration, fostering open communication
      </Title>
      <ul className="mt-5 flex flex-wrap gap-2">
        {["Daily progress updates", "Async-friendly", "Clear documentation"].map(
          (t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md"
            >
              {t}
            </li>
          )
        )}
      </ul>
    </div>
  </Card>
);

/* ── 2 · time zones (live clock + globe) ────────────────────────────────── */

const useLahoreTime = () => {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const TimezoneCard = ({ isDark }: { isDark: boolean }) => {
  const time = useLahoreTime();
  return (
    <Card className="h-[300px] lg:col-span-5 lg:h-auto">
      <div className="relative z-10 p-6 sm:p-7">
        <Eyebrow>Remote · Worldwide</Eyebrow>
        <Title className="max-w-[15rem]">
          Flexible with time zone communications
        </Title>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-slate-600 dark:text-white/70">
            Lahore, PK
            <span className="mx-1.5 text-slate-300 dark:text-white/20">|</span>
            <span className="tabular-nums text-slate-900 dark:text-white">
              {time ?? "--:--"}
            </span>{" "}
            GMT+5
          </span>
        </div>
      </div>
      <GridGlobe
        key={isDark ? "globe-dark" : "globe-light"}
        dark={isDark}
        className="pointer-events-none absolute inset-x-0 -bottom-48 flex h-full w-full translate-x-[30%] items-center justify-center"
        fadeClassName="to-white dark:to-[#0a0c24]"
      />
    </Card>
  );
};

/* ── 3 · tech stack (vertical marquee) ──────────────────────────────────── */

type Tech = { name: string; Icon: IconType; color: string };

const COL_A: Tech[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Vue", Icon: SiVuedotjs, color: "#42B883" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
];
const COL_B: Tech[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", Icon: SiPrisma, color: "currentColor" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
];

const MarqueeColumn = ({
  items,
  reverse,
}: {
  items: Tech[];
  reverse?: boolean;
}) => (
  <div className="bento-marquee-col h-full overflow-hidden">
    <div
      className={cn(
        "bento-marquee-track flex flex-col gap-2.5",
        reverse && "bento-marquee-reverse"
      )}
    >
      {[...items, ...items].map(({ name, Icon, color }, i) => (
        <span
          key={`${name}-${i}`}
          aria-hidden={i >= items.length}
          className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12.5px] font-medium text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/85"
        >
          <Icon className="h-4 w-4 shrink-0" style={{ color }} />
          {name}
        </span>
      ))}
    </div>
  </div>
);

const TechStackCard = () => (
  <Card className="h-[300px] lg:col-span-5 lg:h-auto">
    <div className="relative z-10 grid h-full grid-cols-[minmax(0,1fr)_auto] gap-3">
      <div className="flex flex-col justify-center p-6 pr-0 sm:p-7 sm:pr-0">
        <Eyebrow>Toolbox</Eyebrow>
        <Title>My tech stack</Title>
        <p className="mt-2 hidden max-w-[11rem] text-sm sm:block leading-relaxed text-slate-500 dark:text-white/55">
          What I reach for to ship products end to end.
        </p>
      </div>
      <div className="relative flex h-full min-h-0 gap-2.5 pr-4 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] sm:pr-5">
        <MarqueeColumn items={COL_A} />
        <div className="hidden h-full sm:block">
          <MarqueeColumn items={COL_B} reverse />
        </div>
      </div>
    </div>
  </Card>
);

/* ── 4 · interests (orbit) ──────────────────────────────────────────────── */

const InterestsCard = () => (
  <Card className="min-h-[460px] md:row-span-2 lg:col-span-4 lg:min-h-0">
    <div className="relative z-10 p-6 sm:p-7">
      <Eyebrow>Interests</Eyebrow>
      <Title>Technologies I love working with</Title>
    </div>
    {/* soft halo behind the orbit */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[60%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#634196]/10 blur-3xl dark:bg-purple/10"
    />
    <div className="absolute inset-x-0 bottom-0 top-32 flex items-center justify-center overflow-hidden">
      <div className="flex h-[450px] w-[450px] shrink-0 items-center justify-center scale-100 sm:scale-[1.1]">
        <OrbitingSkillsCompact />
      </div>
    </div>
  </Card>
);

/* ── 5 · enthusiast (mini code editor) ──────────────────────────────────── */

const CodeLine = ({ n, children }: { n: number; children?: React.ReactNode }) => (
  <div className="flex">
    <span className="w-6 shrink-0 select-none text-right text-white/20">{n}</span>
    <span className="pl-4">{children}</span>
  </div>
);

const EnthusiastCard = () => (
  <Card className="lg:col-span-8">
    <div className="relative z-10 grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:p-8">
      <div>
        <Eyebrow>Mindset</Eyebrow>
        <Title className="max-w-sm">
          Tech enthusiast with a passion for development.
        </Title>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-[#0b0d22] shadow-[0_16px_40px_-20px_rgba(99,65,150,0.55)] transition-transform duration-500 group-hover/card:-translate-y-1 dark:border-white/[0.08] dark:bg-[#05071a]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-white/40">rohab.ts</span>
        </div>
        <pre className="overflow-x-auto px-2 py-3.5 font-mono text-[12px] leading-[1.75] text-white/80 sm:text-[12.5px]">
          <CodeLine n={1}>
            <span className="text-[#c792ea]">const</span>{" "}
            <span className="text-[#82aaff]">rohab</span>{" "}
            <span className="text-white/50">=</span> {"{"}
          </CodeLine>
          <CodeLine n={2}>
            {"  "}role: <span className="text-[#c3e88d]">&quot;Software Engineer&quot;</span>,
          </CodeLine>
          <CodeLine n={3}>
            {"  "}loves: [<span className="text-[#c3e88d]">&quot;React&quot;</span>,{" "}
            <span className="text-[#c3e88d]">&quot;Node&quot;</span>,{" "}
            <span className="text-[#c3e88d]">&quot;AI&quot;</span>],
          </CodeLine>
          <CodeLine n={4}>
            {"  "}shipping: <span className="text-[#f78c6c]">true</span>,
          </CodeLine>
          <CodeLine n={5}>
            {"}"};
            <span
              aria-hidden
              className="ml-1 inline-block h-[1.05em] w-[7px] translate-y-[0.2em] bg-purple animate-blink"
            />
          </CodeLine>
        </pre>
      </div>
    </div>
  </Card>
);

/* ── 6 · knack (mini app dashboard in a browser window) ─────────────────── */

const BARS = [38, 52, 44, 63, 57, 72, 66, 84, 78, 96];

const Kpi = ({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) => (
  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-white/40">
      {label}
    </p>
    <div className="mt-0.5 flex items-baseline gap-1.5">
      <span className="text-base font-bold tabular-nums text-slate-900 dark:text-white">
        {value}
      </span>
      <span className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
        ↑ {delta}
      </span>
    </div>
  </div>
);

const AppPreview = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* floating performance badge */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
        className="relative z-20 mb-3 flex w-fit items-center gap-1.5 rounded-full sm:absolute sm:-right-2 sm:-top-8 sm:mb-0 border border-emerald-500/30 bg-white px-2.5 py-1 shadow-[0_6px_20px_-6px_rgba(16,185,129,0.45)] dark:bg-[#0a0c24]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="font-mono text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
          Fast · Accessible · SEO-ready
        </span>
      </motion.div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-[0_16px_40px_-22px_rgba(99,65,150,0.5)] transition-transform duration-500 group-hover/card:-translate-y-1 dark:border-white/[0.08] dark:bg-[#05071a]">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-2 dark:border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white px-2.5 py-0.5 text-center font-mono text-[10px] text-slate-400 dark:bg-white/[0.04] dark:text-white/35">
            app.yourbusiness.com/dashboard
          </div>
        </div>

        {/* dashboard */}
        <div className="grid grid-cols-[auto_1fr] gap-3 p-3">
          <div className="flex flex-col gap-2">
            <Kpi label="Revenue" value="$48.2k" delta="24%" />
            <Kpi label="Conversion" value="3.4%" delta="12%" />
          </div>
          <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-white/40">
              Growth
            </p>
            <div className="mt-2 flex min-h-[72px] flex-1 items-end gap-1">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className={cn(
                    "block flex-1 origin-bottom rounded-t-[3px]",
                    i === BARS.length - 1
                      ? "bg-gradient-to-t from-[#634196] to-[#a78bfa] dark:from-purple/70 dark:to-purple"
                      : "bg-[#634196]/20 dark:bg-purple/20"
                  )}
                  style={{ height: `${h}%` }}
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: EASE }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KnackCard = () => (
  <Card className="lg:col-span-8">
    <div className="relative z-10 grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:p-8">
      <div>
        <Eyebrow>Knack for creating</Eyebrow>
        <Title className="max-w-md">
          Intuitive, high-performance web apps that drive business success
        </Title>
      </div>
      <AppPreview />
    </div>
  </Card>
);

/* ── 7 · CTA ────────────────────────────────────────────────────────────── */

const CtaCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
  };

  return (
    <Card tone="ink" className="md:col-span-2 lg:col-span-12 min-h-[220px] lg:min-h-0">
      <BackgroundGradientAnimation containerClassName="rounded-[22px]" />
      <div className="relative z-10 flex h-full flex-col items-start justify-between gap-6 p-7 sm:p-10 lg:flex-row lg:items-center">
        <div>
          <Eyebrow tone="ink">Let&apos;s talk</Eyebrow>
          <Title tone="ink" className="max-w-xl lg:text-4xl">
            Do you want to start a project together?
          </Title>
        </div>
        <div className="relative shrink-0">
          <div className="pointer-events-none absolute -bottom-5 right-0">
            <Lottie
              options={{
                loop: copied,
                autoplay: copied,
                animationData,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
              }}
              height={200}
              width={400}
            />
          </div>
          <MagicButton
            title={copied ? "Email is Copied!" : "Copy my email address"}
            icon={<IoCopyOutline />}
            position="left"
            handleClick={handleCopy}
            otherClasses="!mt-0 dark:!bg-[#161A31] !bg-[#161A31]"
          />
        </div>
      </div>
    </Card>
  );
};

/* ── section ────────────────────────────────────────────────────────────── */

const Grid = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const reduce = useReducedMotion();

  return (
    <section id="about">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-1 mt-0 xl:-mt-5 2xl:-mt-2.5 3xl:-mt-5 pb-16 sm:pb-20">
        {/* glowing frame that rises over the hero */}
        <div
          className="relative rounded-[28px] p-px"
          style={{
            background: "var(--bento-border-gradient)",
            boxShadow: "var(--bento-box-shadow)",
          }}
        >
          <div className="relative overflow-hidden rounded-[27px] bg-[#f7f5fc] dark:bg-[#03041a]">
            {/* top sheen + faint dotted texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#634196]/50 to-transparent dark:via-purple/70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(137,97,197,0.16),transparent)] dark:bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(168,85,247,0.18),transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(99,65,150,0.12)_1px,transparent_1px)] [background-size:22px_22px] dark:[background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
            />

            <motion.div
              className="relative grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[280px] lg:gap-5 lg:p-7"
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <CollaborationCard />
              <TimezoneCard isDark={isDark} />
              <TechStackCard />
              <InterestsCard />
              <EnthusiastCard />
              <KnackCard />
              <CtaCard />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bento-marquee-up { from { transform: translateY(0); } to { transform: translateY(calc(-50% - 5px)); } }
        .bento-marquee-track { animation: bento-marquee-up 22s linear infinite; }
        .bento-marquee-reverse { animation-direction: reverse; animation-duration: 26s; }
        .bento-marquee-col:hover .bento-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .bento-marquee-track { animation: none; } }
      `}</style>
    </section>
  );
};

export default Grid;
