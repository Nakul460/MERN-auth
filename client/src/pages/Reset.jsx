import React,{ useContext } from 'react'
import ResetComponent from '../components/ResetComponent'
import { AppContent } from '../context/AppContext'

const Reset = () => {
  const {loading,setLoading} = useContext(AppContent)

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 p-8 sm:p-8 ">

      {loading && <div className='absolute z-10'>
        <div className='w-22 h-22 rounded-full border-8 border-blue-500 border-t-transparent z-10 animate-spin'></div>
        </div>}
      
        <div className={loading ? "blur-xl" : ""}>
      <ResetComponent/>
      </div>
    </div>
    </div>
  )
}

export default Reset
