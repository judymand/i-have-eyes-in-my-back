const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    email: String
})

mongoose.model("admin",AdminSchema)