import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
function Orders({ token }) {
  const [order, setOrder] = useState([]);
  //Suf!Y@n#2025Xy ->my passwword
  const fetchAllOrder = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrder(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrder();
      }
    } catch (err) {
      console.log(err);
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchAllOrder();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          order.map((myorder, index) => (
            <div key={index} className='grid my-2 lg:my-4 grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 text-sm text-gray-600'>
              <img src={assets.parcel_icon} alt="admin" className='w-14' />
              <div>
                <div className=''>
                  {myorder.items.map((item, index) => {
                    if (index === myorder.length - 1) {
                      return <p className='py-1 px-1 font-semibold' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    } else {
                      return <p className='py-1 px-1' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    }
                  })}
                </div>
                <p className='py-1 px-1 font-bold'>{myorder.address.firstName + " " + myorder.address.lastName}</p>
                <div>
                  <p className='py-1 px-1'>{myorder.address.street + ","}</p>
                  <p className='py-1 px-1'>{myorder.address.city + "," + myorder.address.state + " " + myorder.address.country + " " + myorder.address.zipcode}</p>
                </div>
                <p className='py-1 px-1'>{myorder.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-md'>Items : {myorder.items.length}</p>
                <p className='mt-3 mb-1'>Method : {myorder.paymentMethod}</p>
                <p className='mb-1'>Payment : {myorder.payment ? "Done" : "Pending"}</p>
                <p className='mb-1'>Date : {new Date(myorder.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-md font-semibold ml-4'>{currency}{myorder.amount}</p>
              <select onChange={(e) => statusHandler(e, myorder._id)} className='p-3 font-semibold cursor-pointer' value={myorder.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
