const Profession = require('../models/Profession');

let list = { textButton:'חזרה לעמוד הראשי',  pageName: 'AdminPanel'}

//add Profession
exports.addNewProfession = async (req, res) => {

    try{
        
        let userprofession = String(req.body.profession).toLowerCase()
        let profession = await Profession.findOne({ profession: userprofession})

        if(profession){
            return res.status(401).json({
                success: false,
                message: ' המקצוע ' + profession.profession + ' כבר רשום במערכת. ',
                list:list
            });
        }
        const newprofession = new Profession(
            { profession: userprofession },
        );

        let result = await newprofession.save()

        if(result){
            return res.status(201).json({
                success: true,
                message: ' המקצוע ' + result.profession + ' נרשם בהצלחה במערכת. ',
                list:list
            });
        }
        return res.status(401).json({
            success: false,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list:list
        });

       
    }catch(error){
        res.status(500).json({
            error: error,
            success: false,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list,
        });
    }
  
}



// app.post('/delete',(req,res)=>{
//     Users.findByIdAndRemove(req.body.id).then(data=>{
//         console.log(data)
//         res.send("deleted")
//     }).catch(err=>{
//         console.log(err)
//     })
// })



// get Professions
exports.getAllProfession = async (req, res) => {

    try{

        let oneProfession
        let ProfessionsArr = [];
    
        let allProfession = await Profession.find({})

        if (!allProfession) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        for (let i = 0; i < allProfession.length; i++) {
            oneProfession = {
                "_id": allProfession[i]._id,
                "profession": allProfession[i].profession,
            }

            ProfessionsArr.push(oneProfession)
        }

        res.status(200).json({
            profession: ProfessionsArr
        });

    }catch(error){
        res.status(500).json({
            error: error,
            success: false,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list,
        });
    }

}


// app.post("/getProfessions", (req, res, next) => {
//     let fetchedProfessions;
//     let ProfessionsArr = [];
//     let u;
//     // '_id': { '$nin': [req.body.id] }
//     Profession.find({})
//         .then(profession => {
//             if (!profession) {
//                 return res.status(401).json({
//                     message: "Auth failed"
//                 });
//             }

//             fetchedProfessions = profession;

//             for (let i = 0; i < fetchedProfessions.length; i++) {
//                 u = {
//                     "_id": fetchedProfessions[i]._id,
//                     "profession": fetchedProfessions[i].profession,
//                 }

//                 ProfessionsArr.push(u)
//             }

//         })
//         .then(result => {
//             res.status(200).json({
//                 profession: ProfessionsArr
//             });
//         })
//         .catch(err => {
//             return res.status(401).json({
//                 message: "Auth failed"
//             });
//         });

// });