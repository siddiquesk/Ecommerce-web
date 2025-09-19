import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
//import razorpay from 'razorpay'
import dotenv from "dotenv";

dotenv.config();

//getway initilize here
const stripe = new Stripe(process.env.STRIPE_KEY);
console.log(process.env.STRIPE_KEY);
const currency = "inr";
const deliveryCharge = 10;


//razorpay config
// const razorpayinstance = new razorpay({
//   key_id:process.env.razorpay_secret,
//   key_secret:process.env.razorpay_secret,
// })

//placing order using cod method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//placing order using stripe  method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    const lineItem = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    lineItem.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount:deliveryCharge,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: lineItem, // 👈 correct spelling
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const verifyStripe =async(req,res)=>{
  try{
    const {orderId,success,userId}=req.body;
     if(success === "true"){
      await Order.findByIdAndUpdate(orderId,{payment:true});
      await User.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true,})
     }else{
      await Order.findByIdAndDelete(orderId);
      res.json({success:false});
     }
  }catch(err){
    res.json({ success: false, message: err.message });
  }
}

//placing order using razorpay  method
const placeOrderrazorpay = async (req, res) => {
  // try{
  //   const { userId, items, amount, address } = req.body;
  //   const { origin } = req.headers;
  //   const orderData = {
  //     userId,
  //     items,
  //     address,
  //     amount,
  //     paymentMethod: "Razorpay",
  //     payment: false,
  //     date: Date.now(),
  //   };
  //   const newOrder = new Order(orderData);
  //   await newOrder.save();
  //   const options={
  //     amount:amount*100,
  //     currency:currency.toUpperCase(),
  //     reciept:newOrder._id.toString(),
  //   }
  //   await razorpayinstance.orders.create(options,(error,order)=>{
  //     if(err){
  //       console.log(err);
  //       return res.json({success:false,message:err});
  //     }
  //     res.json({success:true,})
  //   })
  // }catch(err){
  //   res.json({ success: false, message: err.message });
  // }
};

const verifyRazorpay =async(req,res)=>{
  // try{
  //  const {userId,razorpay_order_id}=req.body;
  //  const orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id);
  //  console.log(orderInfo);
  //  if(orderInfo.status === 'paid'){
  //   await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
  //   await User.findByIdAndUpdate(userId,{cartData:{}});
  //   res.json({success:true,message:'Payment Successfull'})
  //  }else{
  //   res.json({ success: false, message: 'Payment Failed' });
  //  }
  // }catch(err){
  //  res.json({ success: false, message: err.message });
  // }
}

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//User Oreder data frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//Upadte Oreder status for admin panel
const upadteStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Satus Updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderrazorpay,
  allOrders,
  upadteStatus,
  userOrders,
  verifyStripe,
  verifyRazorpay,
};
