const mongoose=require('mongoose');

const ProfessionSchema = new mongoose.Schema({
    professionList: {
        type: [String],
        default: [''],
    },  
})

mongoose.model("profession",ProfessionSchema)