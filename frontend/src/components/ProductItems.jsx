import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

export default function ProductItems({id,image,name,price}) {
  
    const {currency}  = useContext(ShopContext) 
    
    console.log(currency)
  
  
    return (
        <Link
            className="block bg-white border border-[#F2F2F2] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#C778DD] p-1"
            to={`/product/${id}`}
        >
            <div className="overflow-hidden aspect-square bg-[#FAFAFA] flex items-center justify-center mb-2">
                <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-105 group-hover:shadow-md"
                    src={image[0]}
                    alt=""
                />
            </div>
            <p className="pt-2 pb-1 text-sm font-medium text-gray-700 truncate">{name}</p>
            <p className="text-sm font-semibold text-[#C778DD]">{currency}{price}</p>
        </Link>
  )
}
