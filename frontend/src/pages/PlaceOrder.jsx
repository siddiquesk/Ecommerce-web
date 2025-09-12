import React, { useState, useContext } from 'react'
import Title from "../component/Title"
import CartSummary from '../component/CartSummary'
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets'

function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);
  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300'>
        {/* Left section */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl my-3 sm:text-2xl'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
            <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
            <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
          <div className='flex gap-3'>
            <input type="email" placeholder='Email Address' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
          <div className='flex gap-3'>
            <input type="text" placeholder='Street' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
          <div className='flex gap-3'>
            <input type="text" placeholder='City' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
            <input type="text" placeholder='State' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
          <div className='flex gap-3'>
            <input type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
            <input type="text" placeholder='Country' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
          <div className='flex gap-3'>
            <input type="tel" placeholder='Phone' className='border border-gray-300 rounded py-2 px-3 w-full outline-gray-200' />
          </div>
        </div>

        {/* Right side section */}
        <div className='mt-8 w-full sm:w-auto'>
          <div className='mt-8 min-w-80'>
            <CartSummary />
          </div>
          <div className='mt-10 text-left'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex flex-col sm:flex-row gap-3 mt-4'>
              {/* Stripe option */}
              <div
                onClick={() => setPaymentMethod('stripe')}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === 'stripe' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                  }`}>
                  {paymentMethod === 'stripe' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img src={assets.stripe_logo} alt="stripe" className='h-5' />
              </div>

              {/* Razorpay option */}
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === 'razorpay' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                  }`}>
                  {paymentMethod === 'razorpay' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img src={assets.razorpay_logo} alt="razorpay" className='h-5' />
              </div>

              {/* COD option */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-gray-400'
                  }`}>
                  {paymentMethod === 'cod' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className='text-gray-700 font-medium text-sm'>CASH ON DELIVERY</span>
              </div>
            </div>
          </div>
          {/*buutons */}
          <div className='w-full text-end mt-6'>
            <button className='bg-gray-900 w-full  text-white px-10 py-3 rounded-sm cursor-pointer active:bg-black transition-colors duration-400 w-full md:w-auto' onClick={() => navigate('/orders')}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrder