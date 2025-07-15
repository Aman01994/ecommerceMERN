import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const [method ,setMethod ] = useState('cod')
  const {navigate , backendUrl , token , cartItems, setCartItems, getCartAmount , delivery_fee, product} =useContext(ShopContext)

    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data =>({...data, [name]: value}));

    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = []

            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if(cartItems[items][item] > 0){
                        const itemInfo = structuredClone(product.find((product) => product.id === items));
                        if(itemInfo){
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }
            
            let orderData = {
                address : formData,
                items : orderItems,
                amount : getCartAmount() + delivery_fee,
            }

            switch (method) {
                // Api calls for COD
                case "cod":
                    const response = await axios.post(`${backendUrl}/api/orders/cod`,orderData,{headers:{token}})
                    if(response.data.success){
                        setCartItems({})
                        navigate('/orders')
                    }else{
                        toast.error(response.data.message || "Something went wrong")
                    }
                    break
            }


        } catch (error) {
            
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
            <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
            <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='Last name' />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="email" value={formData.email} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="email" placeholder='Email address' />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="street" value={formData.street} className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type='text' placeholder='Street'/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full'placeholder='City' />
            <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full ' placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="zipCode" value={formData.zipCode} type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Zip code'/>
            <input required onChange={onChangeHandler} name="Country" value={formData.country} type="text" className='border border-grap-300 rounded px-3.5 py-1.5 w-full' placeholder='Country' />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name="Phone" value={formData.phone} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'/>
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
              <div onClick={()=>{setMethod('stripe')}} className='flex items-center gap-3 border p-2 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-500" : ""}`}></p>
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
                  <button type='submit' className='bg-black text-white px-16 py-3 text-sm' onClick={()=>navigate('/orders')}>PLACE ORDER</button>
                </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder