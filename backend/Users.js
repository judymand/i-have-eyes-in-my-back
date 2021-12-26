const mongoose=require('mongoose');

const UsersSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String
   
})

mongoose.model("users",UsersSchema)