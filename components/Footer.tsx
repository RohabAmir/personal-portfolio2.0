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
            {/* MagicButton look, but the border is static — the vortex
                already provides the motion in this section */}
            <a
              href="/resume/Rohab-Aamir.pdf"
              download="Rohab-Aamir-Resume"
              className="w-full sm:w-auto px-0"
            >
              <span
                className="relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] md:w-60 md:mt-10"
                style={{ background: "var(--magic-btn-bg)" }}
              >
                <span className="absolute inset-0 hidden dark:block bg-[linear-gradient(110deg,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span
                  className="relative inline-flex h-full w-full text-sm sm:text-base cursor-pointer items-center justify-center rounded-full dark:bg-slate-950 bg-[#634196] px-5 sm:px-0 font-medium text-white transition-colors duration-300 hover:bg-[#543680] dark:hover:bg-slate-900 gap-2"
                  style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  Download Resume
                  <FaLocationArrow />
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
