const express = require('express');
const { addProduct, singleProduct, removeProduct, listProduct } = require('../controllers/productController');
const upload = require('../middleware/multer');
const adminAuth = require('../middleware/adminAuth');





const productRouter = express.Router();

productRouter.post("/add", adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct )

productRouter.post('/remove',adminAuth,removeProduct )

productRouter.post("/single",singleProduct)

productRouter.get("/list",listProduct )


module.exports = productRouter