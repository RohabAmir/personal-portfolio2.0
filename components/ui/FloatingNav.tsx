"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "./ThemeToggle";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navItems[0]?.link ?? "#home");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") {
      return;
    }

    const previous = scrollYProgress.getPrevious();

    if (current <= 0.05) {
      setVisible(true);
      return;
    }

    if (typeof previous === "number") {
      const direction = current - previous;
      setVisible(direction < 0);
    }
  });

  useEffect(() => {
    const ids = navItems
      .map((item) => item.link.replace("#", ""))
      .filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      setMenuOpen(false);

      if (!els.length) return;

      const vh = window.innerHeight;
      const lineY = vh * 0.4;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      let covering: string | null = null;
      let nearestAbove: string | null = null;
      let nearestTop = -Infinity;

      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= lineY && r.bottom > lineY) covering = el.id;
        if (r.top <= lineY && r.top > nearestTop) {
          nearestTop = r.top;
          nearestAbove = el.id;
        }
      }

      let target = covering ?? nearestAbove ?? ids[0];

      if (scrollY + vh >= docHeight - vh * 0.25) {
        target = els[els.length - 1].id;
      }

      setActiveLink(`#${target}`);
    };

    const onResize = () => onScroll();

    onScroll();
    const settle = setTimeout(onScroll, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    if (!visible) setMenuOpen(false);
  }, [visible]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={rootRef}
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed top-3 sm:top-4 inset-x-3 z-[5000]",
          "sm:inset-x-0 sm:mx-auto sm:w-full sm:max-w-7xl px-0 sm:px-8",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 rounded-full border border-slate-300/60 dark:border-white/[0.14] bg-white/85 dark:bg-[#0b0e14]/90 backdrop-blur-xl py-2.5 px-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)]">
          <Link
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-8 w-8  shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-[0_0_0_1px_rgba(2,6,23,0.08),0_6px_16px_-4px_rgba(124,58,237,0.45)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
              <Image
                src="/logo1.svg"
                alt="Rohab Aamir logo"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden md:block font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-neutral-400">
              Rohab<span className="text-[#9a5df5] dark:text-purple">.</span>
            </span>
          </Link>

          <nav className="ml-1 hidden items-center gap-1 md:flex">
            {navItems.map((navItem, idx) => {
              const isActive = activeLink === navItem.link;

              return (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  onClick={() => setActiveLink(navItem.link)}
                  className={cn(
                    "relative flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "rounded-full border border-slate-300 dark:border-white/35  bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(2,6,23,0.06)] dark:bg-white/[0.09] dark:text-white"
                      : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/[0.06] dark:hover:text-white",
                  )}
                >
                  <span className="!cursor-pointer">{navItem.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:ml-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 transition-all duration-300 hover:bg-slate-200/70 active:scale-95 md:hidden dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]"
            >
              <span className="relative block h-[14px] w-[18px]">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[2px] w-full rounded-full bg-slate-600 transition-all duration-300 dark:bg-white",
                    menuOpen && "top-1/2 -translate-y-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-slate-600 transition-all duration-300 dark:bg-white",
                    menuOpen && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-slate-600 transition-all duration-300 dark:bg-white",
                    menuOpen && "bottom-1/2 -rotate-45 translate-y-1/2",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-x-0 top-[calc(100%+0.65rem)] flex flex-col gap-1 rounded-[1.75rem] border border-slate-300/60 bg-white/95 p-2.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden dark:border-white/[0.14] dark:bg-[#0b0e14]/95"
            >
              {navItems.map((navItem, idx) => {
                const isActive = activeLink === navItem.link;

                return (
                  <Link
                    key={`menu-${idx}`}
                    href={navItem.link}
                    onClick={() => {
                      setActiveLink(navItem.link);
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "group flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-slate-100 text-slate-900 dark:bg-white/[0.09] dark:text-white"
                        : "text-slate-600 hover:bg-slate-100/70 dark:text-neutral-300 dark:hover:bg-white/[0.05] dark:hover:text-white",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-slate-400 dark:text-neutral-500">
                        0{idx + 1}
                      </span>
                      {navItem.name}
                    </span>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                        isActive
                          ? "bg-[#9a5df5]"
                          : "bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-white/20",
                      )}
                    />
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
