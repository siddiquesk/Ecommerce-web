import React from 'react'

function NewsLetterBox() {
  const SubmitHandler = (event) => {
    event.preventDefault();
  }
  return (
    <>
      <div className='text-center '>
        <p className='text-2xl font-medium text-gray-700'>Subscribe Now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, odit.
        </p>
        <form onSubmit={SubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-150 pl-3'>
          <input type='email' placeholder='Enter your Email' className='w-full sm:flex-1 outline-none' required />
          <button type='submit' className='bg-black cursor-pointer text-white p-4 text-xs uppercase'>Subscribe</button>
        </form>
      </div>
    </>
  )
}

export default NewsLetterBox