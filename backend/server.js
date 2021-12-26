const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
//const bcrypt = require("bcrypt");
require('./Users');


app.use(bodyParser.json())

const Users=mongoose.model("users");

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

app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    res.send("welcome to node js")
})


app.post('/signup',(req,res)=>{
    const users=new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
        
    })  
    
    users.save()
    .then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })

}) 
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