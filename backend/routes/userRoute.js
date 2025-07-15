const express = require('express');
const { loginUser, registerUser, adminLogin } = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post("/register", registerUser )
userRoute.post("/login",loginUser)
userRoute.post("/admin",adminLogin )



module.exports = userRoute