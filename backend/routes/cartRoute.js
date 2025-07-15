const express = require('express');
const { addToCart, upDateCart, getUserCart } = require('../controllers/cartController');
const { auth } = require('../middleware/auth');



const cartRoute = express.Router();

cartRoute.post("/add",auth ,addToCart)

cartRoute.post("/update",auth ,upDateCart)

cartRoute.post("/get",auth ,getUserCart)


module.exports = {cartRoute}