import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Verify = ()=> {
    const navigate = useNavigate()
    return(
        <div className="flex justify-center items-center  min-h-screen bg-gradient-to-b from-blue-200 to-purple-400">

        <img onClick={()=>navigate('/')} src={assets.logo} alt="" 
        className='absolute left-5 top-5 w-28 cursor-pointer sm:w-32 sm:left-20' />
        
        <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email verify Otp</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id</p>
        </form>

      
        </div>
    )
}

export default Verify