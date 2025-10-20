import React from 'react'
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { socialMedia } from '@/data';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className='w-full pb-10 mb-[100px] md:mb-5 relative' id='contact'>
      <div className="h-screen w-screen absolute left-1/2 -translate-x-1/2 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.08]">
        <div className="absolute pointer-events-none inset-0 dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="relative z-10">
        <div className='flex items-center flex-col'>
            <h1 className='heading dark:text-white text-slate-800 lg:max-w-45[vw] lg:mt-12 mt-24'>
                Ready to take <span className='dark:text-purple text-[#9a5df5]'>your</span> digital presence to the next level?
            </h1>
            <p className='dark:text-white-200 text-slate-700 md:mt-10 my-5 text-center'>
                Reach out to me today and I hope I can help you out in your talent hunt.
            </p>
            <a href="/resume/Rohab-Aamir-v-2.pdf" download="Rohab-Aamir-Resume">
                <MagicButton
                    title="Download Resume"
                    icon={<FaLocationArrow/>}
                    position='right'
                />
            </a>
        </div>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
          <p className="md:text-base text-sm md:font-normal font-light mb-5 md:mb-0 dark:text-white text-slate-700">
            Copyright © 2024 Rohab Aamir
          </p>

          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((info) => (
              <div
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180  dark:bg-black-200 bg-[#252A5A] rounded-lg border dark:border-black-300 border-white"
              >
               <a href={info.link}>
                <Image src={info.img} alt="icons" width={20} height={20} />
               </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
