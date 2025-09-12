import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// ✅ Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Verify = lazy(() => import('./pages/Verify'))
const Reset = lazy(() => import('./pages/Reset'))

const App = () => {
  return (
    <div>
      <ToastContainer />

      {/* ✅ Suspense handles loading UI */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/Reset" element={<Reset />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
Z