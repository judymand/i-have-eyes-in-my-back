const mongoose=require('mongoose');

const LessonSchema=new mongoose.Schema({
    className: {
        type: String,
    },
    profession: {
        type: String,
    },
    day:{
        type: String,
    },
    time:{
        type: String,
    },
    students:{
        type: [{}]
    },

})

module.exports = mongoose.model("lesson",LessonSchema)