import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conncetDB from "./config/mongodb.js"
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
dotenv.config();

//App config
const app =express();
const PORT=process.env.PORT || 4000;
conncetDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


//Api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);




app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
})