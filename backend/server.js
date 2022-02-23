const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
// const cookieSession = require("cookie-session");


require('dotenv').config()


// conect database
require('./db');

// All models of schemas in the database
const Users = require('./models/Users');
const Teacher = require('./models/Teacher');
const Admin = require('./models/Admin');
const ClassRoom = require('./models/ClassRoom');
const Profession = require('./models/Profession');

const userController = require('./controllers/userController')
const classController = require('./controllers/classControllers')
const professionControllers = require('./controllers/professionControllers')

const auth = require('./controllers/auth')

const Adm = false;


app.use(bodyParser.json())

app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    res.send("welcome to node js")
})


app.post('/EmailCheck', userController.emailCheck)

app.post('/signup', userController.CreateAuser)

app.post('/login', userController.Login)

app.post("/addTeacher",  auth.isAuth, userController.addNewTeacher)



// app.post("/AddClassRoom", auth.isAuth, classController.addNewClass)
app.post("/AddClassRoom", classController.addNewClass) 


app.get("/getClasses", classController.getAllClass)
app.post("/deleteClassRoom",classController.deleteClass )
app.post("/addProfessionsToClasses", classController.addProfessionsToClasses)


app.post("/AddProfession", professionControllers.addNewProfession)
app.get("/getProfessions", professionControllers.getAllProfession)



//addTeacher//
app.post("/addTeacher", (req, res, next) => {
    Teacher.findOne({ email: req.body.email })
    
        .then(teachers => {
            if (teachers) {
                return res.status(401).json({
                    message: "Error, the email is on the list of teacher."
                });
            }
            else{
               
                const teacher = new Teacher(
                    { email: req.body.email, },
                    { versionKey: false }
                );
        
                teacher
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Teacher added!",
                        result: result
                    });
                })
        
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })    
    });

 

    


       


//get Users //

app.post("/getUsers", (req, res, next) => {
    let fetchedUsers;
    let usersArr = [];
    let u;
    // '_id': { '$nin': [req.body.id] }
    Users.find({})
        .then(users => {
            if (!users) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            fetchedUsers = users;

            for (let i = 0; i < fetchedUsers.length; i++) {
                u = {
                    "_id": fetchedUsers[i]._id,
                    "firstName": fetchedUsers[i].firstName,
                    "lastName": fetchedUsers[i].lastName,
                    "email": fetchedUsers[i].email
                }

                usersArr.push(u)
            }

            console.log(usersArr)
        })
        .then(result => {
            res.status(200).json({
                users: usersArr
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

// update user email //

app.post("/updateUserEmail", (req, res, next) => {
    Users.updateOne({ '_id': req.body.id }, { '$set': { 'email': req.body.email } })
        .then(users => {
            if (!users) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
        })
        .then(result => {

            res.status(200).json({
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

// update last name //

app.post("/updateUserLastName", (req, res, next) => {
    Users.updateOne({ '_id': req.body.id }, { '$set': { 'lastName': req.body.lastName } })
        .then(users => {
            if (!users) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

        })
        .then(result => {

            res.status(200).json({


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

// update first name //

app.post("/updateUserFirstName", (req, res, next) => {
    Users.updateOne({ '_id': req.body.id }, { '$set': { 'firstName': req.body.firstName } })
        .then(users => {
            if (!users) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

        })
        .then(result => {

            res.status(200).json({


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

// update password //


app.post("/updateUserPassword", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        Users.updateOne({ '_id': req.body.id }, { '$set': { 'password': hash } })
            .then(users => {
                if (!users) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }

            })
            .then(result => {

                res.status(200).json({


                });

            })
            .catch(err => {
                return res.status(401).json({
                    message: "Auth failed"
                });
            });

    })
});



app.post('/delete',(req,res)=>{
    Users.findByIdAndRemove(req.body.id).then(data=>{
        console.log(data)
        res.send("deleted")
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Users.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    }).then(data=>{
        console.log(data)
        res.send("update")
    }).catch(err=>{
        console.log(err)
})
})

app.listen(3000,()=>{
    console.log("server runnicng")
})





// get students

app.post("/getStudents", (req, res, next) => {
    let fetchedStudents;
    let classessArr = [];
    let u;
    // '_id': { '$nin': [req.body.id] }
    ClassRoom.find({})
        .then(classRoom => {
            if (!classRoom) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            fetchedClasses = classRoom;

            for (let i = 0; i < fetchedClasses.length; i++) {
                u = {
                    "_id": fetchedClasses[i]._id,
                    "className": fetchedClasses[i].className,
                }

                classessArr.push(u)
            }

            console.log(classessArr)
        })
        .then(result => {
            res.status(200).json({
                classRoom: classessArr
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});


app.post('/deleteCTeacher',(req,res, next)=>{
    let email 
    Teacher.findByIdAndRemove(req.body.id)
    .then(data => {
        // res.send("deleted")
        // res.redirect(req.get('referer')); 
    })
    .catch(err=>{
        console.log(err)
    })
    Users.deleteOne({ email: req.body.email })

    
})

// Add a Profession to the list of Profession in the class

app.post("/AddProfessionClassRoom", (req, res, next) => {
    ClassRoom.findOneAndUpdate(
        { _id: req.body.classRoom },
        
        
        )

        .then(cRoom => {
            if (cRoom) {

                
            }
            else{
                return res.status(401).json({
                    message: "Error, the class is on the list of classes."
                });
               
            }
        }) 
     
    });


