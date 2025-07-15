import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* hero left  */}
        <div className='w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0'>
                <div className='flex items-center gap-2 text-[#414141]'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium test-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Lastest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p>SHOP NOW</p>
                <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>

        {/* hero right  */}
        <img className='w-full sm:w-1/2' src={assets.hero_img}  alt="" />
    </div>
  )
}

export default Hero