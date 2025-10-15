import React from 'react'

export default function NewsLetterBox() {



    const OnSubmitHandler =(e)=>{
        e.preventDefault();
    }

  return (
    <div className="w-full max-w-xl mx-auto bg-[#F7F6F3] px-8 py-10 text-center shadow-sm">
      <h2 className="text-3xl font-bold mb-2 text-[#2E2E2E]">Subscribe now & get 20% off</h2>
      <p className="text-base text-[#6B6B6B] mb-6">Join our fashion community and never miss an update.</p>
      <form onSubmit={OnSubmitHandler} className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
        <input type="email" className="w-full sm:flex-1 px-4 py-3 outline-none bg-white text-[#2E2E2E] border border-[#E8E8E8] focus:border-[#D6C7B9] transition" placeholder="Enter your email id" required />
        <button type="submit" className="bg-[#2E2E2E] text-white font-semibold text-sm px-8 py-3 transition hover:bg-[#D6C7B9] hover:text-[#2E2E2E]">SUBSCRIBE</button>
      </form>
    </div>
  )
}
