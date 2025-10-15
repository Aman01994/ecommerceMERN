import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-0 md:px-8 py-8 md:py-16 bg-white transition-all duration-700">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-0 fade-in-up">
        <span className="text-[#D6C7B9] font-semibold tracking-widest text-xs md:text-sm mb-2">OUR BESTSELLERS</span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Latest Arrivals</h1>
        <button className="group flex items-center gap-2 bg-[#2E2E2E] text-white font-semibold px-8 py-3 mt-2 uppercase tracking-wide transition hover:bg-[#D6C7B9] hover:text-[#2E2E2E] focus:outline-none">
          SHOP NOW
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
      {/* Right: Hero Image */}
      <div className="flex-1 flex items-center justify-center w-full md:w-auto fade-in-right">
        <img
          src={assets.hero_img2}
          alt="Latest Fashion Hero"
          className="w-full max-w-md md:max-w-lg object-cover transition-transform duration-500 hover:scale-105 shadow-lg"
          style={{borderRadius:0}}
        />
      </div>
      <style>{`
        .fade-in-up { opacity: 0; transform: translateY(40px); animation: fadeInUp 1s forwards 0.2s; }
        .fade-in-right { opacity: 0; transform: translateX(40px); animation: fadeInRight 1s forwards 0.5s; }
        @keyframes fadeInUp { to { opacity: 1; transform: none; } }
        @keyframes fadeInRight { to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

export default Hero