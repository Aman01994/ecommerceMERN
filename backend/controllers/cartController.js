const UserModel = require("../models/UserModel");

// Function to handle adding an item to the user's cart
const addToCart = async (req, res) => {
    try {
        // Destructure userId, itemId, and size from the request body
        const userId = req.user.id;
        const { itemId, size } = req.body;
        console.log(userId)

        // Find the user by ID in the database
        const userData = await UserModel.findById(userId)

        // Get the current cart data of the user
        let cartData = await userData.cartData
        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            // If the item with the specific size already exists, increment the quantity
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                // If the size doesn’t exist, set it to 1
                cartData[itemId][size] = 1;
            }
        } else {
            // If the item doesn’t exist in the cart, create a new object and set the size quantity to 1
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        // Update the user's cartData in the database with the modified cart
        await UserModel.findByIdAndUpdate(userId, { cartData })

        // Respond to the frontend with a success message
        res.json({ success: true, message: "Added to cart" })
    } catch (error) {
        // If there is any error, log it and respond with a failure message
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const upDateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log("UserId------->>>",userId)
        const { itemId, size, quantity } = req.body;

        const userData = await UserModel.findById(userId)
        console.log("UserData------->>>",userData)
        let userCart = userData.cartData
        userCart[itemId][size] = quantity;

        

        await UserModel.findByIdAndUpdate(userId, { cartData :userCart })
        res.json({ success: true, message: "Cart Updated" })
        // after updating the cart
        console.log("UserCart------->>>",userCart)
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log("------>>>>>> ", userId)
        const userData = await UserModel.findById(userId)
        let userCart = await userData.cartData

        res.json({ success: true, userCart })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


module.exports = { addToCart, upDateCart, getUserCart }