import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const Experience = () => {
  return (
    <div id="experiences" className="py-20">
      <h1 className="heading dark:text-white text-slate-800">
        My career{" "}
        <span className="dark:text-purple text-[#9a5df5]">titles</span>
      </h1>
      <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={10000 + card.id * 2000}
            borderRadius="1.5rem"
            className="text-start border-[#252A5A] dark:border-slate-800"
          >
            <div className="flex flex-col w-full h-full gap-4 p-5 sm:p-6 text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 overflow-hidden">
                  <Image
                    width={0}
                    height={0}
                    src={card.thumbnail}
                    alt={`${card.title} icon`}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                </div>
                <h1 className="text-base sm:text-lg md:text-xl font-bold leading-snug dark:text-white text-slate-800">
                  {card.title}
                </h1>
              </div>
              <p className="text-start text-sm font-medium leading-relaxed dark:text-white-100 text-slate-600">
                {card.desc}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;