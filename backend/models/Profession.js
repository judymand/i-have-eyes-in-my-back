const mongoose=require('mongoose');

const ProfessionSchema = new mongoose.Schema({
    profession: String
})

mongoose.model("profession",ProfessionSchema)