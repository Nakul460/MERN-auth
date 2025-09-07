import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center text-center justify-center h-screen ab'>
      
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6' />
       
      <h1 className='flex gap-2 items-center mb-6 font-medium text-2xl sm:text-4xl'>Hey Developer <img src={assets.hand_wave} 
      alt="" className='w-8 aspect-square' /></h1>

      <h2 className='mb-5 text-3xl sm:5xl font-semibold text-gray-800'>Welcome to our app</h2>

      <p className='mb-6 px- sm:w-120 sm:px-0'>Let's start with a quick product tour and we will have
        you up and running in no time!</p>

      <button onClick={()=>navigate('/login')} className='border border-gray-500 px-4 py-2 rounded-full
      hover:bg-gray-100 active:bg-gray-100 transition-all'>Get started</button>

    </div>  
  )
}

export default Header
