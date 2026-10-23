import React from "react";

import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import Image from "next/image";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading dark:text-white text-black">
        Reviews that speak{" "}
        <span className="dark:text-purple text-[#634196]">volumes!</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-0 sm:gap-4 md:gap-12 max-lg:mt-10">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group flex items-center justify-center gap-2 w-40 h-16 md:w-52 md:h-20 rounded-xl bg-transparent dark:bg-transparent  dark:border-transparent transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                width={0}
                height={0}
                src={company.img}
                alt={company.name}
                className={`${company.iconClassName} h-auto object-contain`}
              />
              {company.nameImg && (
                <Image
                  height={0}
                  width={company.nameWidth}
                  src={company.nameImg}
                  alt={`${company.name} wordmark`}
                  className={`${company.nameClassName} h-auto object-contain invert dark:invert-0`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;