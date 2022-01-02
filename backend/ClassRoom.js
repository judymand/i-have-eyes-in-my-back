const mongoose=require('mongoose');

const ClassRoomSchema=new mongoose.Schema({
    className: String,
    student:{
        type: [String],
        default: [''],
    } 
   
})

mongoose.model("classRoom",ClassRoomSchema)