import React from "react";
import { cn } from "@/utils/cn";

type AnimatedButtonProps = {
  title: string;
  href: string;
  variant?: "outline" | "light";
  size?: "md" | "lg";
  showArrow?: boolean;
  className?: string;
  ariaLabel?: string;
};

const AnimatedButton = ({
  title,
  href,
  variant = "light",
  size = "md",
  showArrow = true,
  className,
  ariaLabel,
}: AnimatedButtonProps) => {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={ariaLabel ?? title}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group btn-wiggle inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 cursor-pointer",
        size === "lg"
          ? "h-12 sm:h-14 px-5 sm:px-8 text-sm sm:text-base gap-2 sm:gap-3"
          : "h-12 sm:h-12 px-5 sm:px-8 text-xs sm:text-sm gap-2",
        variant === "light"
          ? "border border-[#634196] dark:border-black/[0.06] bg-[#634196] dark:bg-white text-white dark:text-slate-900 shadow-[0_6px_24px_-8px_rgba(99,65,150,0.5)] hover:shadow-[0_0_50px_-10px_rgba(99,65,150,0.55)] dark:shadow-[0_6px_24px_-8px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_0_50px_-10px_rgba(203,172,249,0.85)]"
          : "border border-[#c6c3c4] dark:border-white/[0.14] bg-white/60 dark:bg-white/[0.04] text-slate-800 dark:text-white hover:border-[#492C74]/60 dark:hover:border-purple/70 hover:bg-[#634196]/[0.07] dark:hover:bg-white/[0.08]",
        className
      )}
    >
      {title}
      {showArrow && (
        <span
          aria-hidden
          className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white/20 dark:bg-slate-900/10 transition-transform duration-300 group-hover:rotate-45"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5 sm:h-3 sm:w-3"
          >
            <path d="M7 17L17 7" />
            <path d="M17 7H8" />
            <path d="M17 7V16" />
          </svg>
        </span>
      )}
    </a>
  );
};

export default AnimatedButton;