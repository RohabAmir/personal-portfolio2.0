import React from 'react'
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { socialMedia } from '@/data';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className='w-full pb-10  relative px-4 sm:px-6' id='contact'>
      <div className="h-screen w-screen absolute left-1/2 -translate-x-1/2 dark:bg-black bg-white dark:bg-grid-white/10 bg-grid-black/[0.08]">
        <div className="absolute pointer-events-none inset-0 dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className='flex items-center flex-col px-4 sm:px-0'>
            <h1 className='heading dark:text-white text-slate-800  lg:mt-12 mt-16 sm:mt-20 md:mt-24 px-2 sm:px-0 md:whitespace-nowrap whitespace-normal'>
                Ready to take <span className='dark:text-purple text-[#9a5df5]'>your</span> digital presence to the next level?
            </h1>
            <p className='dark:text-white-200 text-slate-700 md:mt-10 mt-6 mb-8 sm:mb-10 text-center text-sm sm:text-base max-w-[90%] sm:max-w-[600px] leading-relaxed'>
                Reach out to me today and I hope I can help you out in your talent hunt.
            </p>
            <a href="/resume/Rohab-Aamir-v-2.pdf" download="Rohab-Aamir-Resume" className=" sm:w-auto px-4 sm:px-0">
                <MagicButton
                    title="Download Resume"
                    icon={<FaLocationArrow/>}
                    position='right'
                />
            </a>
        </div>
        <div className="flex mt-12 sm:mt-16 md:mt-20 md:flex-row flex-col justify-between items-center gap-6 md:gap-0 px-4 sm:px-0">
          <p className="md:text-base text-xs sm:text-sm md:font-normal font-light text-center md:text-left dark:text-white text-slate-700 order-2 md:order-1">
            Copyright © 2024 Rohab Aamir
          </p>

          <div className="flex items-center justify-center md:gap-3 gap-4 sm:gap-6 order-1 md:order-2">
            {socialMedia.map((info) => (
              <a 
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-10 sm:h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 dark:bg-black-200 bg-[#252A5A] rounded-lg border dark:border-black-300 border-white transition-transform hover:scale-110 active:scale-95"
              >
                <Image src={info.img} alt="social media icon" width={20} height={20} className="w-5 h-5 sm:w-[20px] sm:h-[20px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
