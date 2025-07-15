import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

function Login() {
  const {backendUrl , token ,setToken , navigate} = useContext(ShopContext)
  const [currentState , setCurrentState] = useState("login");
  const [name ,setName ] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');


  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(currentState === "signup"){
        const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
        console.log(response.data.success)
        if(response.data.success){
          setToken(response.data.token)
          window.localStorage.setItem("token",response.data.token)
          setName('')
          setEmail('')
          setPassword('')
        }else{
          toast.error(response.data.message)
        }
      }else{
          const response = await axios.post(`${backendUrl}/api/user/login`,{email,password})
          if(response.data.success){
            setToken(response.data.token)
            window.localStorage.setItem("token",response.data.token)
            setEmail('')
            setPassword('')
          }else{
            toast.error(response.data.message)
          }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] text-gray-800 sm:max-w-96 m-auto mt-14 gap-4'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='parta-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "login" ? " ":<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> }
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-sm'>Forgot your password?</p>
        {
          currentState === "login"? 
          <p onClick={()=>setCurrentState("signup")} className='cursor-pointer'>Create account</p> : 
          <p onClick={()=>setCurrentState("login")} className='cursor-pointer'>Login here</p>
        }
      </div>
        <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 rounded'>{currentState === "login"? "Login": "Sign up"}</button>
    </form>
  )
}

export default Login