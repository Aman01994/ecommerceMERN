const mongoose = require('mongoose');

const MongoUser = process.env.MONGODB_USER
const MongoPass = process.env.MONGODB_PASS
let MongoURI = process.env.MongoURI

const ConnectDb = async()=>{
  // This is run if we are connected with Database 
  mongoose.connection.on("connected",()=>{
    console.log("DB_Connected")
  })
 
  await mongoose.connect(`mongodb+srv://${MongoUser}:${MongoPass}@cluster0.redzkol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/`);
}

module.exports = ConnectDb