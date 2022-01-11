const mongoose=require('mongoose');

const UsersSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    admin:Boolean,
    password:String
   
})

mongoose.model("users",UsersSchema)