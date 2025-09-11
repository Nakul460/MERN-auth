import React, { use, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Navbar = () => {

    const navigate = useNavigate()
    const {userData,backendUrl,setUserData,setIsLoggedin} = useContext(AppContent)
    const logout = async ()=>{
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        toast.success('Logout successful')
        
      } catch (error) {
        toast.error(data.error)
      }
    }

  return (
    <div className='w-full flex justify-between items-center sm:px-24 p-4 sm:p-6 absolute top-0 '>
      
      <img src={assets.logo} alt="" className='w-28 sm:w-32' />
      
      {
      userData ? 
      <div className='w-8 h-8 flex items-center justify-center rounded-full bg-black text-white relative group '>
        
        <div className='absolute top-0 right-0 mt-8  w-full  bg-transparent h-2 '>
        </div>
        {userData.name[0].toUpperCase()}
        
        

        <div className='absolute hidden mt-10 group-hover:block top-0 right-0 z-10 text-black rounded  overflow-visible shadow-2xl'>
          <div className='absolute -top-2 right-1 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-10 border-b-gray-100 shadow-5xl '>
        </div>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer '>Verify email</li>
}
            <li onClick={logout} className='pr-10 py-1 px-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
          </ul>
          </div>
          
        
      </div>:
      <button onClick={()=>navigate('/login')} className='flex gap-2 border border-gray-800 rounded-full px-4 py-2
      hover:bg-gray-100 active:bg-gray-100'>Login 
      <img src={assets.arrow_icon} alt="" /></button>
}
    </div>
  )
}

export default Navbar
