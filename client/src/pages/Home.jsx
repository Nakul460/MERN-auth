import React,{ useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { AppContent } from '../context/AppContext'

const Home = () => {
  const {loading,setLoading} = useContext(AppContent)

  return (
    <div className='min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center '>
      {loading && 
      <div className='flex justify-center items-center h-screen absolute w-screen'>
        <div className='w-22 h-22 rounded-full border-8 border-blue-500 border-t-transparent z-10 animate-spin'></div>
        </div>}
     <div className={loading ? "blur-sm" : ""}>
      <Navbar />
      <Header />
      </div>
    </div>
    
  )
}

export default Home
