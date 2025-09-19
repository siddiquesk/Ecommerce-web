import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
//verify cart number {4000003560000008}

function VerifyStripe() {
  const {navigate,token,setCartItem,backendUrl} = useContext(ShopContext);
  const [searchParams,setSearchParams]=useSearchParams();

  const success =searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment =async()=>{
    try{
     if(!token){
      return null
     }
     const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{headers:{token}});
     console.log(response.data); 
     if(response.data.success){
      setCartItem({});
      navigate('/orders');
     }else{
      navigate('/cart');
     }
    }catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  useEffect(()=>{
  verifyPayment();
  },[token]);

  return (
    <>
    <div>
 
    </div>
    </>
  )
}

export default VerifyStripe
