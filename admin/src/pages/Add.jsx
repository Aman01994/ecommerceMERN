import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { BACKEND_URL } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);
  
  const [productName,setProductName] = useState("") 
  const [productDescription,setProductDescription] = useState("")
  const [productCategory,setProductCategory] = useState("Men")
  const [subCategory , setSubCategory] = useState("Topwear")
  const [price,setPrice] = useState("") 
  const [bestseller , setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])


  useEffect(()=>{
    console.log(sizes)
  },[sizes])

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name",productName)
      formData.append("description",productDescription)
      formData.append("price",price)
      formData.append("category",productCategory)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("size",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      
      console.log(token)
      console.log(formData)

      // We have provided the token because the api need admin authentication this token is  admin token 
      const response = await axios.post(BACKEND_URL+ '/api/product/add',formData,{headers:{token}})
      console.log(response)
      if(response.data.success){
        toast.success(response.data.message)
        setProductName('')
        setProductDescription('')
        setPrice('')
        setBestSeller(false)
        setSizes([])

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1" className='cursor-pointer'>
            <img className='w-20' src={image1 ? URL.createObjectURL(image1) : assets.upload_area }  alt="" />
            <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
            {/* <input type="file" id="image1" hidden  /> */}
          </label>

          <label htmlFor="image2" className='cursor-pointer'>
            <img className='w-20' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
          </label>

          <label htmlFor="image3" className='cursor-pointer'>
            <img className='w-20' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input type="file" id='image3' hidden onChange={(e)=>{setImage3(e.target.files[0])}}/>
          </label>

          <label htmlFor="image4" className='cursor-pointer'>
            <img className='w-20' src={image4 ? URL.createObjectURL(image4) : assets.upload_area } alt="" />
            <input type="file" hidden  id='image4' onChange={(e)=>{setImage4(e.target.files[0])}}/>
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'> Product name</p>
        <input className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='type here' onChange={(e)=>setProductName(e.target.value)} value={productName} required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' onChange={(e)=>setProductDescription(e.target.value)} value={productDescription} required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>
        <div>
          <p className='mb-2'>Product category</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setProductCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select className='w-full px-3 py-2' onChange={(e)=>setSubCategory(e.target.value)}> 
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>


        <div>
          <p className='mb-2'>Product Price</p>
          <input className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' onChange={(e)=>setPrice(e.target.value)} value={price}/>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>  
        <div className='flex gap-3 '>
          <div onClick={()=>{setSizes((prev)=> prev.includes("S") ? prev.filter(item => item !== "S") : [...prev , "S"] )}}>
            <p className={sizes.includes("S") ? "bg-pink-100 py-1 px-3 cursor-pointer rounded" : "bg-slate-200 py-1 px-3 cursor-pointer rounded"} >S</p>
          </div>

          <div onClick={()=>setSizes((prev)=> prev.includes("M") ? prev.filter(item=> item !== "M") : [...prev , "M"] )}>
            <p className={sizes.includes("M") ? "bg-pink-100 py-1 px-3 cursor-pointer rounded" : "bg-slate-200 py-1 px-3 cursor-pointer rounded"}>M</p>
          </div>

          <div onClick={()=>setSizes((prev)=> prev.includes("L") ? prev.filter(item=> item !== "L") : [...prev , "L"] )}>
            <p className={sizes.includes("L") ? "bg-pink-100 py-1 px-3 cursor-pointer rounded" : "bg-slate-200 py-1 px-3 cursor-pointer rounded"}>L</p>
          </div>

          <div onClick={()=>setSizes((prev)=> prev.includes("XL") ? prev.filter(item=> item !== "XL") : [...prev , "XL"] )}>
            <p className={sizes.includes("XL") ? "bg-pink-100 py-1 px-3 cursor-pointer rounded" : "bg-slate-200 py-1 px-3 cursor-pointer rounded"}>XL</p>
          </div>

          <div onClick={()=>setSizes((prev)=> prev.includes("XXL") ? prev.filter(item=> item !== "XXL") : [...prev , "XXL"] )}>
            <p className={sizes.includes("XXL") ? "bg-pink-100 py-1 px-3 cursor-pointer rounded" : "bg-slate-200 py-1 px-3 cursor-pointer rounded"}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' onChange={()=>setBestSeller((prev)=> !prev)} checked={bestseller}/>
        <label className="cursor-pointer" htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add