import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from './../context/shopContext';
import { assets } from '../assets/assets';
import Title from './../component/Title';
import ProductItem from './../component/ProductItem';

function Collection() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const { products, serach, showSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');


  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && serach) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(serach.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    setFilterProduct(productsCopy);
  }

  useEffect(() => {
    setFilterProduct(products);
  }, [])

  useEffect(() => {
    applyFilter();
    console.log("category ", category);
  }, [category, serach, showSearch])

  const sortProduct = () => {
    let fpyCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fpyCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProduct(fpyCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 pt-10 border-t border-gray-100'>

        {/*filter options */}
        <div className='flex flex-col'>
          <div className='min-w-60 max-w-60'>
            <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
              <img onClick={() => setShowFilter(!showFilter)} src={assets.dropdown_icon} alt="dropdown" className={`h-3  text-gray-800 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
            </p>
            {/* */}
            <div className={`border border-gray-300 pl-5 sm:block py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Men'} onChange={togglecategory} />Men
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Women'} onChange={togglecategory} />Women
                </p>
                <p className='flex gap-2'>
                  <input type="checkbox" className='w-3' value={'Kids'} onChange={togglecategory} />Kids
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*right side div */}
        <div className='flex flex-col md:flex-1 m-10'>
          <div className='mt-4 md:mt-0 lg:flex-row flex-col md:flex justify-between  items-center text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/*product salt */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 outline-none border-gray-200 text-sm px-2 py-3'>
              <option value="relavent">Sort By:Relevent</option>
              <option value="low-high">Sort By:Low to High</option>
              <option value="high-low">Sort By:High to Low</option>
            </select>
          </div>
          {/*map products*/}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-5'>
            {filterProduct.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection