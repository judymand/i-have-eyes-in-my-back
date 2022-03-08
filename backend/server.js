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
const studentControllers = require('./controllers/studentControllers')

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



app.get("/getClasses", auth.isAuth, classController.getAllClass)
app.post("/AddClassRoom", auth.isAuth, classController.addNewClass) 
app.post("/deleteClassRoom", auth.isAuth,classController.deleteClass )
app.post("/addProfessionsToClasses", auth.isAuth, classController.addProfessionsToClasses)

app.get("/getProfessions", auth.isAuth, professionControllers.getAllProfession)
app.post("/AddProfession", auth.isAuth, professionControllers.addNewProfession)
app.post("/getProfessionsOfClass", professionControllers.getAllProfessionOfClass)
app.post("/deleteProfession", auth.isAuth, professionControllers.deleteProfessions)

app.post("/deleteProfessionFromClass", auth.isAuth, professionControllers.deleteProfessionsFromClass)

app.get("/getAllTeacher", auth.isAuth, userController.getAllTeacher)
app.post("/addUserEmail", auth.isAuth, userController.addNewUserEmail)
app.post("/deleteTeacher",auth.isAuth, userController.deleteTeacher)

app.get("/getAllStudent", auth.isAuth, studentControllers.getAllStudent)
app.post("/addStudentsToClass", auth.isAuth, studentControllers.addStudentsToClass)

app.post("/getStudentOfClass", auth.isAuth, studentControllers.getAllStudentsOfClass)
app.post("/deleteStudentsFromClass", auth.isAuth, studentControllers.deleteStudentsFromClass)

    


       


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
