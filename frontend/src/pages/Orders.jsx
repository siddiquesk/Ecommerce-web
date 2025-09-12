import React, { useContext } from "react";
import Title from "../component/Title";
import { ShopContext } from "../context/shopContext";

function Orders() {
  const { products, currecncy } = useContext(ShopContext);

  return (
    <>
      <div className="border-t border-gray-300 pt-8 md:pt-16">
        <div className="text-xl md:text-2xl px-4 md:px-0">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="mt-6">
          {products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="py-4 px-4 md:px-0 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6"
            >
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 text-sm w-full md:w-auto">
                <img
                  src={item.image[0]}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                  alt={item.name}
                />

                <div className="flex-1">
                  <p className="text-base font-medium mb-2 sm:mb-0">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currecncy} {item.price}
                    </p>
                    <span className="hidden sm:inline">•</span>
                    <p>Quantity: 1</p>
                    <span className="hidden sm:inline">•</span>
                    <p>Size: M</p>
                  </div>

                  <p className="mt-2 sm:mt-1">
                    Date:{" "}
                    <span className="text-gray-400 ml-1">25,Jul,2024</span>
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end lg:items-center justify-between gap-4 w-full md:w-auto">
                <div className="flex items-center lg:mr-[20rem] gap-2">
                  <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>

                <button className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors self-start md:self-auto">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
