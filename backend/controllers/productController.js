const ProductModel = require('../models/ProductModel');


const cloudinary = require('cloudinary').v2;
// Function for add product 
const addProduct = async(req,res)=>{
    try {
        const {name, description ,price , category, subCategory, size, bastSeller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        const imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type : "image"})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price : Number(price),
            subCategory,
            bastSeller : bastSeller === "true" ? true : false,
            size : JSON.parse(size),
            image: imageUrl,
            date : Date.now()
         }
        
        
        const product = new ProductModel(productData);
        await product.save()
        
        res.json({success: true,message : "Product added"})
        
        
        // console.log(name, description ,price , category, subCategory, size, bastSeller)
        console.log(product)
        



    } catch (error) {
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

// Function for list product 
const listProduct = async(req,res)=>{
    try {
        const product = await ProductModel.find({})
        res.json({success: true, product })
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}

// function for removing product 
const removeProduct = async(req,res)=>{
    try {
        await ProductModel.findOneAndDelete({_id:req.body.id})
        res.json({success: true , message : "Product Removed"})
    } catch (error) {
          console.log(error)
        res.json({success : false , message : error.message})
    }
}

// function for single product info 
const singleProduct = async(req,res)=>{
    try {
        const { productId } = req.body
        const product = await ProductModel.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}


module.exports = {
    addProduct , 
    listProduct , 
    removeProduct , 
    singleProduct 
}
    