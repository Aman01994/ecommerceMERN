const jwt = require('jsonwebtoken')


const auth = async(req,res,next)=>{
    const {token} = req.headers
    if(!token){
        res.json({success:false, message: "Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token_decode)
        req.user = { id: token_decode.id };
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}


module.exports = {auth}