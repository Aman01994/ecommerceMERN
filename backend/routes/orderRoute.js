const express= require('express')
const { placeOrder, allOrders, updateStatus, placeOrderRazorpay, palceOrderStripe, userOrders, verifyRazorpay } = require('../controllers/orderController')
const adminAuth = require('../middleware/adminAuth')
const { auth } = require('../middleware/auth')
const OrdersRoute = express.Router()

// Admin Features
OrdersRoute.post("/list",adminAuth,allOrders)
OrdersRoute.post("/status",adminAuth,updateStatus)

// Payment Features 
OrdersRoute.post("/place", auth ,placeOrder)
OrdersRoute.post("/stripe", auth ,palceOrderStripe)
OrdersRoute.post("/razor", auth ,placeOrderRazorpay)
OrdersRoute.post("/verifyrazorpay", auth ,verifyRazorpay)



// User Features

OrdersRoute.post('/userorders',auth,userOrders)


module.exports = OrdersRoute