import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import { ShopContext } from '../context/shopContext';
function CartSummary() {
  const { navigate, GetCartTotal, delivery_fee, currency } = useContext(ShopContext);

  return (
    <>
      <div className='w-full my-6'>
        <div className='text-2xl mb-2 text-center'>
          <Title text1={'CART'} text2={' TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm px-4 py-2'>
          <div className='flex justify-between'>
            <p>Subtotal </p>
            <p>{currency} {GetCartTotal()}.00</p>
          </div>
          <div className='flex justify-between'>
            <p>Shipping Fees</p>
            <p>{currency} {delivery_fee}.00</p>
          </div>
          <hr />
          <div className='flex justify-between px-2 text-xl mt-2'>
            <b>Total</b>
            <b>{currency} {GetCartTotal() === 0 ? 0 : GetCartTotal() + delivery_fee}.00</b>
          </div>
        </div>

        <div className='w-full h-10 mt-3 px-2'>
          <button className='w-full h-[100%] active:bg-blue-900 hover:bg-blue-800 transition-colors duration-500  ease-in cursor-pointer rounded-md bg-blue-600  text-white px-3 py-2 outline-none' onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </>
  )
}

export default CartSummary