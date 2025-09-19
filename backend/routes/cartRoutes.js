import express from 'express'
import {addTocart,getUsercart,updateTocart} from '../controllers/cartController.js'
import authCart from '../middleware/authCart.js';
const cartRouter = express.Router();

cartRouter.post('/get', authCart,getUsercart);
cartRouter.post('/add', authCart,addTocart);
cartRouter.post('/update', authCart,updateTocart);

export default cartRouter;