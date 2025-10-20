"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <HiSun
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 ${
            theme === "dark"
              ? "rotate-90 opacity-0 scale-0"
              : "rotate-0 opacity-100 scale-100"
          }`}
        />
        <HiMoon
          className={`absolute inset-0 w-6 h-6 text-slate-700 dark:text-slate-200 transition-all duration-500 ${
            theme === "dark"
              ? "rotate-0 opacity-100 scale-100"
              : "-rotate-90 opacity-0 scale-0"
          }`}
        />
      </div>
    </button>
  );
};

