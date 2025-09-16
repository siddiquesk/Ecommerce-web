import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';
function List({ token }) {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchData();
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <p className='mb-2 text-gray-700'>All Product List</p>
      <div className='flex flex-col gap-3'>
        {/*all product lists*/}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm'>
          <b>Image1</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/*product lists*/}
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm '>
              <img src={item.image[0]} alt="image1" className='w-12' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p className='text-right text-xl md:text-center cursor-pointer' onClick={() => removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default List
