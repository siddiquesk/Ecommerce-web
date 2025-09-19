import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { ShopContext } from "../context/shopContext";
import axios from "axios";


function Orders() {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrderData = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderData.push(item)
          })
        })
        setOrderData(allOrderData.reverse());
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token])
  return (
    <>
      <div className="border-t border-gray-300 pt-8 md:pt-16">
        <div className="text-xl md:text-2xl px-4 md:px-0">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="mt-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 px-4 md:px-0 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6"
            >
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-sm w-full md:w-auto">
                <img
                  src={item.image[0]}
                  className="w-24 h-24 sm:w-24 sm:h-24 object-cover"
                  alt={item.name}
                />

                <div className="flex-1">
                  <p className="text-base font-medium mb-1 sm:mb-0">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">
                      {currency} {item.price}
                    </p>
                    <span className="hidden sm:inline">•</span>
                    <p>Quantity: {item.quantity}</p>
                    <span className="hidden sm:inline">•</span>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2 sm:mt-1">
                    Date:{" "}
                    <span className="text-slate-500 ml-1">{new Date(item.date).toDateString()}</span>
                  </p>

                  <p className="mt-2 sm:mt-1">
                    Payment:{" "}
                    <span className="text-slate-500 ml-1">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end lg:items-center justify-between gap-4 w-full md:w-auto">
                <div className="flex items-center lg:mr-[20rem] gap-2">
                  <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                <button onClick={loadOrderData} className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors self-start md:self-auto">
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
