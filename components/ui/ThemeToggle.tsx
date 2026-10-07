"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { cn } from "@/utils/cn";

/**
 * Inline theme toggle designed to live inside the FloatingNav pill.
 * Renders a same-size placeholder until mounted to avoid layout shift.
 */
export const ThemeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 sm:h-10 sm:w-10 dark:border-white/10 dark:bg-white/[0.06]",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 transition-all duration-300 hover:bg-slate-200/70 active:scale-95 sm:h-10 sm:w-10 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]",
        className,
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="relative block h-[18px] w-[18px]">
        <HiSun
          className={`absolute inset-0 h-[18px] w-[18px] text-amber-500 transition-all duration-500 ${
            theme === "dark"
              ? "rotate-90 opacity-0 scale-0"
              : "rotate-0 opacity-100 scale-100"
          }`}
        />
        <HiMoon
          className={`absolute inset-0 h-[18px] w-[18px] text-slate-700 transition-all duration-500 dark:text-slate-100 ${
            theme === "dark"
              ? "rotate-0 opacity-100 scale-100"
              : "-rotate-90 opacity-0 scale-0"
          }`}
        />
      </span>
    </button>
  );
};