import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import Home from '../pages/Home'
import { ShopContext } from '../context/ShopContext';


function Navbar() {

  const [visible , setVisible ] = useState(false);

  const { setShowSearch ,getCartCount, token , setToken , setCartItems , cartItems , navigate} = useContext(ShopContext)

  const logOut = ()=>{
    localStorage.removeItem("token")
    setToken('')
    setCartItems({})
    navigate("/login")
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-white border-b border-[#E0E0E0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 md:px-10 sticky top-0 z-30 navbar-blur transition-all duration-300">
      <Link to="/" className="flex items-center">
        <img src={assets.forever3} className="w-36 object-contain" alt="Logo" />
      </Link>
      <ul className="hidden sm:flex gap-7 text-sm text-[#2E2E2E] font-inter font-medium uppercase tracking-wide">
        {[
          { to: '/', label: 'HOME' },
          { to: '/collection', label: 'COLLECTION' },
          { to: '/about', label: 'ABOUT' },
          { to: '/contact', label: 'CONTACT' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 transition-colors duration-300 group ${isActive ? 'font-bold text-black' : ''}`
            }
          >
            <span className="relative">
              {label}
              <span className="block h-[2px] w-0 group-hover:w-full bg-black mx-auto mt-1 transition-all duration-300 origin-center" />
              {/* Active underline */}
              <span className={`block h-[2px] ${window.location.pathname === to ? 'w-full bg-black' : 'w-0 bg-transparent'} mx-auto mt-1 transition-all duration-300 origin-center`} />
            </span>
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <button onClick={() => setShowSearch(true)} className="p-0.5 rounded-none focus:outline-none group">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#2E2E2E] group-hover:text-black transition-colors duration-200 group-hover:scale-105">
            <circle cx="11" cy="11" r="7" />
            <line x1="18" y1="18" x2="22" y2="22" />
          </svg>
        </button>
        {/* Profile Icon & Dropdown */}
        <div className="group relative">
          <Link onClick={() => (token ? null : navigate('/login'))} to="/login">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#2E2E2E] group-hover:text-black transition-colors duration-200 group-hover:scale-105">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </Link>
          {/* Dropdown */}
          <div className={`${!token ? 'hidden' : 'group-hover:block hidden absolute dropdown-menu right-0 pt-4'}`}>
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-[#555555] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <p className="cursor-pointer hover:text-black transition-colors">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black transition-colors">Orders</p>
              <p onClick={logOut} className="cursor-pointer hover:text-black transition-colors">Logout</p>
            </div>
          </div>
        </div>
        {/* Cart Icon */}
        <Link to="/cart" className="relative cart-icon">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#2E2E2E] hover:text-black transition-colors duration-200 hover:scale-105">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="17" cy="20" r="1.5" />
            <path d="M2 2h2l3.6 7.59a1 1 0 0 0 .92.61h7.72a1 1 0 0 0 .92-.61L20 6H6" />
          </svg>
          <span className="absolute right-[-7px] bottom-[-7px] w-[14px] h-[14px] text-center leading-[14px] bg-black text-white rounded-full text-[10px] font-semibold flex items-center justify-center border-2 border-white">{getCartCount()}</span>
        </Link>
        {/* Mobile Menu Icon */}
        <button onClick={() => setVisible(true)} className="sm:hidden p-0.5 rounded-none focus:outline-none">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#2E2E2E] hover:text-black transition-colors duration-200 hover:scale-105">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'} overflow-hidden shadow-lg`}> 
        <div className="flex flex-col text-[#2E2E2E] gap-3 h-full animate-fadein-menu">
          <div className="flex items-center gap-4 p-3 cursor-pointer border-b border-[#EAEAEA]" onClick={() => setVisible(false)}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#2E2E2E] group-hover:text-black transition-colors duration-200">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <p className="font-medium">Back</p>
          </div>
          {[
            { to: '/', label: 'HOME' },
            { to: '/collection', label: 'COLLECTION' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              onClick={() => setVisible(false)}
              className="py-4 pl-8 border-b border-[#EAEAEA] text-base font-inter font-medium uppercase tracking-wide opacity-0 animate-fadein-menu-link"
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      <style>{`
        .navbar-blur {
          backdrop-filter: none;
        }
        .navbar-blur.scrolled {
          background: rgba(255,255,255,0.9)!important;
          backdrop-filter: blur(8px);
        }
        @media (max-width: 640px) {
          .navbar-blur { padding-left: 1rem; padding-right: 1rem; }
        }
        @keyframes fadein-menu {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadein-menu { animation: fadein-menu 0.4s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadein-menu-link {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein-menu-link { animation: fadein-menu-link 0.6s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  )
}

export default Navbar