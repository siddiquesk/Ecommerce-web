import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderrazorpay,
  allOrders,
  upadteStatus,
  userOrders,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authCart from '../middleware/authCart.js';

const orderRouter = express.Router();

//admin faeture to change it
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,upadteStatus);

//payment feature here
orderRouter.post('/place',authCart,placeOrder);
orderRouter.post('/stripe',authCart,placeOrderStripe);
orderRouter.post('/razorpay',authCart,placeOrderrazorpay);
//verify stripe
orderRouter.post('/verifyStripe',authCart,verifyStripe);
orderRouter.post('/verifyRazorpay',authCart,verifyRazorpay);
//User Feature
orderRouter.post('/userorders',authCart,userOrders);



export default orderRouter;
