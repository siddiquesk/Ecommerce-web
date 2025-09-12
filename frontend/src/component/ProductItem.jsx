import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <>
      <Link to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img src={image[0]} alt={name} className='hover:scale-110  rounded-[2px] transition ease-in-out duration-300' />
          <p className='pt-3 pb-1 text-sm'>{name}</p>
          <p>{currency}{price}</p>
        </div>
      </Link>
    </>
  )
}

export default ProductItem