"use client";
import React from "react";
import { projects } from "@/data";
import { PinContainer } from "./ui/3d-pin";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading dark:text-white text-slate-800">
        A small selection of{" "}
        <span className="dark:text-purple text-[#9a5df5]">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 mt-10 gap-x-24 gap-y-8 ">
        {projects.map(({ id, title, des, img, iconLists, link }, index) => (
          <div
            key={id}
            className=" sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex items-center justify-center overflow-hidden sm:w-[570px] w-[80vw] sm:h-[30vh] h-[20vh] xs:h-[10vh] mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl dark:bg-[rgb(4,7,29)] bg-[#13162d]">
                  <Image width={0} height={0} src="/bg.png" alt="bg-img" />
                </div>
                <Image
                  src={img}
                  alt={title}
                  width={500}
                  height={300}
                  className={`z-10 absolute bottom-0 rounded-[4px] h-full ${
                    [0, 1, 2, 3, 4].includes(index)
                      ? "max-w-[80%]"
                      : "max-w-[82%]"
                  } sm:object-fill object-contain`}
                  style={{
                    transform: "skew(-10deg)",
                  }}
                />
              </div>
              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>
              <span className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                {des}
              </span>
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border dark:border-white/[.2] border-white rounded-full dark:bg-black bg-[#252A5A] lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index * 2}px)`,
                      }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={icon}
                        alt="icon5"
                        className="p-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <a
                    href={link}
                    className="flex lg:text-xl md:text-xs text-sm dark:text-purple text-[#9a5df5] text-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check Live Site
                  </a>
                  <FaLocationArrow className="ms-3 dark:text-purple text-[#9a5df5]" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
