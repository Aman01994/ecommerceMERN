import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const {  navigate , backendUrl, token , cartItems , deliveryFee, products , getCartAmount, setCartItems} = useContext(ShopContext)
  const [method ,setMethod ] = useState('cod')
  const [formData , setFormData] = useState({
    firstname : "",
    lastname : "",
    email : "",
    street: "",
    city : "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data=>({...data,[name]: value}))
  }


  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : "Order Payment",
      description : "Order Payment",
      order_id: order.id,
      receipt : order.receipt,
      handler : async (response)=>{
        console.log(response)
        try {
          const {data} = await axios.post(`${backendUrl}/api/order/verifyrazorpay`,response,{headers:{token}})
          if(data.success){
            console.log("Payemnt Verification")
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const razorp = new window.Razorpay(options)
    razorp.open()
  }


  // Fetch the data of cartItems  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];
    try {
        for(const items in cartItems){
            for(const item in cartItems[items]){
              if(cartItems[items][item] > 0){
                const productInfo  = products.find((product)=>product._id === items)
                const itemInfo = structuredClone(productInfo);
                if(itemInfo){
                  itemInfo.size = item;
                  itemInfo.quantity = cartItems[items][item];
                  orderItems.push(itemInfo)
                  console.log("orderItems",orderItems)
                }
              }
            }
        }


        let orderData = {
          address: formData,
          items : orderItems,
          amount : await getCartAmount() + deliveryFee
        }


        switch(method){
          case "cod":
            const response = await axios.post(`${backendUrl}/api/order/place`,orderData,{headers:{token}})
            console.log("response--------->>>>>",response)
            if(response.data.success){
              toast.success("Order placed successfully")
              setCartItems({})
              navigate('/orders')
            }else{
              toast.error(response.data.message)
              console.log("Error in placing order:", response.data.message)
            }
            break;
          
          case "razorpay":
            const resposneRazorpay = await axios.post(`${backendUrl}/api/order/razor`,orderData,{headers:{token}})
            if(resposneRazorpay.data.success){
                console.log(resposneRazorpay.data)
                initPay(resposneRazorpay.data.order)
            }
          break 
        }
    } catch (error) {
      console.error("Error in onSubmitHandler:", error);
    }
    
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* leftSide  */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-2'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          </div>
          <div className='flex gap-3'>
            <input  onChange={onChangeHandler} name='firstname' required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
            <input onChange={onChangeHandler} name='lastname'required className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='Last name' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='email' required className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="email" placeholder='Email address' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='street' required className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Street'/>
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='city' required type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full'placeholder='City' />
            <input onChange={onChangeHandler} name='state' required type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full ' placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='zipcode' required type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Zip code'/>
            <input onChange={onChangeHandler} name='country' required type="text" className='border border-grap-300 rounded px-3.5 py-1.5 w-full' placeholder='Counrty' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='phone' required type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'/>
          </div>
      </div>
      {/* right side  */}
      <div className='mt-8'>
        <div className=' mt- 8 min-w-80'>
        <CartTotal />

        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          {/* Payment Method Selection  */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* The stripe is not offering services in india so remove the functionaly stripe and replaced with faded one */}
              {/* <div onClick={()=>{setMethod('stripe')}} className='flex items-center gap-3 border  p-2 cursor-pointer '>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-500" : ""}`}></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div> */}

              <div className='flex items-center gap-3 border  p-2 cursor-pointer opacity-40 '>
                  <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div>

              <div onClick={()=>{setMethod('razorpay')}} className='flex items-center gap-3 border p-2 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
              </div>

              <div onClick={()=>{setMethod("cod")}} className='flex gap-3 lg:flex-row items-center border cursor-pointer p-2'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500": ""}`}></p>
                <p className='font-medium text-gray-500 text-sm mx-4'>CASH ON DELIVERY</p>
              </div>
          </div>
                <div className='w-full text-end mt-8'>
                  <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                  {/* <button type='submit' className='bg-black text-white px-16 py-3 text-sm' >PLACE ORDER</button> */}
                </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder