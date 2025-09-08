import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { data, useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state,setState] = useState('Login')
  const navigate = useNavigate()

  const { backendUrl,setIsLoggedin } = useContext(AppContent)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onsubmitHandler = async (e)=>{
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register',
          {name,email,password}
        )
        if(data.success){
          setIsLoggedin(true)
          navigate('/')
          toast.success('Registerd Successfully')
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        if(state === 'Login'){
          const {data} = await axios.post(backendUrl + '/api/auth/login',{
            email,password
          })
          if(data.success){
            setIsLoggedin(true)
            navigate('/')
            toast.success('Login Successful')

          }
          else{
            toast.error(data.message)
          }
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen  px-6 sm:px-0
    bg-gradient-to-b from-blue-200 to-purple-400'>

      <img onClick={()=>navigate('/')} src={assets.logo} alt="" 
      className='absolute left-5 top-5 w-28 cursor-pointer sm:w-32 sm:left-20' />

      <div className='bg-slate-900 mt-15 p-10 rounded-lg shadow-lg w-full sm:w-96
      text-indigo-300 text-sm'>
        
      <h2 className='text-3xl font-semibold text-white text-center mb-3'>
        {state === 'Sign Up' ? 'Create account': 'Login'}
        </h2>

      <p className='text-center text-sm mb-6' >
        {state === 'Sign Up' ? 'Create your account': 'login to your account!'}
        </p>
      
      <form onSubmit={onsubmitHandler}>
        {state === 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          
          <img src={assets.person_icon} alt="" />

          <input onChange={e => setName(e.target.value)} value={name}
           type="text" placeholder='Full name' required 
          className=' outline-0 h-8 text-lg'  />
        </div>)}


        <div className='mb-4 mt-8 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          
          <img src={assets.mail_icon} alt="" />

          <input onChange={e => setEmail(e.target.value)} value={email}
          type="email" placeholder='Email id' required 
          className=' outline-0 h-8 text-lg'  />
        </div>

                <div className='mb-4 mt-8 flex items-center gap-3 w-full px-5 py-2.5
        rounded-full bg-[#333A5C]'>
          
          <img src={assets.lock_icon} alt="" />

          <input onChange={e => setPassword(e.target.value)} value={password}
          type="password" placeholder='Password' required 
          className=' outline-0 h-8 text-lg'  />
        </div>

        <p onClick={()=>navigate('/reset-password')} className='mb-4 mx-2 text-md text-indigo-500 cursor-pointer' >Forgot password?</p>

        <button type='submit' className='w-full bg-amber-50 py-2.5 h-12 rounded-full 
        bg-gradient-to-r from-indigo-500 to-indigo-900 text-white text-xl 
        font-medium cursor-pointer'>{state}</button>
        
      </form>
        {state === 'Sign Up' ? (<p className='text-gray-400 text-center text-sm mt-4'>Already have an account?{' '}
          <span onClick={()=>setState('Login')} className='underline text-blue-400 cursor-pointer'>
            Login here</span>
        </p>):(<p className='text-gray-400 text-center text-sm mt-4'>
          Don't have an account?{' '}
          <span onClick={()=> setState('Sign Up')} className='underline text-blue-400 cursor-pointer'>
            Sign Up</span>
        </p>)}



        
      </div>
    </div>
  )
}

export default Login
