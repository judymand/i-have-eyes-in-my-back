const mongoose=require('mongoose');

//---New Type for Required---//
// const reqString={
//     type:String,
//     required:true,
// }

const studentSchema=mongoose.Schema(
    {
    name:String,
    arrived:Boolean
}

)

const LessonSchema=new mongoose.Schema({
    className:String,
    profession:String,
    day:String,
    time:String,
    students:[studentSchema]

})

//module.exports = mongoose.model("lesson",LessonSchema)

module.exports = mongoose.model("lessons",LessonSchema)