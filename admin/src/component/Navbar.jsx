import React from 'react'
import {assets} from "../assets/assets"
function Navbar({ setToken }) {
  return (
   <>
   <div className='flex items-center py-2 px-[4%] justify-between'>
    <img src={assets.logo} alt="logo admin" className='max-w-[25%] max-h-[90px] md:max-w-[18%] lg:max-w-[10%] lg:max-h-[80px]'/>
        <button onClick={() => setToken('')} className='bg-gray-600 text-white px-4 py-2 sm:px-5 sm:font-semibold lg:py-2 md:py-3 md:px-4 md:text-[18px] md:font-semibold sm:py-2 rounded-full lg:text-base text-sm sm:text-xs hover:bg-gray-800 cursor-pointer'>Logout</button>
   </div>
   </>
  )
}

export default Navbar
