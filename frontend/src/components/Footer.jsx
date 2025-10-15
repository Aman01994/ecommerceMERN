import React from 'react'
import { assets } from '../assets/assets'

export default function Footer() {
    return (
        <footer className="bg-[#F9F9F9] text-[#2E2E2E] font-inter pt-16 pb-0 px-4 md:px-16 fade-in-footer">
            {/* Newsletter */}
            <div className="max-w-4xl mx-auto w-full mb-10">
                <form className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mb-8">
                    <input
                        type="email"
                        className="w-full sm:w-auto flex-1 px-4 py-3 outline-none bg-white text-[#2E2E2E] border border-[#E0E0E0] focus:border-[#D6C7B9] transition text-sm"
                        placeholder="Enter your email to get updates"
                        required
                        style={{borderRadius:0}}
                    />
                    <button
                        type="submit"
                        className="bg-[#2E2E2E] text-white font-semibold text-sm px-8 py-3 transition hover:bg-[#D6C7B9] hover:text-[#2E2E2E]"
                        style={{borderRadius:0}}
                    >
                        Subscribe
                    </button>
                </form>
            </div>
            {/* Main Footer Grid */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 pb-10 px-2 md:px-0">
                {/* Brand Info */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <img className="mb-5 w-28" src={assets.logo} alt="Forever Logo" />
                    <p className="text-[#606060] leading-relaxed text-base max-w-xs">
                        Forever is a modern clothing brand dedicated to minimal design, comfort, and quality.
                    </p>
                </div>
                {/* Company Links */}
                <div className="flex flex-col items-center lg:items-start">
                    <h3 className="text-lg font-semibold mb-4 tracking-widest">COMPANY</h3>
                    <ul className="flex flex-col gap-2 text-[#2E2E2E] font-medium">
                        {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map((link, i) => (
                            <li
                                key={link}
                                className="transition-all duration-200 cursor-pointer hover:underline hover:underline-offset-4 hover:text-[#D6C7B9]"
                            >
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Get in Touch */}
                <div className="flex flex-col items-center lg:items-start">
                    <h3 className="text-lg font-semibold mb-4 tracking-widest">GET IN TOUCH</h3>
                    <ul className="flex flex-col gap-2 text-[#2E2E2E] text-base">
                        <li className="font-medium">+91-9866622417</li>
                        <li className="font-medium">mailus@foreverclothes.com</li>
                    </ul>
                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <a href="#" aria-label="Instagram" className="text-[#606060] hover:text-[#D6C7B9] transition-colors">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17" cy="7" r="1.2"/></svg>
                        </a>
                        <a href="#" aria-label="Facebook" className="text-[#606060] hover:text-[#D6C7B9] transition-colors">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.5 3h-2.5v7"/></svg>
                        </a>
                        <a href="#" aria-label="Twitter" className="text-[#606060] hover:text-[#D6C7B9] transition-colors">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M8 15c6 0 9-5 9-9v-.5A6.5 6.5 0 0 0 20 4.5a6.5 6.5 0 0 1-1.9.5A3.3 3.3 0 0 0 19.5 3a6.5 6.5 0 0 1-2.1.8A3.3 3.3 0 0 0 12 7.5c0 .3 0 .6.1.9A9.4 9.4 0 0 1 3 4.5s-4 9 5 13a9.4 9.4 0 0 1-5 1.5"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="border-t border-[#E0E0E0] py-5 mt-0">
                <p className="text-center text-xs md:text-sm text-[#888888]">© 2025 Forever.com — All Rights Reserved.</p>
            </div>
            <style>{`
                .fade-in-footer { opacity: 0; transform: translateY(40px); animation: fadeInFooter 1s forwards 0.2s; }
                @keyframes fadeInFooter { to { opacity: 1; transform: none; } }
            `}</style>
        </footer>
    )
}
