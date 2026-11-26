"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  LuBrainCircuit,
  LuWorkflow,
  LuChartLine,
  LuDatabase,
  LuBot,
  LuWebhook,
  LuShieldCheck,
  LuPlug,
  LuSparkles,
} from "react-icons/lu";
import SketchHighlight from "./ui/SketchHighlight";

/* ── content ────────────────────────────────────────────────────────────── */

const pillars = [
  {
    title: "Model-agnostic",
    body: "Claude, GPT, Gemini or open-source models — picked per task.",
  },
  {
    title: "Agent-assisted delivery",
    body: "Claude Code, MCP servers and custom agents in the build loop.",
  },
  {
    title: "Built for production",
    body: "Evals, guardrails and monitoring from day one.",
  },
];

const orbitTools: { label: string; Icon: IconType }[] = [
  { label: "LLMs", Icon: LuBrainCircuit },
  { label: "Evals", Icon: LuChartLine },
  { label: "RAG", Icon: LuDatabase },
  { label: "Agentic AI", Icon: LuBot },
  { label: "APIs", Icon: LuWebhook },
  { label: "Guardrails", Icon: LuShieldCheck },
  { label: "MCP", Icon: LuPlug },
  { label: "Automations", Icon: LuWorkflow },
];

const PARTNER_NETWORK_URL =
  "https://www.anthropic.com/news/claude-partner-network";

/* ── right-hand orbit ───────────────────────────────────────────────────── */

const ORBIT_SECONDS = 48;

const Orbit = () => {
  const step = 360 / orbitTools.length;

  return (
    <div className="ai-orbit group relative ml-auto mr-auto  lg:ml-auto lg:mr-0 aspect-square w-full max-w-[300px] xs:max-w-[360px] sm:max-w-[480px]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-[#634196]/15 blur-3xl dark:bg-[#8b5cf6]/25" />

      {/* inner dotted ring — slow counter-spin */}
      <svg
        viewBox="0 0 100 100"
        className="ai-spin-rev absolute inset-[22%] h-[56%] w-[56%] overflow-visible"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          className="stroke-[#634196]/25 dark:stroke-purple/25"
          strokeWidth="0.6"
          strokeDasharray="0.5 3"
          strokeLinecap="round"
        />
      </svg>

      {/* main ring + tool pills — all rotate together */}
      <div className="ai-spin absolute inset-[9%]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          {/* dashed track */}
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="none"
            className="stroke-slate-400/70 dark:stroke-white-100/30"
            strokeWidth="0.35"
            strokeDasharray="0.8 1.2"
          />
        </svg>

        {orbitTools.map(({ label, Icon }, i) => {
          const angle = ((-90 + i * step) * Math.PI) / 180;
          const left = 50 + 50 * Math.cos(angle);
          const top = 50 + 50 * Math.sin(angle);
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* counter-rotate so labels stay upright */}
              <div className="ai-spin-rev">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200/90 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#0b1a3a] shadow-[0_4px_18px_-6px_rgba(99,65,150,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-110 sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-sm dark:border-white/10 dark:bg-[#0b0e2a]/85 dark:text-white dark:shadow-[0_4px_22px_-6px_rgba(203,172,249,0.35)]">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#634196] sm:h-4 sm:w-4 dark:text-purple" />
                  {label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* centre disc */}
      <div className="absolute inset-[27%] flex flex-col items-center justify-center rounded-full border border-[#634196]/20 bg-gradient-to-br from-[#f3e8f4] via-[#ede4f6] to-[#e7dcf3] text-center shadow-[inset_0_0_40px_rgba(99,65,150,0.12)] dark:border-purple/20 dark:from-[#1a0f33] dark:via-[#140b2b] dark:to-[#0b0720] dark:shadow-[inset_0_0_50px_rgba(203,172,249,0.15)]">
        <span className="ai-pulse absolute inset-0 rounded-full border border-[#634196]/30 dark:border-purple/30" />
        <LuSparkles className="ai-twinkle mb-1.5 h-5 w-5 text-[#634196] sm:mb-2 sm:h-7 sm:w-7 dark:text-purple" />
        <p className="px-3 text-xs font-bold leading-tight text-[#0b1a3a] sm:text-lg dark:text-white">
          AI-powered systems
        </p>
        <p className="mt-1 font-mono text-[9px] tracking-wide text-slate-500 sm:text-xs dark:text-white-100">
          shipped 10× faster
        </p>
      </div>

      <style>{`
        @keyframes ai-spin { to { transform: rotate(360deg); } }
        @keyframes ai-pulse {
          0%   { transform: scale(1);    opacity: .7; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes ai-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg);   opacity: 1; }
          50%      { transform: scale(.85) rotate(18deg); opacity: .75; }
        }
        .ai-orbit .ai-spin     { animation: ai-spin ${ORBIT_SECONDS}s linear infinite; }
        .ai-orbit .ai-spin-rev { animation: ai-spin ${ORBIT_SECONDS}s linear infinite reverse; }
        .ai-orbit .ai-pulse    { animation: ai-pulse 3.2s ease-out infinite; }
        .ai-orbit .ai-twinkle  { animation: ai-twinkle 3.2s ease-in-out infinite; }
        .ai-orbit:hover .ai-spin,
        .ai-orbit:hover .ai-spin-rev { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ai-orbit .ai-spin, .ai-orbit .ai-spin-rev,
          .ai-orbit .ai-pulse, .ai-orbit .ai-twinkle { animation: none; }
        }
      `}</style>
    </div>
  );
};

/* ── badge (same look as the reference) ─────────────────────────────────── */

const CertifiedBadge = () => (
  <a
    href="#certifications"
    className="group flex w-[240px] overflow-hidden rounded-md border border-slate-300 bg-[#f7f3ee] transition-shadow hover:shadow-[0_8px_30px_-10px_rgba(99,65,150,0.35)] dark:border-white/15"
  >
    <div className="relative w-[76px] shrink-0 bg-[#f6e6da]" aria-hidden>
      <span className="absolute left-[18px] top-[54px] h-2.5 w-2.5 rounded-full bg-[#0b1a3a]" />
      <span className="absolute left-[38px] top-[34px] h-2.5 w-2.5 rounded-full bg-[#0b1a3a]" />
      <span className="absolute left-[58px] top-[13px] h-2.5 w-2.5 rounded-full bg-[#0b1a3a]" />
    </div>
    <div className="px-3.5 py-2.5 text-[#0b1a3a]">
      <p className="text-xl font-bold leading-none tracking-tight">Certified</p>
      <p className="mt-1 text-[10px] leading-none">Claude Code &amp; MCP</p>
      <p className="mt-2.5 flex items-center gap-1 font-serif text-[11px] leading-none">
        <Image src="/claude.svg" alt="" width={10} height={10} />
        Anthropic Academy
      </p>
    </div>
  </a>
);

/* ── section ────────────────────────────────────────────────────────────── */

const AIEcosystem = () => {
  const reduce = useReducedMotion();

  return (
    <section id="ai-workflow" className="py-20 sm:py-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        {/* left — copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="flex items-center gap-3 text-sm text-slate-700 sm:text-base dark:text-white-100">
            <span className="h-px w-6 bg-[#634196] dark:bg-purple" />
            My AI Workflow
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-[#0b1a3a] sm:text-4xl md:text-[2.75rem] dark:text-white">
            I build on the platforms behind modern AI — and ship{" "}
            <SketchHighlight>10× faster.</SketchHighlight>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white-200">
            AI-assisted development and LLM-powered workflows sit at the core of
            how I work. 5+ years of experience. Since the start of 2026, I&#39;ve
            built my delivery process around LLMs and AI coding agents. I go
            from idea to working prototype in hours, then harden it into
            business-ready software.
          </p>

          <dl className="mt-10 max-w-xl border-t border-[#634196] dark:border-purple/25">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="grid gap-1 border-b border-[#634196] py-4 sm:grid-cols-[200px_1fr] sm:gap-6 dark:border-purple/25"
              >
                <dt className="text-[15px] font-medium text-[#0b1a3a] dark:text-white">
                  {p.title}
                </dt>
                <dd className="text-sm text-slate-600 dark:text-white-100">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
            <CertifiedBadge />
            <a
              href={PARTNER_NETWORK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-[#0b1a3a] pb-1.5 text-[15px] text-[#0b1a3a] transition-colors hover:border-[#634196] hover:text-[#634196] dark:border-white dark:text-white dark:hover:border-purple dark:hover:text-purple"
            >
              About the Claude Partner Network
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* right — animated orbit */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <Orbit />
        </motion.div>
      </div>
    </section>
  );
};

export default AIEcosystem;
