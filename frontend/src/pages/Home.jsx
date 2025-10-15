import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

function Home() {
  return (
    <main className="bg-white text-[#2E2E2E]">
      {/* Hero Section */}
  <section className="w-full min-h-[70vh] flex items-center justify-center bg-transparent">
        <Hero />
      </section>

      {/* Latest Collection */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-sm tracking-widest text-[#D6C7B9] font-semibold">LATEST COLLECTION</p>
          <h2 className="text-3xl font-bold mt-2 mb-1">Discover the freshest styles curated just for you.</h2>
        </div>
        <LastestCollection />
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-[#F7F6F3]">
        <div className="mb-8 text-center">
          <p className="text-sm tracking-widest text-[#D6C7B9] font-semibold">BEST SELLERS</p>
          <h2 className="text-3xl font-bold mt-2 mb-1">Our most-loved pieces, chosen by you.</h2>
        </div>
        <BestSeller />
      </section>

      {/* Features / Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <OurPolicy />
      </section>

      {/* Newsletter Subscription */}
      <section className="w-full py-16 bg-[#E8E8E8] flex justify-center items-center">
        <NewsLetterBox />
      </section>
    </main>
  )
}

export default Home