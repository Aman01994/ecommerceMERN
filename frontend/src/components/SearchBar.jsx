import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {

    const {search , setSearch , showSearch , setShowSearch } = useContext(ShopContext);
    const [visible , setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
      if(location.pathname.includes("collection") ){
        setVisible(true)
      }else{
        setVisible(false)
      }
      // console.log(location);

    },[location]) // --> this is dependancy array


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
    <div className="inline-flex items-center justify-center border border-[#D6D6D6] hover:border-[#BEBEBE] transition-colors duration-200 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-[#FAFAFA] group">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 font-inter text-base font-medium bg-[#FAFAFA] text-[#2E2E2E] placeholder-[#9A9A9A] border-none outline-none transition-colors duration-200 focus:border-none focus:ring-0 focus:shadow-[0_0_4px_rgba(0,0,0,0.08)] focus:bg-[#FAFAFA]"
        type="text"
        placeholder="Search for products, styles, or brands"
        style={{ minWidth: 0 }}
      />
      <span className="ml-2 flex items-center cursor-pointer transition-transform duration-150 group-hover:scale-110">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#707070] group-hover:text-[#2E2E2E] transition-colors duration-150">
          <circle cx="9" cy="9" r="6.5" />
          <line x1="15" y1="15" x2="19" y2="19" />
        </svg>
      </span>
    </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ): null
}
