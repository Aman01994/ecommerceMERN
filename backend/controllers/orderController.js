const orderModel = require("../models/orderModel")
const razorpay = require("razorpay")
const UserModel = require("../models/UserModel")

// global variable 
const currency = "inr"
const deliveryCharge = 10

// gateway initialize 
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})



// Placing order using COD Method
const placeOrder = async (req,res)=>{
    try {
        const { items, amount, address} = req.body
         const userId = req.user.id; // ✅ from token, not body
         
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

   
        const newOrder = await new orderModel(orderData)
        await newOrder.save()
        await orderModel.findByIdAndUpdate(userId,{cartData :{}})
        res.status(200).json({ success:true, message:"Order Placed Successfully", order:newOrder
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error:error.message})
    }
}

// Placing orders using Stripe Method ||  Stripe not offering their services in india so can't use stripe 
const palceOrderStripe = async (req,res) => {

}
// https://www.youtube.com/watch?v=7E6um7NGmeE&t=46063s if you want the referance of the code use this youtube link
// start from 12:46:55
// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        const { items, amount, address} = req.body
        const userId = req.user.id;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "Razorpay",
            payment: "false",
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount : amount * 100,
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message : error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error:error.message})
    }
}


const verifyRazorpay = async (req,res)=>{
    try {
        const {razorpay_order_id} = req.body 
        const userId = req.user.id;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo)
        if(orderInfo.status === "paid"){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await UserModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message : "Payment Successful"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ALL Orders data for Admin Panel 
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.status(200).json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error:error.message})  
    }
}

// User Order Data for Frontend
const userOrders = async (req,res) => {
    const userId = req.user.id;
    try {
     const userOrders = await orderModel.find({ userId }).sort({ date: -1 });
     res.status(200).json({success:true, orders: userOrders})
 } catch (error) {
    console.log(error);
     res.status(500).json({success:false, error:error.message} )
 }
}

// update order status
const updateStatus = async (req,res) => {
    try {
        const { orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.status(200).json({success:true, message:"Order Status Updated Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, error:error.message})
    }
}

module.exports = {verifyRazorpay, placeOrder, palceOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}