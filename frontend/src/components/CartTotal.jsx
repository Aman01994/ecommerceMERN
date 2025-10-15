import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

export default function CartTotal() {

    const {getCartAmount ,deliveryFee , currency} = useContext(ShopContext)
  return (
    
            <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-inter">CART TOTAL</h2>
                <div className="flex flex-col gap-3 text-sm font-inter">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-800">{currency}{getCartAmount()}.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shipping fee</span>
                        <span className="font-medium text-gray-800">{currency}{getCartAmount() === 0 ? 0 : deliveryFee}.00</span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between items-center text-base">
                        <span className="text-black font-semibold">Total</span>
                        <span className="text-black font-semibold">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</span>
                    </div>
                </div>
            </div>
  )
}
