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
              background: "var(--bento-border-gradient)",
              boxShadow: "var(--bento-box-shadow)",
            }}
          >
            <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.4rem-1px)] overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 inset-x-0 h-px"
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
