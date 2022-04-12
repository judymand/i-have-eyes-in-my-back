// judi '+972543315931----+12184141637'
//0523190543
//mmyt1785@gmail.com
// ZSRX_9PTwu@=Zc^12345678

const LessonSchema = require('./models/Lesson');
const DailyAttendanceSchema = require('./models/DailyAttendance');
const studentsListSchema=require("./models/studentList");
//---DATE FORMAT + DATE=TODAY ---//
// const Ttoday = new Date();
// const yyyy = Ttoday.getFullYear();
// let mm = Ttoday.getMonth() + 1; // Months start at 0!
// let dd = Ttoday.getDate();

// if (dd < 10) dd = '0' + dd;
// if (mm < 10) mm = '0' + mm;

// const today = dd + '/' + mm + '/' + yyyy;
// console.log(today);

//---DATE FORMAT ---//


const today='05/04/2022';
const Ttime='23:40'
//התחברות מסד נתונים
require('dotenv').config()
 require('./db');



//  //הוספה של משתנה חדש ללסון
// new LessonSchema({
// 	className:"א2",
// 	profession:"חשבון",
// 	day:today,
// 	time:Ttime,
// 	students:[
// 		{
// 		name:"סיטארה אלייב",
// 		arrived:true
// 		},
// 		{
// 		name:"דודי ביטון",
// 		arrived:true
// 		},
// 		{
// 		name:"יהודית מנדלבוים",
// 		arrived:false
// 		}
// 	]

// }).save()


// //------ The names of the students in which the teacher entered true (Lesson)-----//
// let names_True_Lesson=[];
// let names_False_Lesson=[];
// f()
// async function f(){
// 	let Rresults=await LessonSchema.findOne({'day':today})
// 	const onlytrue=Rresults.students
// 	for(let i=0;i<onlytrue.length;i++)
// 	{
// 		if(onlytrue[i].arrived==false)
// 		{
// 			names_True_Lesson.push(onlytrue[i].name)
// 		}
// 		else if(onlytrue[i].arrived==true){
// 			names_False_Lesson.push(onlytrue[i].name)
// 		}

// 	}
// 	console.log("TRUE NAMES:",names_True_Lesson)
// 	console.log("FALSE NAMES:",names_False_Lesson)
// 	console.log("IN")
// }




// //רשימה שהמצלמה עדכנה dailyAttendance

// let names_True_Camera=[];
// let names_False_Camera=[];
// g()
// async function g(){
// 	let Rresults=await DailyAttendanceSchema.findOne({'day':today})
// 	console.log(Rresults)
// 	const onlytrue=Rresults.students
// 	for(let i=0;i<onlytrue.length;i++)
// 	{
// 		if(onlytrue[i].arrive==true)
// 		{
// 			names_True_Camera.push(onlytrue[i].name)
// 		}
// 		else if(onlytrue[i].arrive==false)
// 		{
// 			names_False_Camera.push(onlytrue[i].name)
// 		}

// 	}
// 	console.log("TRUE NAMES:",names_True_Camera)
// 	console.log("FALSE NAMES:",names_False_Camera)
// 	console.log("IN")
// }







//רשימת תלמידים עם מספרי טלפון


// g()
// async function g(){
	
// 	const Rresults=await studentsListSchema.findOne({})
// 	console.log(Rresults)
// }





// require('dotenv').config()
// const twilio=require('twilio');
// let now = new Date(); 
// //console.log(now)
// const schedule = require('node-schedule');

// 	const sdate=new Date(now)
// 	sdate.setHours(17,0,0)//time to send message
// 	//console.log(sdate)
// 	schedule.scheduleJob(sdate, ()=>{
// 		console.log('start');
// 		mesP()
// 	console.log('end');
// 	});

 
// var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
// var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

// let Mymessage='judy modi'
// let Yournumber='+972523190543'
// let MyNumber='+12184141637'



// function mesP(){
// 	console.log(".........")
// 	var client=new twilio(accountSid,authToken)

// 	client.messages
// 	.create({
// 		from:MyNumber,
// 		to:Yournumber,
// 		body:Mymessage
// })
// 	.then(message=>console.log(message.sid)).done();
// 	console.log(".........")
// }















