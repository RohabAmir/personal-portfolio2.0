"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGeneratorEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill={isDark ? "white" : "purple"}
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black  bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.08]  flex items-center justify-center absolute top-0 left-0 ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      </div>

      <div className="flex justify-center relative lg:my-20 my-10 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-base text-center  dark:text-blue-100 text-slate-800 lg:max-w-[48vw] max-w-[54vw] mb-2">
            Hi, I am <span className=" dark:text-blue-100 text-slate-800 font-extrabold">Rohab Aamir</span>,{" "}
            <span className="dark:text-purple text-[#9a5df5] font-bold">a Software Engineer</span>
          </h2>
          <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />
          <p className=" dark:text-white-200 text-slate-800 text-center font-medium font-mono md:tracking-widest lg:mb-4 mb-14 text-sm md:text-lg lg:text-xl ">
            Highly skilled Software Engineer with 3+ years of experience
            specializing in frontend development, leveraging{" "}
            <span className="dark:text-purple text-[#9a5df5] font-bold">
              React, Next.js, JavaScript and TypeScript {" "}
            </span>
            to build high-performance, scalable web applications.Adept at
            collaborating with cross-functional teams to drive significant
            improvements in user adoption, development efficiency, and content
            management across diverse platforms.
          </p>
          <a href="#projects">
            <MagicButton
              title="See my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
