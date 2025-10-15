import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RealtedProducts from '../components/RealtedProducts'

const Product = () => {


  const { productId } = useParams()
  const { products, currency ,addToCart ,cartItems } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')


  const fetchProductData = async () => {
    console.log("fetchProductData------- ---- ---",products)
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId])

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-white min-h-screen">
      {/* ProductData */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg shadow-sm transition-all duration-200 ${image === item ? 'border-2 border-[#C778DD]' : 'border border-transparent'} hover:scale-105 hover:shadow-md`}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex items-center justify-center">
            <img
              src={image}
              className="w-full h-auto rounded-lg shadow-md transition-all duration-300 ease-in-out product-main-image"
              alt=""
            />
          </div>
        </div>
        {/* Product Info  */}
        <div className="flex-1 mt-6 sm:mt-0">
          <h1 className="font-semibold text-2xl text-gray-800 font-inter mb-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" alt="" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" alt="" />
            <span className="pl-2 text-gray-500 text-sm">(122)</span>
          </div>
          <p className="mt-5 text-3xl font-bold text-black">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <span className="font-medium text-gray-700">Select Size</span>
            <div className="flex gap-2 flex-wrap">
              {productData.size.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 rounded-md border transition-all duration-200 font-medium text-sm ${item === size ? 'border-[#C778DD] bg-[#F7F0FA] text-[#C778DD]' : 'border-gray-200 bg-gray-100 text-gray-700'} hover:bg-[#F3F3F3]`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full sm:w-auto bg-black text-white px-8 py-3 font-medium rounded-lg hover:bg-gray-900 transition-all active:shadow-inner mt-2"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-200" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <span className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>100% Original Product</span>
            <span className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>Cash on delivery is available on this product</span>
            <span className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>Easy return and exchange policy within 7 days</span>
          </div>
        </div>
      </div>
      {/* Description and review */}
      <div className="mt-20">
        <div className="flex">
          <button className="border-b-2 border-[#C778DD] px-5 py-4 text-sm font-semibold text-[#C778DD] bg-white focus:outline-none">Description</button>
          <button className="border-b-2 border-transparent px-5 py-4 text-sm text-gray-700 bg-white hover:border-gray-300 transition-all">Reviews (122)</button>
        </div>
        <div className="flex flex-col gap-4 bg-white shadow-sm rounded-lg px-6 py-6 text-sm text-gray-500 leading-relaxed">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer. </p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      <RealtedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product