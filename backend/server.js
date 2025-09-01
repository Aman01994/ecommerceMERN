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
const responseTime = require("response-time")
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

// collectDefaultMetrics({register : client.register})
if (!global._prometheusMetricsRegistered) {
    client.collectDefaultMetrics();
    global._prometheusMetricsRegistered = true;
}

app.get("/metrics",async(req,res)=>{
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics()
    res.send(metrics)
})
//  Custom Metrics Request & Response time 

// response-time <--- this is the package you need to install 

// The 'response-time' middleware measures how long each request takes to process.
// It adds an 'X-Response-Time' header to the HTTP response (e.g., "123.4ms")
// and can also be used to log or monitor server performance.

// const reqResTime = new client.Histogram({
//     name:"http_foreverClothes_req_res_time",
//     help: "This tells how much time taken by req and res",
//     labelNames: ["method","route","status_code"],
//     buckets:[0.001, 0.05, 0.1, 0.2, 0.4, 0.5, 0.8, 1, 2]
// })

// app.use(response-time((req,res,time)=>{
//     reqResTime.labels({
//         method :req.method,
//         route: req.url,
//         status_code: res.statusCode
//     }).observe(time / 1000);
// }))

const reqResTime = new client.Histogram({
    name: "http_foreverClothes_req_res_time",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.001, 0.05, 0.1, 0.2, 0.4, 0.5, 0.8, 1, 2]
});

const totalReqCount = new client.Counter({
    name: "total_req",
    help: "Tells total req"
})


app.use(responseTime((req, res, time) => {
    totalReqCount.inc()
    // Get normalized route path to avoid high cardinality
    // If route is not available (e.g., 404), fallback to req.path but avoid full query strings
    const route = req.route && req.route.path 
        ? req.baseUrl + req.route.path 
        : req.baseUrl || req.path.split("?")[0];

    reqResTime.labels({
        method: req.method,
        route: route || "unknown_route",
        status_code: res.statusCode
    }).observe(time / 1000); // convert ms → s
}));

app.listen(Port,()=>{
    console.log(`This server is Running on ${Port}`)
})