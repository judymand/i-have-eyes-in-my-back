const Users = require('../models/Users');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let list = { textButton:'חזרה לעמוד הראשי',  pageName: 'HomePage'}


//Check if the email is in the email list.
exports.emailCheck = async (req, res, next) => {
    
    try{
        let user = await Users.findOne({ email: req.body.email })
        let teacher = await Teacher.findOne({ email: req.body.email })
        let admin = await Admin.findOne({ email: req.body.email })
     
        if(user){
            return res.status(409).json({
                message: "המשתמש כבר רשום למערכת!"
            });
        }
        else if(teacher){
            return res.status(202).json({
                message: "The email is on the teacher list.",
                admin: false
            });
        }
        else if(admin){
            return res.status(202).json({
                message: "The email is on the admin list.",
                admin: true
            });
        }
       return res.status(401).json({
        message: "מייל זה לא נמצא במערכת."
        });
    }catch(err){
        this.next(err);
    }
  
}

// Password encryption
exports.hashPassword = async (password) => {
	return await bcrypt.hash(password, 10)
}

// Check the encrypted password with an unencrypted password
exports.validatePassword = async (Password, hashedPassword) => {
	return await bcrypt.compare(Password, hashedPassword)
}


// Change email letters to lowercase.
exports.lowerCaseEmail = async (email) => {
	return String(email).toLowerCase()
}

// Create a new user in the database
exports.CreateAuser = async (req, res, next) => {

    try{

        const hashedPassword = await this.hashPassword(req.body.password, 10)
        const lowerCasedEmail = await this.lowerCaseEmail(req.body.email)

        const user = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: lowerCasedEmail,
                admin: req.body.admin,
                password: hashedPassword,
            });
            
        let result = await user.save()

        if(result){
            return res.status(201).json({
                success: true,
                user: user,
                message: 'ההרשמה נקלטה בהצלחה!',
                textButton:'מעבר לעמוד התחברות',
                pageName: 'LogIn'

            });
        }else{
                return res.status(401).json({
                    success: false,
                    message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                    textButton:'חזרה לעמוד הבית',
                    pageName: 'HomePage'
            });
        }
        
       
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err,
            textButton:'חזרה לעמוד הבית',
            pageName: 'HomePage'
    });
    }

}


 
// Login to the system
exports.Login = async (req, res, next) => {
    
    try{
       
        let password = req.body.password
        const lowerCasedEmail = await this.lowerCaseEmail(req.body.email)
        let user =  await Users.findOne({ email: lowerCasedEmail })

       
        if(user){

            let fetchedUsers = await this.validatePassword(password, user.password);
            
            if(fetchedUsers){
               
                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                    expiresIn: '1800s',
                })

                if(user.admin){
                    return res.status(201).json({
                        success: true,
                        token: token,
                        expiresIn: '1800',
                        user: user,
                        message: "",
                        textButton: "",
                        navigator:"AdminNavigator",
                });

                }
                else{
                    return res.status(201).json({
                        success: true,
                        token: token,
                        expiresIn: '1800',
                        user: user,
                        message: "",
                        textButton: "",
                        navigator:"TeacherNavigator",
                });
    
                }
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: "שם משתמש או הסיסמא אינם נכונים.",
                    textButton:'נסה שנית',
                    pageName: 'LogIn'
            });
            }
          
        }else
            return res.status(401).json({
                success: false,
                message: "המשתמש לא קיים במערכת.",
                textButton:'נסה שנית',
                pageName: 'LogIn'
        });
    }catch{
        (err) => {
            return res.status(401).json({
                success: false,
                message: "Auth failed"
            });
        }
    }
}


//addUserEmail//
exports.addNewUserEmail = async (req, res, next) => {

    try{

        let admin = req.body.admin

        let newUserEmail
        let type = "מורה"
        let listName = "מורים"

        if(admin){
            type =  "מנהל"
            listName = "מנהלים"
            newUserEmail =  await Admin.findOne({ email: req.body.email })
        }
        else{
            newUserEmail =  await Teacher.findOne({ email: req.body.email })
        }

        if(newUserEmail){
            return res.status(401).json({
                success: true,
                message: "שגיאה, המייל כבר נמצא ברשימת ה" + listName,
                list: list
            });
        }

        let newUser

        if(admin){
            newUser = new Admin(
                { email: req.body.email, },
                { versionKey: false }
            );
        }
        else{
            newUser = new Teacher(
                { email: req.body.email, },
                { versionKey: false }
            );
        }

        let result = await newUser.save()

        if(result)
            return res.status(201).json({
                success: true,
                message:  'המייל נכנס בהצלחה לרשימת ה' + listName,
                list: list

        });
        else
            return res.status(401).json({
                success: false,
                message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                list: list
        });

    }catch(err){

        console.log(err)
        return res.status(401).json({
            success: false,
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
        });
    }

}



exports.getAllTeacher = async (req, res, next) => {

    try{

        let teacherArr = [];
        let allTeachers = await Teacher.find({})

        if (!allTeachers) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        for (let i = 0; i < allTeachers.length; i++) {
            teacherArr.push(allTeachers[i])
        }

        res.status(200).json({
            teacherArr: teacherArr
        });
        next()


   }catch(err){

        console.log(err)
        return res.status(401).json({
            success: false,
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
        });
    }
}

exports.deleteTeacher = async (req, res, next) => {

    try{
      
        let teacherArr = req.body.teacherListToDeleate;

        teacherArr.forEach( async (teacher) =>  {

            await Teacher.findOneAndRemove({ email: teacher })

            let emailUser = await Users.findOne({ email: teacher })

            if(emailUser){
                Users.findOneAndRemove({ email: teacher })
            }

        })

        return res.status(201).json({
            success: true,
            teacherArr: teacherArr,
            message: " המיילים והמשתמשים " + teacherArr + ' נמחקן בהצלחה מרשימת המיילים של משתמש מסוג מורה ומרשימת המשתמשים.',
            list: list
        })

   }catch(err){

        console.log(err)
        return res.status(401).json({
            success: false,
            error: err,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            list: list
        });
    }
}


exports.getUser = async (req, res, next) => {

    try{

        let user =  await Users.findOne({ _id: req.user })

        if(!user){
            return res.status(401).json({
                success: false,
                message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                textButton:'חזרה לעמוד הבית',
                pageName: 'HomePage'
        });
        }

     
        return res.status(201).json({
            success: true,
            user: user,
            message: 'המשתמש זוהה בהצלחה! ',
            textButton:'מעבר לעמוד התחברות',
            pageName: 'LogIn'

        });
        
        
       
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err,
            textButton:'חזרה לעמוד הבית',
            pageName: 'HomePage'
    });
    }

}


exports.UpdateUserDetails = async (req, res, next) => {

    try{

        let user =  await Users.findOne({ _id: req.body.user._id })
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let password = req.body.password
        let newPassword = req.body.newPassword
        let validnewPassword = req.body.validnewPassword
        let message = ""
        let flag = false
     

        if(!user){
            return res.status(401).json({
                success: false,
                message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
                list: list
            });
        }

        if (firstName != undefined && firstName != '' && firstName != user.firstName) {
            changeName = await Users.findByIdAndUpdate(user._id, { firstName: firstName })
            if(changeName){
                message = message.concat("\n השם שונה בהצלחה!") 
            }
            else{
                message = message.concat("\n אופסי, ישנה שגיאה, השם הפרטי לא התעדכן במערכת.")
            }
            flag = true
            
        }
        if (lastName != undefined && lastName != '' && lastName != user.lastName) {
            changeLastName = await Users.findByIdAndUpdate(user._id, { lastName: lastName } )
            if(changeLastName){
                message = message.concat( "\nשם המשפחה שונה בהצלחה!")
            }
            else{
                message = message.concat("\nאופסי, ישנה שגיאה, השם המשפחה לא התעדכן במערכת.")
            }
            flag = true
        }if(newPassword != undefined && newPassword != '' ){
            if(await this.validatePassword(password, user.password)){
                if (validnewPassword) {
                    const hashedPassword = await this.hashPassword(newPassword, 10)
                    changePassword = await Users.findByIdAndUpdate(user._id, { password: hashedPassword } )
                    if(changePassword){
                        message = message.concat( " \n !הסיסמא שונתה בהצלחה")
                    }
                    else{
                        message = message.concat("\n אופסי, ישנה שגיאה, הסיסמא לא התעדכנה במערכת.")
                    }
                }
            }
            else{
                message = message.concat( " \n הסיסמא לא שונתה, כדי לשנות את הסיסמא חייב להזין את הסיסמא הנוכחית שלך")
            }
            flag = true
        }

        if(!flag){
            message = "פרטי המשתמש לא התעדכנו במערכת."
        }
     
        return res.status(201).json({
            success: true,
            user: user,
            message: message,
            list: list

        });
        
        
    }catch(err){
        return res.status(401).json({
            success: false,
            message: err,
            list: list,
    });
    }

}
