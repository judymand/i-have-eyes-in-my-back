const mongoose=require('mongoose');

const TeacherSchema=new mongoose.Schema({
    email:String

   
})

mongoose.model("teacher",TeacherSchema)