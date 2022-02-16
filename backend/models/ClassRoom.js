const mongoose=require('mongoose');

const ClassRoomSchema=new mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true,
    },
    student:{
        type: [String],
        default: [''],
    },
    profession: {
        type: [String],
        default: [''],
    },
   
})

module.exports = mongoose.model("classRoom",ClassRoomSchema)