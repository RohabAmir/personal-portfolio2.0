import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const Experience = () => {
  return (
    <div id="experiences" className="py-20">
      <h1 className="heading dark:text-white text-slate-800">
        My
        <span className="dark:text-purple text-[#9a5df5]"> work experience</span>
      </h1>
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card)=>(
            <Button
                key={card.id}
                duration={Math.floor(Math.random()* 10000) + 10000}
                borderRadius="1.75rem"
                className="flex-1 dark:text-white text-slate-800 border-[#252A5A] dark:border-slate-800"
                
            >
                <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                    <Image width={0} height={0} src={card.thumbnail} alt={card.thumbnail} className="lg:w-32 md:w-20 w-16"/>
                </div>
                <div className=" py-3 pr-3 lg:ms-5">
                    <h1 className=" text-start text-xl md:text-2xl font-bold dark:text-white text-slate-800">
                        {card.title}
                    </h1>
                    <p className=" text-start font-semibold mt-3 dark:text-white-100 text-slate-600">
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
