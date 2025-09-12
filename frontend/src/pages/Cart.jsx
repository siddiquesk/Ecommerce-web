import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext';
import Title from '../component/Title';
import { assets } from '../assets/assets';
import CartSummary from '../component/CartSummary';

function Cart() {
  const { products, currency, cartItem, updatedCartQuantity, GetCartTotal,
    delivery_fee, } = useContext(ShopContext);
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        {cartdata.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Start shopping to add items to your cart</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {cartdata.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div key={index} className="p-4 md:p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Product Image */}
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-full sm:w-20 h-20 object-cover rounded"
                    />

                    {/* Product Details */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <p className="text-sm sm:text-base font-medium text-gray-800">{productData.name}</p>
                        <p className="text-sm sm:text-base font-medium text-gray-800 mt-1 sm:mt-0">{currency}{productData.price}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between mt-3 gap-2">
                        {/* Size */}
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          Size: {item.size}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button
                              className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              onClick={() => updatedCartQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updatedCartQuantity(item._id, item.size, parseInt(e.target.value) || 1)}
                              className="w-10 text-center border-x border-gray-300 py-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              onClick={() => updatedCartQuantity(item._id, item.size, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => updatedCartQuantity(item._id, item.size, 0)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <img src={assets.bin_icon} alt="Remove" className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Item Total:</span>
                        <span className="text-base font-medium text-gray-800">
                          {currency}{(productData.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Cart Summary */}
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart