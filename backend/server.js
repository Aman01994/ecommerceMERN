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
const allowedOrigins = ['https://www.foreverclothes.xyz', 'https://ecommerceadminpanel-jet.vercel.app/'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


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