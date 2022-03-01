const Users = require('../models/Users');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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


//addTeacher//
exports.addNewTeacher = async (req, res, next) => {

    let teacher =  await Teacher.findOne({ email: req.body.email })

    if(teacher){
        return res.status(401).json({
            message: "Error, the email is on the list of teacher."
        });
    }

    const Newteacher = new Teacher(
        { email: req.body.email, },
        { versionKey: false }
    );
    
    let result = await Newteacher.save()

    if(result)
        return res.status(201).json({
            success: true,
            message: 'המייל נכנס בהצלחה לרשימת המורים.',
            textButton:'חזרה לעמוד הראשי',
            pageName: 'AdminPanle'

    });
    else
        return res.status(401).json({
            success: false,
            message: "אופסי, ישנה תקלה.\n בבקשה נסה שנית מאוחר יותר.",
            textButton:'חזרה לעמוד הראשי',
            pageName: 'AdminPanle'
    });



}


// app.post("/addTeacher", (req, res, next) => {
//     Teacher.findOne({ email: req.body.email })
    
//         .then(teachers => {
//             if (teachers) {
//                 return res.status(401).json({
//                     message: "Error, the email is on the list of teacher."
//                 });
//             }
//             else{
               
//                 const teacher = new Teacher(
//                     { email: req.body.email, },
//                     { versionKey: false }
//                 );
        
//                 teacher
//                 .save()
//                 .then(result => {
//                     res.status(201).json({
//                         message: "Teacher added!",
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



//addAdmin//
// app.post("/addAdmin", (req, res, next) => {
//     Admin.findOne({ email: req.body.email })
    
//         .then(admin => {
//             if (admin) {
//                 return res.status(401).json({
//                     message: "Error, the email is on the list of admin."
//                 });
//             }
//             else{
               
//                 const nAdmin = new Admin(
//                     { email: req.body.email, },
//                     { versionKey: false }
//                 );
        
//                 nAdmin
//                 .save()
//                 .then(result => {
//                     res.status(201).json({
//                         message: "Admin added!",
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


