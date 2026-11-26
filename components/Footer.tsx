"use client";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";
import Image from "next/image";
import { useTheme } from "next-themes";
import SketchHighlight from "./ui/SketchHighlight";
import { Vortex } from "./ui/Vortex";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === "light";

  return (
    <footer className="w-full relative" id="footer">
      <Vortex
        variant={isLight ? "light" : "dark"}
        // light: 255–285 = indigo → brand violet (#634196); dark: original sweep
        baseHue={isLight ? 255 : 220}
        rangeHue={isLight ? 30 : 100}
        rangeY={160}
        containerClassName="bg-[#F3F3F3] dark:bg-black-100"
        className="w-full pb-10 px-4 sm:px-6"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center flex-col px-0">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-start sm:text-center  dark:text-white text-black mt-16 sm:mt-20 md:mt-24 px-0 whitespace-normal">
              Ready to take{" "}
              <SketchHighlight>your</SketchHighlight>{" "}
              digital presence to the next level?
            </h1>
            <p className="dark:text-white-200 text-slate-700 md:mt-10 mt-6 mb-8 sm:mb-10 text-start sm:text-center text-sm sm:text-base max-w-full sm:max-w-[600px] leading-relaxed">
              Reach out to me today and I hope I can help you out in your talent
              hunt.
            </p>
            {/* Same look as MagicButton, but the border is static in both
                themes — the vortex already
                provides the motion in this section. */}
            <a
              href="/resume/Rohab-Aamir.pdf"
              download="Rohab-Aamir-Resume"
              className="group w-auto px-0"
            >
              <span
                className="relative inline-flex h-12 w-auto overflow-hidden rounded-full p-[1.5px] md:w-60 md:mt-10 transition-all duration-300 shadow-[0_10px_28px_-14px_rgba(99,65,150,0.55)] group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_36px_-14px_rgba(99,65,150,0.65)] dark:shadow-none dark:group-hover:translate-y-0 dark:group-hover:shadow-none dark:p-[1px]"
                style={{ background: "var(--magic-btn-bg)" }}
              >
                <span className="absolute inset-0 dark:hidden bg-[linear-gradient(110deg,#634196_0%,#E2CBFF_50%,#634196_100%)]" />
                <span className="absolute inset-0 hidden dark:block bg-[linear-gradient(110deg,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span
                  className="relative inline-flex h-full w-full overflow-hidden text-sm sm:text-base cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#634196] shadow-[inset_0_1px_0_rgba(255,255,255,1)] group-hover:bg-[#f6f1fc] dark:bg-slate-950 dark:text-white dark:shadow-none dark:group-hover:bg-slate-900 px-7 md:px-0 font-semibold tracking-wide transition-colors duration-300 gap-2"
                  style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#634196]/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] dark:hidden"
                  />
                  Download Resume
                  <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <FaLocationArrow />
                  </span>
                </span>
              </span>
            </a>
          </div>
          <div className="flex mt-12 sm:mt-16 md:mt-20 md:flex-row flex-col justify-between items-center gap-6 md:gap-0 px-4 sm:px-0">
            <p className="md:text-base text-xs sm:text-sm md:font-normal font-light text-center md:text-left dark:text-white text-slate-700 order-2 md:order-1">
              Copyright © 2026 Rohab Aamir
            </p>

            <div className="flex items-center justify-center md:gap-3 gap-4 sm:gap-6 order-1 md:order-2">
              {socialMedia.map((info) => (
                <a
                  key={info.id}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-10 sm:h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-transparent dark:bg-black-200 rounded-lg border border-[#c6c3c4] dark:border-black-300 transition-transform hover:scale-110 active:scale-95"
                >
                  <Image
                    src={info.img}
                    alt="social media icon"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-[20px] sm:h-[20px] invert dark:invert-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Vortex>
    </footer>
  );
};

export default Footer;
