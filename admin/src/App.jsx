import React, { useState } from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './component/Login'


export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token, setToken] = useState('');
  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        {
          token === "" ? <Login setToken={setToken} /> :
            <>

              <Navbar />
              <hr className='text-gray-300 mt-1 block' />
              <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-base text-gray-600'>
                  <Routes>
                    <Route path='/add' element={<Add />} />
                    <Route path='/list' element={<List />} />
                    <Route path='/orders' element={<Orders />} />
                  </Routes>

                </div>
              </div>
            </>}
      </div>
   
    </>
  )
}

export default App

