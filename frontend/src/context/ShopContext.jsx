import { createContext, useState } from "react";
// import { products } from "../assets/assets";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// 1. Step Context Created 

export const ShopContext = createContext();

// 2. Context Provider 

const ShopContextProvider = (props) => {
    // console.log("Props Children ------->>>>>> ",props.children)
    // console.log("Props ------->>>>>> ",props)


    const currency = "₹";
    const deliveryFee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token , setToken] = useState("")
    const [products, setProducts] = useState([]);
    const [search , setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems , setCartItems] = useState({});
    const navigate = useNavigate();


    const getProductData = async()=>{
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            console.log("response",response)
            if(response.data.success){
                setProducts(response.data.product)
                
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    


    // Asynchronous function to add an item to the shopping cart
    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error("Select Product Size");
            return;
        }


        // Create a deep clone of the current cart items to prevent direct mutation
        let cartdata = structuredClone(cartItems);
        
        // Check if the item (by itemId) already exists in the cart
        if (cartdata[itemId]) {
            // If the specific size of the item exists, increment its quantity
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += 1;
            } 
            // If the size of the item doesn't exist, initialize its quantity to 1
            else {
                cartdata[itemId][size] = 1;
            }
        } 
        // If the item doesn't exist in the cart, create a new entry for it
        else {
            cartdata[itemId] = {}; // Initialize the itemId with an empty object
            cartdata[itemId][size] = 1; // Set the quantity of the given size to 1
        }
        setCartItems(cartdata)

        if(token){
            try {
                await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
        

        // Optionally, update the state or perform any further actions with the updated cartdata
    };

    // Function to calculate the total count of items in the cart
    const getCartCount = () => {
        let totalCount = 0; // Initialize the total count to zero

        // Outer loop iterates through each item in the cartItems object
        for (const items in cartItems) {
            // Inner loop iterates through sizes for the current item
            for (const item in cartItems[items]) {
                try {
                    // If the quantity is greater than zero, add it to the total count
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    // Handle the error by logging it
                    console.error(`Error processing cartItems[${items}][${item}]:`, error.message);
                    // Optionally: Continue execution by skipping the problematic entry
                    continue;
                }
            }
        }

        return totalCount; // Return the final total count
    };


    const updateQuantity = async (itemId, size , quantity)=>{
        let cartData = structuredClone(cartItems);
        
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{headers:{token}})
                toast.success("Cart Updated Successfully")
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

     const getCartAmount = async=>{
        if (!products || products.length === 0){
            console.log("No products available to calculate cart amount");
            return 0;
        } 

         let totalCount = 0;
         for(const items in cartItems){
            //  let itemInfo = products.find((product)=> product._id === items)
            const itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) {
            console.warn(`Product not found for item ID: ${items}`);
            continue;
            }
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount +=  itemInfo.price * cartItems[items][item]
                        // console.log(typeof(totalCount))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
         }
         return totalCount;
     }
  
    
    console.log(getCartAmount())


    const getUserCart = async (token)=>{
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`,{},{headers:{token}})
            console.log("cartData",response)
            if(response.data.success){
                setCartItems(response.data.userCart)
            }
        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData()
        console.log("backendurl",backendUrl)
        
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    },[])

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const value ={ currency , products , deliveryFee, search , setSearch , showSearch , setShowSearch ,
        getCartAmount, addToCart , cartItems ,setCartItems , getCartCount  , updateQuantity  , navigate , token , setToken , backendUrl
        }

    return(
        <ShopContext.Provider value={value}>
            {props.children} 
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;




