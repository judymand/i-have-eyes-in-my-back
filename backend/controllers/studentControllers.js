
let MongoClient = require('mongodb').MongoClient;
var url = "mongodb://iHaveEyes:quzdeb-zeSvom-musba9@cluster0-shard-00-00.tobyl.mongodb.net:27017,cluster0-shard-00-01.tobyl.mongodb.net:27017,cluster0-shard-00-02.tobyl.mongodb.net:27017/app?ssl=true&replicaSet=atlas-x2w3z3-shard-0&authSource=admin&retryWrites=true&w=majority";

let allDocuments 
let StudentDB

const connectStudentDB = async () => {

    let lastDocument 

    MongoClient.connect(url, async (err, db) => {

        if (err) throw err;
        let dbo = db.db("app");
        StudentDB = dbo.collection("studentsList")

        lastDocument  = await StudentDB.findOne({}, {sort:{$natural:-1}})
        // console.log(lastDocument)
        db.close();
    });

    if(lastDocument){
        return lastDocument;
    }

}


console.log( connectStudentDB() )

exports.getAllStudent = async (req, res) => {

    
    let today = new Date()
    let dayOfMonth = d.getDate();
    let year = d.getFullYear()
    let month = d.getMonth();
    var date = new Date();
    let yesterday  = date.setDate(date.getDate() - 1)

    for(let i=0; i<allDocuments.length; ++i){

    }




}



