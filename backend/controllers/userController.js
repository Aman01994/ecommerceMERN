const UserModel = require("../models/UserModel")
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body;

        const userExists = await UserModel.findOne({email})
        console.log(userExists)
        
        if(!userExists){
        return  res.status(404).json({success:false , message : "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password, userExists.password)
        if(isMatch){
            const token = createToken(userExists._id)
            return res.json({success : true, token})
        }else{
            res.status(400).json({success:false, message : "Invalid Credentials"}) 
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
    
}

const registerUser = async(req,res)=>{
    try {
        const { name , email , password } = req.body

        // Checking if the user already email exist 
        const exists = await UserModel.findOne({email})
        if(exists){
           return res.status(409).json({success: false, message : "Emaiid already exists"})
        }

        // validation of email & strong password 

        if(!validator.isEmail(email)){
           return res.status(400).json({success:false , message : "Please enter a valid email"})
        }
        if(password.length < 8){
          return  res.status(400).json({success:false, message : "Please enter a strong password"})
        }
        // Hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const newUser = new UserModel({ name , email, password : hashedPass})
        
        
        const user =  await newUser.save()
        
        const token = createToken(user._id)
        res.status(200).json({ success: true , token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    } 
}

const adminLogin = async(req,res)=>{
    try {
        const {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false , message : "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false , message : error})
    }
}

module.exports = {loginUser , registerUser , adminLogin}