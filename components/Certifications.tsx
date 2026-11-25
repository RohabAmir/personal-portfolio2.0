"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";
import {
  certifications,
  certificationsAllLink,
  type Certification,
} from "@/data";
import { cn } from "@/utils/cn";
import SketchHighlight from "./ui/SketchHighlight";

/* ── slab palette — warm paper tones on navy, same in both themes ───────── */

const SLABS: Record<Certification["accent"], { bg: string; iconFill: string }> = {
  violet: { bg: "bg-[#fdf6ef]", iconFill: "text-[#e9dccb]" }, // cream
  blue: { bg: "bg-[#f1e0d1]", iconFill: "text-[#e2c4a8]" }, // peach
  magenta: { bg: "bg-[#e4ddf0]", iconFill: "text-[#c9bce4]" }, // soft lilac
  cyan: { bg: "bg-[#a8bbd1]", iconFill: "text-[#c9d6e5]" }, // dusty blue
};

const INK = "text-[#0b1a3a]";

/* ── hand-drawn course icons ────────────────────────────────────────────── */

const gearPath = (() => {
  const teeth = 8;
  const cx = 50,
    cy = 50,
    ro = 40,
    ri = 31;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const step = (Math.PI * 2) / teeth;
    const seq = [
      [ri, a - step * 0.5],
      [ri, a - step * 0.28],
      [ro, a - step * 0.18],
      [ro, a + step * 0.18],
      [ri, a + step * 0.28],
    ];
    for (const [r, t] of seq)
      pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
})();

const CourseIcon = ({
  icon,
  fillClass,
}: {
  icon: Certification["icon"];
  fillClass: string;
}) => {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {icon === "gear" && (
        <>
          <path d={gearPath} className={cn("fill-current", fillClass)} />
          <path d={gearPath} fill="none" {...stroke} />
          <circle cx="50" cy="50" r="17" className="fill-white" {...stroke} />
          <path d="M45 44 L39 50 L45 56 M55 44 L61 50 L55 56" fill="none" {...stroke} strokeWidth={2.6} />
        </>
      )}
      {icon === "window" && (
        <>
          <rect x="12" y="20" width="76" height="60" rx="3" className={cn("fill-current", fillClass)} />
          <rect x="12" y="20" width="76" height="60" rx="3" fill="none" {...stroke} />
          <path d="M12 31 H88 M24 20 V31" fill="none" {...stroke} />
          <path d="M40 46 L32 55 L40 64 M60 46 L68 55 L60 64" fill="none" {...stroke} />
        </>
      )}
      {icon === "mcp" && (
        <>
          <path d="M22 12 H62 L80 30 V88 H22 Z" className={cn("fill-current", fillClass)} />
          <path d="M22 12 H62 L80 30 V88 H22 Z M62 12 V30 H80" fill="none" {...stroke} />
          <path d="M50 52 L30 38 M50 52 L70 42 M50 52 L38 74 M50 52 L66 70 M30 38 L14 34" fill="none" {...stroke} strokeWidth={2.4} />
          <circle cx="50" cy="52" r="7" className="fill-current opacity-60" {...stroke} strokeWidth={2.4} />
          {[
            [30, 38],
            [70, 42],
            [38, 74],
            [66, 70],
            [12, 33],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className="fill-white" {...stroke} strokeWidth={2.4} />
          ))}
        </>
      )}
      {icon === "abacus" && (
        <>
          <rect x="34" y="14" width="56" height="70" rx="2" className={cn("fill-current", fillClass)} />
          {[24, 38, 52, 66].map((y, row) => (
            <g key={y}>
              <path d={`M38 ${y} H86`} fill="none" {...stroke} strokeWidth={2.6} />
              {[0, 1, 2].map((b) => {
                const x = 46 + ((row * 7 + b * 13) % 36);
                return <circle key={b} cx={x} cy={y} r="4" className="fill-white" {...stroke} strokeWidth={2.4} />;
              })}
            </g>
          ))}
          {/* hand reaching in */}
          <path
            d="M10 86 C14 74 16 66 22 60 L32 50 C35 47 39 50 36 54 L30 62 M30 62 L38 56 C41 54 44 57 41 60 L33 68 M33 68 L40 64 C43 62 45 66 42 68 L34 75 C30 79 24 84 20 90"
            fill="none"
            {...stroke}
            strokeWidth={2.8}
          />
        </>
      )}
    </svg>
  );
};

/* ── one slab ───────────────────────────────────────────────────────────── */

const STICKY_TOP = 112; // clears the floating navbar
const PEEK = 10; // thin edge of each folded slab left visible

const Dots = ({ filled, total }: { filled: number; total: number }) => (
  <div className="mt-3 flex gap-1.5" aria-hidden>
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={cn(
          "h-2 w-2 rounded-full border border-[#0b1a3a]",
          i < filled ? "bg-[#0b1a3a]" : "bg-transparent"
        )}
      />
    ))}
  </div>
);

const Slab = ({
  cert,
  index,
  total,
  nextRef,
  selfRef,
}: {
  cert: Certification;
  index: number;
  total: number;
  /** wrapper of the slab that will slide over this one */
  nextRef: React.RefObject<HTMLDivElement> | null;
  selfRef: React.RefObject<HTMLDivElement>;
}) => {
  const reduce = useReducedMotion();
  const palette = SLABS[cert.accent];
  const isLast = index === total - 1;

  // progress = how far the NEXT slab has travelled from the bottom of the
  // viewport to its resting spot on top of this one. framer measures layout
  // offsets (not sticky positions), so this is a long, smooth range.
  const { scrollYProgress } = useScroll({
    target: nextRef ?? selfRef,
    offset: ["start end", `start ${STICKY_TOP + (index + 1) * PEEK}px`],
  });
  const scale = useTransform(scrollYProgress, [0.55, 1], [1, isLast ? 1 : 0.94]);
  const shade = useTransform(scrollYProgress, [0.7, 1], [0, isLast ? 0 : 0.12]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={selfRef}
      className="sticky"
      style={{ top: STICKY_TOP + index * PEEK }}
    >
      <motion.a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.title} — view certificate`}
        style={
          reduce
            ? undefined
            : { scale, transformOrigin: "50% 0%" }
        }
        className={cn(
          "group/slab relative block overflow-hidden rounded-[18px] shadow-[0_-8px_30px_-12px_rgba(3,6,25,0.55),0_1px_0_rgba(255,255,255,0.6)_inset] ring-1 ring-black/[0.06] dark:ring-white/10",
          // purple top rule — brand purple per theme
          "before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[3px] before:bg-[#634196] before:content-[''] dark:before:bg-purple",
          palette.bg,
          INK
        )}
      >
        {/* paper grain + soft top light for a premium print feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(255,255,255,0.55),transparent_55%)]"
        />
        {/* folded slabs settle slightly into shadow */}
        {!reduce && !isLast && (
          <motion.div
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#0b1a3a]"
          />
        )}

        <div data-slab-content className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)_auto] md:gap-10 lg:px-11 lg:py-10">
          {/* left: identity */}
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4 md:block">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#0b1a3a]/55">
                  Certificate
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/70 shadow-[0_1px_2px_rgba(11,26,58,0.08)] ring-1 ring-[#D97757]/25 sm:h-10 sm:w-10">
                    <Image
                      src="/claude.svg"
                      alt="Claude"
                      width={22}
                      height={22}
                      className="h-[20px] w-[20px] transition-transform duration-700 ease-out group-hover/slab:rotate-[60deg] sm:h-[22px] sm:w-[22px]"
                    />
                  </span>
                  <h3 className="text-[22px] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[26px]">
                    {cert.title}
                  </h3>
                </div>
              </div>
              {/* icon sits beside the title on mobile */}
              <div className="h-16 w-16 shrink-0 md:hidden">
                <CourseIcon icon={cert.icon} fillClass={palette.iconFill} />
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-2.5">
              <span className="text-[34px] font-light leading-none tracking-tight text-[#634196]">
                {num}
              </span>
              <span className="text-[13px] text-[#0b1a3a]/60">
                of {String(total).padStart(2, "0")} · Anthropic Academy
              </span>
            </div>
            <Dots filled={index + 1} total={total} />
          </div>

          {/* middle: description + link */}
          <div className="min-w-0 md:pt-6">
            <p className="text-[15px] leading-[1.75] text-[#0b1a3a]/75">
              {cert.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#634196]">
              View certificate
              <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/slab:-translate-y-0.5 group-hover/slab:translate-x-0.5" />
            </span>
          </div>

          {/* right: badge + icon (desktop) */}
          <div className="hidden flex-col items-end justify-between gap-6 md:flex">
            <CertifiedBadge />
            <div className="h-24 w-24 transition-transform duration-500 group-hover/slab:-rotate-3 group-hover/slab:scale-105 lg:h-28 lg:w-28">
              <CourseIcon icon={cert.icon} fillClass={palette.iconFill} />
            </div>
          </div>
          <div className="md:hidden">
            <CertifiedBadge />
          </div>
        </div>
      </motion.a>
    </div>
  );
};

const CertifiedBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0b1a3a]/80 bg-white/40 py-1 pl-1.5 pr-3 text-xs font-medium text-[#0b1a3a]">
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0b1a3a] text-white">
      <HiCheck className="h-2.5 w-2.5" strokeWidth={1.5} />
    </span>
    Certified
  </span>
);

/* ── section ────────────────────────────────────────────────────────────── */

const Certifications = () => {
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const refs = [r0, r1, r2, r3];
  const shown = certifications.slice(0, refs.length);

  // Equalise slab heights: sticky slabs are released by their own bottom
  // edge, so uneven heights would make taller ones poke out of the stack.
  // Measure each slab's *content* (unaffected by the min-height we set) and
  // write min-height straight to the DOM. Re-measures on any content size
  // change (fonts loading, rotation, mobile URL-bar resizes).
  useEffect(() => {
    const slabs = () =>
      refs
        .map((r) => r.current?.firstElementChild as HTMLElement | null)
        .filter(Boolean) as HTMLElement[];
    const contents = () =>
      slabs()
        .map((el) => el.querySelector<HTMLElement>("[data-slab-content]"))
        .filter(Boolean) as HTMLElement[];

    const measure = () => {
      const max = Math.max(...contents().map((el) => el.offsetHeight));
      if (!Number.isFinite(max) || max <= 0) return;
      slabs().forEach((el) => (el.style.minHeight = `${max}px`));
    };

    measure();
    const ro = new ResizeObserver(measure);
    contents().forEach((el) => ro.observe(el));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="certifications" className="py-20 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="heading !text-left dark:text-white text-black">
            Certified by <SketchHighlight>Anthropic</SketchHighlight>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-white-200">
            Formal training in agentic coding and building production apps on
            Claude — AI Certifications.
          </p>
        </div>
        <a
          href={certificationsAllLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 self-start border-b border-slate-400/60 pb-1 text-sm font-medium text-slate-700 transition-colors hover:border-[#634196] hover:text-[#634196] sm:self-auto dark:border-white/30 dark:text-white/80 dark:hover:border-purple dark:hover:text-purple"
        >
          View all
          <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-5xl flex-col gap-7 sm:mt-24 sm:gap-8">
        {shown.map((cert, i) => (
          <Slab
            key={cert.id}
            cert={cert}
            index={i}
            total={shown.length}
            selfRef={refs[i]}
            nextRef={refs[i + 1] ?? null}
          />
        ))}
      </div>
    </section>
  );
};

export default Certifications;
