import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [serach, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
         if(!size){
          toast.error('Select Product Size');
          return;
         }
     
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
  }

  const getCartCount =()=>{
    let totalCount=0;
    for(let items in cartItem){
      for(let item in cartItem[items]){
         try{
               if(cartItem[items][item] >0){
                totalCount +=cartItem[items][item];
               }
         }catch(err){
            console.log(err.message);
         }
      }
    }
    return totalCount;
  }

  const updatedCartQuantity=(itemId,size,quantity)=>{
     let cartData=structuredClone(cartItem);
     cartData[itemId][size]=quantity;
     setCartItem(cartData);
  }
  
  let GetCartTotal = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let iteminfo = products.find((pro) => pro._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += iteminfo.price * cartItem[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  }

  const value = {
    products,
    currency,
    delivery_fee,
    serach,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount,
    updatedCartQuantity,
    GetCartTotal,
    navigate,
  };


  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
