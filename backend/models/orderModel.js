const { default: mongoose } = require("mongoose");



const orderSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    items: {type : Array , required:true},
    amount:{type: Number, required:true},
    address: {type: Object, required:true},
    status:{type: String, requird:true, default: "Order Placed"},
    paymentMethod : {type: String, required:true , defaultL:"COD"},
    payment : {type: Boolean, default:false , required:true},
    date: {type: Number, required:true}
    
})


const orderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

module.exports = orderModel;
