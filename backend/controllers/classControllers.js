const ClassRoom = require('../models/ClassRoom');


//AddNewClass
exports.addNewClass = async (req, res, next) => {

    try{
        newClassRoom = String(req.body.newClassRoom + req.body.newClassNumber)
        let isClass = ClassRoom.findOne({ className: newClassRoom })

        if(isClass){
            return res.status(401).json({
                message: "Error, the class is on the list of classes."
            });
        }
        
        const classRoom = new ClassRoom(
            { className: newClassRoom, },
            { versionKey: false }
        );

        let result = await classRoom.save()

        if(result){
            return res.status(201).json({
                success: true,
                Newclass: classRoom,
                token: token,
                message: 'הכיתה נוספה בהצלחה!',
                textButton:'חזרה לעמוד הראשי',
                pageName: 'AdminPanle'

            })
        }
        else{

            return res.status(401).json({
                success: false,
                token: token,
                message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                textButton:'חזרה לעמוד הראשי',
                pageName: 'AdminPanle'

            })

        }
        
    
    }catch{ err => {
        res.status(500).json({
            error: err
        });}
    }
    
}


              
//addClassRoom
// app.post("/AddClassRoom", (req, res, next) => {
//     newClassRoom = String(req.body.newClassRoom + req.body.newClassNumber)
//     ClassRoom.findOne({ className: newClassRoom })
    
//         .then(cRoom => {
//             if (cRoom) {
//                 return res.status(401).json({
//                     message: "Error, the class is on the list of classes."
//                 });
//             }
//             else{
               
//                 const classRoom = new ClassRoom(
//                     { className: newClassRoom, },
//                     { versionKey: false }
//                 );
        
//                 classRoom
//                 .save()
//                 .then(result => {
//                     res.status(201).json({
//                         message: "Class added!",
//                         result: result
//                     });
//                 })
//                 .catch(err => {
//                     res.status(500).json({
//                         error: err
//                     });
//                 });
//             }
//         })  
//     });