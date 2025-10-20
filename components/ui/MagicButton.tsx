
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
      className={`relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10 ${otherClasses}`}
      onClick={handleClick}
      style={{
        // Fallback for iOS where conic-gradient might not be supported
        background: 'radial-gradient(circle, #E2CBFF, #393BB2)'
      }}
    >
      <span 
        className="absolute inset-[-1000%] dark:animate-[spin_1s_linear_infinite] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] "
      />
      <span 
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg dark:bg-slate-950  px-7 text-sm font-medium text-white gap-2 ${position === 'left' ? 'flex-row-reverse' : ''}`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
