import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-center sm:px-24 p-4 sm:p-6 absolute top-0 '>
      
      <img src={assets.logo} alt="" className='w-28 sm:w-32' />

      <button onClick={()=>navigate('/login')} className='flex gap-2 border border-gray-800 rounded-full px-4 py-2
      hover:bg-gray-100 active:bg-gray-100'>Login 
      <img src={assets.arrow_icon} alt="" /></button>

    </div>
  )
}

export default Navbar
