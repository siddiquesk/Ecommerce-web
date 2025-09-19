import React, { useState, useContext } from "react";
import Title from "../component/Title";
import CartSummary from "../component/CartSummary";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    setCartItem,
    products,
    currency,
    delivery_fee,
    cartItem,
    getCartCount,
    updatedCartQuantity,
    GetCartTotal,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target; // ✅ correct
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const initPay = (order) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZOR_PAY,
  //     amount: order.amount,
  //     currency: order.currency,
  //     description: order.id,
  //     reciept: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);
  //       try {
  //         const { data } = await axios.post(
  //           backendUrl + "/api/order/verifyRazorpay",
  //           response,
  //           { headers: { token } }
  //         );
  //         if (data.success) {
  //           navigate('/orders');
  //           setCartItem({});
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         toast.error(err.message);
  //       }
  //     }
  //   }
  //   const rzp = new (window.Razorpay(options));
  //   rzp.open()
  // }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItem,
        amount: getCartCount() + delivery_fee,
      };
      switch (paymentMethod) {
        //api call
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          console.log(responseStripe);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        // case 'razorpay':
        //   const responseRazorpay = await axios.post(
        //     backendUrl + "/api/order/razorpay",
        //     orderData,
        //     { headers: { token } }
        //   );
        //   if (responseRazorpay.data.success) {
        //     initPay(responseRazorpay.data.order);

        //   } else {
        //     toast.error(responseStripe.data.message);
        //   }
        //   break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300">
        {/* Left section */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl my-3 sm:text-2xl">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Street"
              name="street"
              value={formData.street}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Zip Code"
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              className="border border-gray-300 rounded py-2 px-3 w-full outline-gray-200"
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* Right side section */}
        <div className="mt-8 w-full sm:w-auto">
          <div className="mt-8 min-w-80">
            <CartSummary />
          </div>
          <div className="mt-10 text-left">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {/* Stripe option */}
              <div
                onClick={() => setPaymentMethod("stripe")}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === "stripe"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
                  }`}>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "stripe"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400"
                    }`}>
                  {paymentMethod === "stripe" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img src={assets.stripe_logo} alt="stripe" className="h-5" />
              </div>

              {/* Razorpay option */}
              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === "razorpay"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
                  }`}>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "razorpay"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400"
                    }`}>
                  {paymentMethod === "razorpay" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img
                  src={assets.razorpay_logo}
                  alt="razorpay"
                  className="h-5"
                />
              </div>

              {/* COD option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer transition-colors flex-1 ${paymentMethod === "cod"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
                  }`}>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "cod"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400"
                    }`}>
                  {paymentMethod === "cod" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium text-sm">
                  CASH ON DELIVERY
                </span>
              </div>
            </div>
          </div>
          {/*buutons */}
          <div className="w-full text-end mt-6">
            <button
              type="submit"
              className="bg-gray-900 w-full  text-white px-10 py-3 rounded-sm cursor-pointer active:bg-black transition-colors duration-400  md:w-auto">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PlaceOrder;
