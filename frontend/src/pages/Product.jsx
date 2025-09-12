import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";

import RelatedProduct from "../component/RelatedProduct";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState('');
  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-6 lg:px-8">
      {/* product data */}
      <div className="flex flex-col lg:flex-row gap-8 my-6">
        {/* product images */}
        <div className="flex flex-col md:flex-row gap-5 w-full lg:w-1/2">
          {/* thumbnails - horizontal on mobile, vertical on medium+ */}
          <div className="flex md:flex-col gap-3 rounded-sm overflow-x-auto md:overflow-x-visible md:overflow-y-auto py-2 md:py-0">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt="thumbnail"
                className={`w-20 h-20 md:w-24 md:h-24 object-cover border rounded-sm cursor-pointer transition-all duration-200
                  ${image === item ? "border-blue-500 scale-105" : "border-gray-300 hover:border-gray-500"}`}
              />
            ))}
          </div>

          {/*----- main image ----- */}
          <div className="flex-1">
            <img
              src={image}
              alt="main-product"
              className="w-full h-auto max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh] rounded-lg object-contain md:object-cover shadow-md"
            />
          </div>
        </div>

        {/*--- product info ---*/}
        <div className="flex-1 lg:pl-8">
          <h1 className="font-medium text-xl sm:text-2xl mt-3 uppercase">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-4">
            <img src={assets.star_icon} alt="star rating" className="w-3 md:w-4" />
            <img src={assets.star_icon} alt="star rating" className="w-3 md:w-4" />
            <img src={assets.star_icon} alt="star rating" className="w-3 md:w-4" />
            <img src={assets.star_icon} alt="star rating" className="w-3 md:w-4" />
            <img src={assets.star_dull_icon} alt="star rating" className="w-3 md:w-4" />
            <p className="pl-2 text-sm md:text-base">(122)</p>
          </div>
          <p className="mt-4 font-medium text-2xl md:text-3xl">{currency}{productData.price}</p>
          <p className="mt-3 text-gray-600 text-sm md:text-base">{productData.description}</p>
          <div className="flex flex-col gap-4 my-6">
            <p className="text-base md:text-lg px-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border cursor-pointer border-gray-300 py-2 px-3 md:py-3 md:px-4 text-sm md:text-base ${item === size ? 'border-orange-600 bg-orange-50' : 'hover:bg-gray-50'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="mt-4 bg-gray-900 text-white px-6 py-3 rounded-sm cursor-pointer active:bg-black transition-colors duration-400 w-full md:w-auto" onClick={()=>addToCart(productData._id,size)}>
            Add To Cart
          </button>
          <hr className="w-full mt-8 border border-gray-200" />
          <div className="text-xs md:text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original</p>
            <p>Cash On Delivery available in 7 days</p>
            <p>Easy Return and Exchange Policy available</p>
          </div>
        </div>
      </div>

      {/* description and reviews section */}
      <div className="mt-12 md:mt-20">
        <div className="flex flex-col sm:flex-row gap-2">
          <p className="border border-gray-200 px-4 py-3 text-sm font-bold sm:flex-1 text-center">Description</p>
          <p className="border border-gray-200 px-4 py-3 text-sm sm:flex-1 text-center">Reviews (122)</p>
        </div>
        <div className="flex flex-col border gap-4 px-4 mt-3 py-4 text-sm text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fugit quod voluptatibus unde delectus. Et magni officiis eaque repellendus. Tempora.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quam architecto sequi error qui nisi earum voluptate, distinctio vitae aperiam delectus magnam!</p>
        </div>
      </div>

      {/* related product details map */}
      <RelatedProduct category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
