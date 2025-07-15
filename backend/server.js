const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const ConnectDb = require('./config/MongoDb');
const connectCloudinary = require('./config/Cloudinary');
const userRoute = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const cors = require('cors');
const { cartRoute } = require('./routes/cartRoute');
const OrdersRoute = require('./routes/orderRoute');


// Allow all origins
app.use(cors());

Port = process.env.PORT || 4000

ConnectDb()
connectCloudinary()


app.use("/api/user",userRoute)
app.use('/api/product',productRouter)
app.use("/api/cart",cartRoute)
app.use('/api/order',OrdersRoute)
app.get("/",(req,res)=>{
    res.status(200).send("Api Working")
})


app.listen(Port,()=>{
    console.log(`This server is Running on ${Port}`)
})