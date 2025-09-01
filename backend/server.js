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
const client = require('prom-client')

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


// To collect the metrics 

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({register : client.register})

app.get("/metrics",async(req,res)=>{
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics()
    res.send(metrics)
})


app.listen(Port,()=>{
    console.log(`This server is Running on ${Port}`)
})