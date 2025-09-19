import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conncetDB from "./config/mongodb.js"
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js';
dotenv.config();

//App config
const app =express();
const PORT=process.env.PORT || 4000;
conncetDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));



//Api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
})