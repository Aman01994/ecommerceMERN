import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'

export default function BestSeller() {

    const {products} = useContext(ShopContext);
    const [bestSeller , setBestSeller ] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item) => item.bastSeller); // little spelling mistake 
        setBestSeller(bestProduct.slice(0,5));
        console.log("bestProduct",bestProduct)
    },[products])

    return (
        <div className="my-10">
            <div className="text-center py-8">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className="w-full max-w-xl mx-auto text-base text-[#6B6B6B] mt-2 mb-4">Our most-loved pieces, chosen by you.</p>
            </div>
            {/* Product Grid with accent background */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-[#F7F6F3] p-4 rounded-none">
                {bestSeller.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
                    >
                        <ProductItems id={item._id} image={item.image} name={item.name} price={item.price} />
                        {/* Add-to-cart button overlay (optional, if not in ProductItems) */}
                        {/* <button className="absolute bottom-3 right-3 bg-[#2E2E2E] text-white px-4 py-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add to Cart</button> */}
                    </div>
                ))}
            </div>
        </div>
    )
}
