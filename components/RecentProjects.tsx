"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaGithub, FaArrowRight, FaBolt } from "react-icons/fa";
import { projects, type Project } from "@/data";
import AnimatedButton from "./ui/AnimatedButton";
import SketchHighlight from "./ui/SketchHighlight";


function usePerView() {
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 768 ? 2 : 4);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return perView;
}

function MediaCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {
      /* autoplay not permitted — image stays */
    });
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div
      className="group/media relative self-center overflow-hidden rounded-3xl border border-[#c6c3c4] bg-[#F9FAFB] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-[#080b22] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* browser chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-[#c6c3c4] bg-white py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-neutral-500">
          {project.link.replace(/^https?:\/\/(www\.)?/, "")}
        </span>
      </div>

      {/* media area */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={project.imgBg ? { backgroundColor: project.imgBg } : undefined}
      >
        <Image
          src={project.img}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 700px"
          quality={90}
          className={`ken-burns h-full w-full object-center ${
            project.imgBg ? "object-contain" : "object-cover"
          }`}
        />
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
          />
        )}
        {/* subtle gradient for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}

function InfoPanel({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col py-1">
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {project.title}
      </h3>
      {/* Key facts — first thing the eye lands on */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl bg-[#634196]/[0.08] px-4 py-3 dark:bg-purple/[0.10]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#634196] dark:text-purple">
            <FaBolt aria-hidden className="h-7 w-7" />
          </span>
          <div className="leading-tight">
            <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {project.mvpHours}
              <span className="ml-1 text-base font-bold text-[#634196] dark:text-purple">hours</span>
            </p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              To a working MVP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#D97757]/[0.10] px-4 py-3 dark:bg-[#D97757]/[0.12]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
            <Image src="/claude.svg" alt="Claude" width={30} height={30} className="h-[30px] w-[30px]" />
          </span>
          <div className="leading-tight">
            <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Opus {project.claudeVersion}
            </p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              Built with Claude
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-neutral-500">
        {project.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
        {project.description}
      </p>

      {/* Features */}
      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-neutral-500">
          Features
        </p>
        <ul className="mt-2 space-y-1.5">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-[13px] leading-snug text-slate-800 dark:text-neutral-300"
            >
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#634196] dark:bg-purple"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Built with */}
      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-neutral-500">
          Built with
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] leading-relaxed text-slate-600 dark:text-neutral-400">
          <span>{project.tech.join(", ")}</span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <AnimatedButton
          title="Live Preview"
          href={project.link}
          variant="outline"
          showArrow
          ariaLabel={`Open ${project.title} live site in a new tab`}
        />
        <a
          href={project.mvpLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} MVP repository on GitHub`}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-slate-900 px-6 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 sm:text-sm dark:bg-white dark:text-slate-900 dark:hover:bg-neutral-200"
        >
          <FaGithub aria-hidden className="h-[30px] w-[30px]" />
          View MVP
          <FaArrowRight
            aria-hidden
            className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
          />
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.15fr_1fr] md:gap-12 py-12">
      <MediaCard project={project} />
      <InfoPanel project={project} />
    </article>
  );
}

const RecentProjects = () => {
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = useMemo(() => {
    const out: Project[][] = [];
    for (let i = 0; i < projects.length; i += perView) {
      out.push(projects.slice(i, i + perView));
    }
    return out;
  }, [perView]);

  useEffect(() => {
    setPage((p) => Math.min(p, slides.length - 1));
  }, [slides.length]);

  const goTo = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(Math.max(0, Math.min(next, slides.length - 1)));
  };

  return (
    <section className="relative py-20 sm:py-32" id="projects">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "var(--tech-stack-glow)",
        }}
      />

      <h1 className="heading relative dark:text-white text-black">
        Highlighting my recent{" "}
        <SketchHighlight>success stories</SketchHighlight>
      </h1>

      <div className="relative mt-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${page}-${perView}`}
            custom={direction}
            initial={{ opacity: 0, x: 60 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 * direction }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-12 lg:gap-8"
          >
            {slides[page]?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c6c3c4] text-slate-600 transition-colors hover:border-[#634196]/60 hover:text-[#634196] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/[0.14] dark:text-neutral-300 dark:hover:border-purple/60 dark:hover:text-purple"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === page
                    ? "w-8 bg-[#634196] dark:bg-purple"
                    : "w-2 bg-slate-300 hover:bg-[#634196]/50 dark:bg-white/25 dark:hover:bg-purple/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next projects"
            onClick={() => goTo(page + 1)}
            disabled={page === slides.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c6c3c4] text-slate-600 transition-colors hover:border-[#634196]/60 hover:text-[#634196] disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/[0.14] dark:text-neutral-300 dark:hover:border-purple/60 dark:hover:text-purple"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
