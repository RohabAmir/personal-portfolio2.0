import React from "react";
import AnimatedButton from "./ui/AnimatedButton";

const contactCards = [
  {
    id: 1,
    label: "Email",
    value: "rohabamir2@gmail.com",
    href: "mailto:rohabamir2@gmail.com",
  },
  {
    id: 2,
    label: "LinkedIn",
    value: "in/rohab-aamir2/",
    href: "https://www.linkedin.com/in/rohab-aamir2/",
  },
  {
    id: 3,
    label: "Phone",
    value: "+92 320 9556612",
    href: "tel:+923209556612",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="relative w-full pt-0 sm:pt-28 pb-20 sm:pb-28 px-0">
      <div className="max-w-7xl mx-auto flex items-center flex-col">
        <h2 className="heading-2 dark:text-white text-black text-center leading-tight">
          Let&apos;s build
          <br />
          something{" "}
          <span className="dark:text-purple text-[#634196]">fast</span>.
        </h2>
        <p className="dark:text-white-200 text-slate-600 md:mt-8 mt-6 text-center text-sm sm:text-base max-w-[90%] sm:max-w-[520px] leading-relaxed">
          Have a system to launch or a workflow to automate? I turn ideas into
          shipped, business-ready products.
        </p>

        <AnimatedButton
          title="Start a conversation"
          href="mailto:rohabamir2@gmail.com"
          variant="light"
          size="lg"
          className="mt-8 sm:mt-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-14 sm:mt-20 w-full max-w-4xl">
          {contactCards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={
                card.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#c6c3c4] dark:border-white/10 bg-[#F9FAFB]/80 dark:bg-white/[0.03] backdrop-blur-sm px-6 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#634196]/60 dark:hover:border-purple/60 hover:shadow-[0_8px_30px_-10px_rgba(73,44,116,0.25)]"
            >
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">
                {card.label}
              </span>
              <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-white break-all transition-colors duration-300 group-hover:text-[#634196] dark:group-hover:text-purple">
                {card.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;