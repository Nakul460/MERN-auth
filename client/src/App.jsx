import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify';


const App = () => {
  return (
    <div>
        <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Verify-email' element={<Verify/>}/>
      </Routes>
    </div>
  )
}

export default App
