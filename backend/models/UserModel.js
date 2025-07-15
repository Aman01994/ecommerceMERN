const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {type: String , required : true},
    email : {type : String , required:true, unique: true},
    password : {type: String, required : true},
    cartData : {type : Object , default: {}}

},{minimize:false})

// Mongoose, by default, ignores empty objects in schemas. 
// To prevent this behavior and ensure the cartData property is stored even when it's an empty object, 
// we use { minimize: false } in the schema definition.


const UserModel = mongoose.models.user || mongoose.model("user",UserSchema)
// const UserModel =  mongoose.model("user",UserSchema)


module.exports = UserModel