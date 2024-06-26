import React from 'react'
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { socialMedia } from '@/data';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className='w-full  pb-10 mb-[100px] md:mb-5' id='contact'>
        <div className='flex items-center flex-col'>
            <h1 className='heading lg:max-w-45[vw]'>
                Ready to take <span className='text-purple'>your</span> digital presence to the next level?
            </h1>
            <p className='text-white-200 md:mt-10 my-5 text-center'>
                Reach out to me today and I hope I can help you out in your talent hunt.
            </p>
            <a href="/resume/Rohab-Aamir.pdf" download="Rohab-Aamir-Resume">
                <MagicButton
                    title="Download Resume"
                    icon={<FaLocationArrow/>}
                    position='right'
                />
            </a>
        </div>
        <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light mb-5 md:mb-0">
          Copyright © 2024 Rohab Aamir
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
             <a href={info.link}>
              <Image src={info.img} alt="icons" width={20} height={20} />
             </a>
            </div>
          ))}
        </div>
      </div>
      
    </footer>
  )
}

export default Footer;
