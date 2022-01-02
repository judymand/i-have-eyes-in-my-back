const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//const Users=
require('./Users');
require('./Teacher');
const router = express.Router();
const Adm=false;
app.use(bodyParser.json())

const Users=mongoose.model("users");
const Teacher=mongoose.model("teacher");
//password quzdeb-zeSvom-musba9
//name app
const mongoURL="mongodb://iHaveEyes:quzdeb-zeSvom-musba9@cluster0-shard-00-00.tobyl.mongodb.net:27017,cluster0-shard-00-01.tobyl.mongodb.net:27017,cluster0-shard-00-02.tobyl.mongodb.net:27017/app?ssl=true&replicaSet=atlas-x2w3z3-shard-0&authSource=admin&retryWrites=true&w=majority"



//const mongoURL=" mongodb+srv://iHaveEyes:quzdeb-zeSvom-musba9@cluster0.tobyl.mongodb.net/app?retryWrites=true&w=majority"

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo!");
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err);
})

//Login//
app.post("/login", (req, res, next) => {
    let fetchedUsers;

    Users.findOne({ email: req.body.email })
        .then(users => {
            if (!users) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUsers = users;
            return bcrypt.compare(req.body.password, users.password);
        })
        .then(result => {

            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }


            const token = jwt.sign({ email: fetchedUsers.email, userId: fetchedUsers._id },
                "secret_this_should_be_longer", { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUsers._id,
                lastName: fetchedUsers.lastName,
                firstName: fetchedUsers.firstName,
                email: fetchedUsers.email,
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});


app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    res.send("welcome to node js")
})

//signup//
app.post("/signup", (req, res, next) => {
Teacher.findOne({ email: req.body.email })

    .then(teachers => {
        if (!teachers) {
            return res.status(401).json({
                message: "Error try fix your Email"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10).then(hash => {

                const users = new Users({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    admin:Adm,
                    password: hash,
        
        
                });
        
                users
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "User created!",
                            result: result
                        });
                    })
         
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
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