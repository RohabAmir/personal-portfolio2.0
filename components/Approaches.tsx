"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "Planning & Strategy",
      icon: <AceternityIcon order="Phase 1" />,
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
      icon: <AceternityIcon order="Phase 2" />,
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
      title: "Development & Launch",
      icon: <AceternityIcon order="Phase 3" />,
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
    <section className="w-full py-20">
      <h1 className="heading dark:text-white text-slate-800">
        My <span className="dark:text-purple text-[#9a5df5]">approach</span>
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
      className="border dark:border-white/[0.2] border-[#252A5A] group/canvas-card flex items-center justify-center
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
// add order prop for the Phase number change
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] ">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full dark:bg-slate-950 bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 dark:text-purple text-white font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
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
