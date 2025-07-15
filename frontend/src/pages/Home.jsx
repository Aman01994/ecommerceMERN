import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Hero />
      <LastestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </>
  )
}

export default Home