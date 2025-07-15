const jwt = require("jsonwebtoken");


const adminAuth = (req,res,next)=>{
    try {
        const {token} = req.headers
        // if(!token){
        //     return res.json({success:false, message : "Not Authorized Login Again"})
        // }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        console.log(tokenDecode)
        // next()
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.PASSWORD){
            return res.json({sucess:false, message : "Not Authorized Login Again"})
        }
        next()
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

module.exports = adminAuth