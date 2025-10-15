import React from 'react'
import { assets } from '../assets/assets'

export default function OurPolicy() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 py-10">
      {/* Card 1 */}
      <div className="flex flex-col items-center flex-1 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#F7F6F3] mb-4 shadow-sm">
          <img src={assets.exchange_icon} alt="Easy Exchange" className="w-8 h-8" />
        </div>
        <p className="font-semibold text-base mb-1">Easy Exchange Policy</p>
        <p className="text-[#6B6B6B] text-sm">Hassle-free exchanges for every order.</p>
      </div>
      {/* Card 2 */}
      <div className="flex flex-col items-center flex-1 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#F7F6F3] mb-4 shadow-sm">
          <img src={assets.quality_icon} alt="7 Days Return" className="w-8 h-8" />
        </div>
        <p className="font-semibold text-base mb-1">7 Days Return Policy</p>
        <p className="text-[#6B6B6B] text-sm">Return within 7 days, no questions asked.</p>
      </div>
      {/* Card 3 */}
      <div className="flex flex-col items-center flex-1 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#F7F6F3] mb-4 shadow-sm">
          <img src={assets.support_img} alt="24/7 Support" className="w-8 h-8" />
        </div>
        <p className="font-semibold text-base mb-1">24/7 Customer Support</p>
        <p className="text-[#6B6B6B] text-sm">We're here for you, anytime.</p>
      </div>
      {/* Card 4 */}
      <div className="flex flex-col items-center flex-1 px-4">
        <div className="w-16 h-16 flex items-center justify-center bg-[#F7F6F3] mb-4 shadow-sm">
          <img src={assets.checkout_icon || assets.quality_icon} alt="Fast Checkout" className="w-8 h-8" />
        </div>
        <p className="font-semibold text-base mb-1">Fast & Secure Checkout</p>
        <p className="text-[#6B6B6B] text-sm">Quick, safe, and easy payments.</p>
      </div>
    </div>
  )
}
