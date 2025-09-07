import React from 'react'
import Navbar from '../comp/Navbar'
import Header from '../comp/Header'

const Home = () => {
  return (
    <div className='min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center '>
      <Navbar />
      <Header />
    </div>
  )
}

export default Home
