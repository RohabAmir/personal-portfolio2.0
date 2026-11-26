
import React from "react";

const MagicButton = ({
    title, icon, position, handleClick, otherClasses
}:{
    title: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
}) => {
  return (
    <button
      className={`group relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1.5px] focus:outline-none md:w-60 md:mt-10 transition-all duration-300 shadow-[0_10px_28px_-14px_rgba(99,65,150,0.55)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(99,65,150,0.65)] dark:shadow-none dark:hover:translate-y-0 dark:hover:shadow-none dark:p-[1px] ${otherClasses}`}
      onClick={handleClick}
      style={{
        background: 'var(--magic-btn-bg)'
      }}

    >
      {/* light: soft lilac light running around the border */}
      <span
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#634196_0%,#E2CBFF_25%,#634196_50%,#634196_100%)] dark:hidden"
      />
      {/* dark: original spinning border */}
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] dark:block hidden"
      />
      <span
        className={`relative inline-flex h-full w-full overflow-hidden text-sm sm:text-base cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#634196] shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:bg-[#f6f1fc] dark:bg-slate-950 dark:text-white dark:shadow-none dark:hover:bg-slate-900 whitespace-nowrap px-4 sm:px-0 font-semibold tracking-normal sm:tracking-wide transition-colors duration-300 gap-2 ${position === 'left' ? 'flex-row-reverse' : ''}`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* light: soft lilac shine that sweeps across on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#634196]/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] dark:hidden"
        />
        {position === "left" && icon}
        {title}
        {position === "right" && (
          <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

export default MagicButton;
