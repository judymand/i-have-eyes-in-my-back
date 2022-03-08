
let MongoClient = require('mongodb').MongoClient;
var url = "mongodb://iHaveEyes:quzdeb-zeSvom-musba9@cluster0-shard-00-00.tobyl.mongodb.net:27017,cluster0-shard-00-01.tobyl.mongodb.net:27017,cluster0-shard-00-02.tobyl.mongodb.net:27017/faceRecognition?ssl=true&replicaSet=atlas-x2w3z3-shard-0&authSource=admin&retryWrites=true&w=majority";
let list = { textButton:'חזרה לעמוד הראשי',  pageName: 'AdminPanel'}
let StudentDB
const ClassRoom = require('../models/ClassRoom');

exports.getAllStudent = async (req, res) => {

    MongoClient.connect(url, async (err, db) => {
        if (err) throw err;
        let dbo = db.db("faceRecognition");
        StudentDB = dbo.collection("studentsList")
        studentList = []

        lastDocument  = await StudentDB.findOne({}, {sort:{$natural:-1}})
        lastDocument.students.forEach(element => {
            studentList.push(element.name)
        });
        
        return res.status(201).json({
            success: true,
            studentList: studentList,
            message: "",
        })
        
        
        // db.close();

    });

}

exports.addStudentsToClass = async (req, res) => {

    try{

        let studentsList = req.body.studentsList
        let classList = req.body.classList
    
        classList.forEach( async (item) => {
    
            oneClass =  await ClassRoom.findOne({ className: item})

            await ClassRoom.updateOne(oneClass, {
                $addToSet: {
                    student: studentsList
                }
            })
    
        })
    
        return res.status(201).json({
            success: true,
            studentsList: studentsList,
            classList: classList,
            message: studentsList + ' נוספו בהצלחה ל ' + classList,
            list: list
        })
    
    
    }catch(err){
        console.log(err)
        res.status(500).json({
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
            
        });
    }
   
}

exports.getAllStudentsOfClass = async (req, res) => {

    try{

      let theSelectionClass = req.body.theSelectionClass
  
      let theClass = await ClassRoom.findOne({ className: theSelectionClass })

      if (!theClass) {
          return res.status(401).json({
              success: false,
              message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
              list: list
          });
      }
   
      res.status(200).json({
        students: theClass.student
      });

  }catch(error){
      res.status(500).json({
          error: error,
          success: false,
          message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
          list: list
          
      });
  }

}

exports.deleteStudentsFromClass = async (req, res) => {

    try{

        let studentsList = req.body.studentListToDeleate

        oneClass =  await ClassRoom.findOne({ className: req.body.selectClass})

        let result = await ClassRoom.updateOne(oneClass, {
            $pullAll: {
                student: studentsList
            }
        })
    
        if(result){

            return res.status(201).json({
                success: true,
                studentsList: studentsList,
                oneClass: oneClass.className,
                message: studentsList + ' נמחקו בהצלחה מכיתה ' + oneClass.className,
                list: list
            })
        }
    
        return res.status(201).json({
            success: false,
            studentsList: studentsList,
            oneClass: oneClass.className,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
        })
    
    
    }catch(err){
        console.log(err)
        res.status(500).json({
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
            
        });
    }
   
}






 // let today = new Date()
    // let dayOfMonth = d.getDate();
    // let year = d.getFullYear()
    // let month = d.getMonth();
    // var date = new Date();
    // let yesterday  = date.setDate(date.getDate() - 1)

    // for(let i=0; i<allDocuments.length; ++i){

    // }



