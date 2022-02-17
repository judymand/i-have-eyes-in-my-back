const ClassRoom = require('../models/ClassRoom');

let list = { textButton:'חזרה לעמוד הראשי',  pageName: 'AdminPanel'}


//AddNewClass
exports.addNewClass = async (req, res) => {

    try{
    
        newClassRoom = String(req.body.newClassRoom + req.body.newClassNumber)
        let isClass = await ClassRoom.findOne({ className: newClassRoom })

        if(isClass){
            return res.status(401).json({
                message: "שגיאה!\n הכיתה כבר רשומה במערכת.",
                list: list,
            });
        }

        
        const addnewClassRoom = new ClassRoom(
            { className: newClassRoom, },
            { versionKey: false }
        );

        let result = await addnewClassRoom.save()


        if(result){
            return res.status(201).json({
                success: true,
                Newclass: addnewClassRoom,
                // token: token,
                message: 'הכיתה נוספה בהצלחה!',
                list: list,
            })
        }
        else{

            return res.status(401).json({
                success: false,
                // token: token,
                message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                list: list,
            
            })

        }
        
    
    }catch{ err => {
        console.log(err)
        res.status(500).json({
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list,
            
        });}
    }
    
}


// get all classes
exports.getAllClass = async (req, res, next) => {

    try{
        
        let classessArr = [];
        let oneClass
        let allclasses = await ClassRoom.find({})

        if (!allclasses) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        for (let i = 0; i < allclasses.length; i++) {
            oneClass = {
                "_id": allclasses[i]._id,
                "className": allclasses[i].className,
            }

            classessArr.push(oneClass)
        }

        res.status(200).json({
            classRoom: classessArr
        });
        next()
       
    }catch{
        res.status(401).json({
            message: "Auth failed"
        });
        next()
    }

}


exports.deleteClass = async (req, res) => {

    try{

        let result = await ClassRoom.findByIdAndRemove(req.body.id)

        if(result){
            return res.status(201).json({
                success: true,
                Newclass: result,
                // token: token,
                message: " הכיתה " + result.className + ' נמחקה בהצלחה מרשימת הכיתות.',
                textButton:'המשך',
                pageName: 'DeleteClass'
            })
        }
  
        return res.status(401).json({
            success: false,
            // token: token,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            textButton:'חזרה לעמוד הראשי',
            pageName: 'AdminPanel'
        
        })

    }catch(err){
        res.status(500).json({
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            textButton:'חזרה לעמוד הראשי',
            pageName: 'AdminPanel'
            
        });
    }


}
