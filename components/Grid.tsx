"use client";
import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  return (
    <section id="about">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-1 mt-0 xl:-mt-5 2xl:-mt-2.5 3xl:-mt-5 pb-16 sm:pb-20">
        <div className="relative">
          <div
            className="relative rounded-3xl sm:rounded-3xl p-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(214,188,246,0.75) 0%, rgba(203,172,249,0.55) 20%, rgba(154,93,245,0.4) 55%, rgba(7,7,45,0.28) 100%)",
              boxShadow: [
                "0 -3px 120px -4px rgba(216,180,254,0.55)",
                "-3px 0 22px -8px rgba(167,139,250,0.38)",
                "3px 0 22px -8px rgba(167,139,250,0.38)",
                "0 3px 10px -8px rgba(139,92,246,0.18)",
                "0 0 70px -18px rgba(124,58,237,0.32)",
                "0 30px 80px -20px rgba(0,0,0,0.7)",
              ].join(", "),
            }}
          >
            <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.4rem-1px)] overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 inset-x-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.55) 65%, transparent 95%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 inset-x-0 h-16"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(196,181,253,0.07) 0%, transparent 100%)",
                }}
              />

              <BentoGrid className="relative w-full p-4 sm:p-7">
                {gridItems.map((item: any, i) => (
                  <BentoGridItem
                    id={item.id}
                    key={i}
                    title={item.title}
                    description={item.description}
                    className={item.className}
                    img={item.img}
                    imgClassName={item.imgClassName}
                    titleClassName={item.titleClassName}
                    spareImg={item.spareImg}
                    isOrbitingSkills={item.isOrbitingSkills}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
