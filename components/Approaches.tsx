"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import SketchHighlight from "./ui/SketchHighlight";

const Approach = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "Planning & Strategy",
      icon: <AceternityIcon />,
      des: "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements.",
      effect: (
        <CanvasRevealEffect
          animationSpeed={5.1}
          containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
        />
      )
    },
    {
      title: "Development & Progress Update",
      icon: <AceternityIcon />,
      des: "Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way.",
      effect: (
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
          colors={[
            [255, 166, 158],
            [221, 255, 247],
          ]}
          dotSize={2}
        />
      )
    },
    {
      title: "Deployment & Launch",
      icon: <AceternityIcon />,
      des: "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.",
      effect: (
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
          colors={[[125, 211, 252]]}
        />
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <section className="w-full py-20 sm:py-32">
      <h1 className="heading dark:text-white text-black">
        My workflow{" "} 
        <SketchHighlight>process</SketchHighlight>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={card.icon}
            des={card.des}
            isActive={activeCard === index}
          >
            {card.effect}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
  isActive = false,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
  isActive?: boolean;
}) => {
  const [hovered, setHovered] = React.useState(false);
  const showEffect = hovered || isActive;
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border dark:border-white/[0.2] border-[#c6c3c4] group/canvas-card flex items-center justify-center
       max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl dark:bg-[rgb(4,7,29)] bg-white"
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {showEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className={`text-center transition-all duration-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        min-w-40 mx-auto flex items-center justify-center ${
          showEffect ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
        }`}
        >
          {icon}
        </div>
        <h2
          className={`dark:text-white text-slate-800 text-center text-3xl transition-all duration-500
         relative z-10 mt-4 font-bold ${
           showEffect 
             ? 'opacity-100 text-white -translate-y-2' 
             : 'opacity-0 translate-y-0'
         }`}
        >
          {title}
        </h2>
        <p
          className={`text-sm transition-all duration-500
         relative z-10 mt-4 text-center ${
           showEffect 
             ? 'opacity-100 text-white -translate-y-2' 
             : 'opacity-0 translate-y-0 dark:text-[#E4ECFF] text-slate-600'
         }`}
        >
          {des}
        </p>
      </div>
    </div>
  );
};
// Chevron arrow: points down on mobile (cards stack top to bottom),
// points right on desktop (cards sit side by side)
const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 rotate-90 lg:rotate-0 text-black dark:text-white group-hover/canvas-card:text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
