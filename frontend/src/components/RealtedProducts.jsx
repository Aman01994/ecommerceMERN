import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';


export default function RealtedProducts({category,subCategory}) {
    const {products} = useContext(ShopContext);
    const [related,setRealted] = useState([]);
    
    useEffect(()=>{
        if(products.length > 0){
            let productCopy = products.slice();

            productCopy = productCopy.filter(item => category  ===  item.category )
            productCopy = productCopy.filter(item => subCategory  === item.subCategory)

            console.log(productCopy.slice(0,5))
            setRealted(productCopy.slice(0,5))
        }

    },[products])

    return (
        <section className="my-24 px-2 md:px-0">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-inter tracking-wide inline-block">
                        Related <span className="relative text-black after:block after:h-1 after:bg-[#D6C7B9] after:w-3/4 after:mx-auto after:rounded-sm after:mt-1">Products</span>
                    </h2>
                </div>
                <div className="border-t border-[#F0F0F0] pt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
                        {related.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-md overflow-hidden group hover:-translate-y-1 hover:scale-[1.03] transition-transform"
                                style={{ minHeight: 0 }}
                            >
                                <ProductItems id={item._id} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
  )
}
