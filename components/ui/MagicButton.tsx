
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
        className="absolute inset-[-1000%] "
        style={{
          backgroundImage: 'conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)',
          animation: 'spin 3s linear infinite',
          WebkitAnimation: 'spin 3s linear infinite', // for Safari
        }}
      />
      <span 
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white gap-2 ${position === 'left' ? 'flex-row-reverse' : ''}`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)', // for Safari
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
