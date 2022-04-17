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


const today='17/04/2022';
const Ttime='23:40'
//התחברות מסד נתונים
require('dotenv').config()
 require('./db');
 let List_of_students_in_a_school=[]
 let List_of_students_not_in_a_school=[]
 //let List_of_students_who_did_not_attend_class_but_is_in_school=[{ClassName:"",Profession:[],name:"",phone:""}];
 class Class_of_students{
	 constructor(ClassName,Profession,name,phone)
	 {
		 this.ClassName=ClassName;
		 this.Profession=Profession;
		 this.name=name;
		 this.phone=phone;
	 }
	 setphone(phone){
		 this.phone=phone;
	 }
 }
let SizeOfStudent
	List_of_students_who_did_not_attend_class_but_is_in_school= new Class_of_students()
	List_of_students_who_did_not_attend_class_and_not_in_school= new Class_of_students()
	let sum_of_students_who_did_not_attend_class_but_is_in_school=0
	let sum_of_students_who_did_not_attend_class_and_not_in_school=0

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

//רשימה שהמצלמה עדכנה dailyAttendance


g()
async function g(){

	let Rresults=await DailyAttendanceSchema.find({'day':today})
	const PhoneRresults=await studentsListSchema.findOne({})//מספרי טלפון ושמות

	for(let i=0;i<Rresults[0].students.length;i++)
	{
		if(Rresults[0].students[i].arrive==true)
		{
			List_of_students_in_a_school.push(Rresults[0].students[i].name)
			List_of_students_who_did_not_attend_class_but_is_in_school[sum_of_students_who_did_not_attend_class_but_is_in_school]= new Class_of_students("","",Rresults[0].students[i].name,"")
			sum_of_students_who_did_not_attend_class_but_is_in_school++;
		}
		else if(Rresults[0].students[i].arrive==false)
		{
			List_of_students_not_in_a_school.push(Rresults[0].students[i].name)
			List_of_students_who_did_not_attend_class_and_not_in_school[sum_of_students_who_did_not_attend_class_and_not_in_school]= new Class_of_students("","",Rresults[0].students[i].name,"")
			sum_of_students_who_did_not_attend_class_and_not_in_school++;
		}
	}





	for(let j=0;j<PhoneRresults.students.length;j++)
	{
		console.log("j:",j)
		for(let i=0;i<sum_of_students_who_did_not_attend_class_but_is_in_school;i++)
		{
			//console.log("in for1",PhoneRresults.students[j].name,List_of_students_who_did_not_attend_class_but_is_in_school[i].name)
			if(PhoneRresults.students[j].name===List_of_students_who_did_not_attend_class_but_is_in_school[i].name)
			{
				console.log("in1 i:",i)
				List_of_students_who_did_not_attend_class_but_is_in_school[i].setphone(PhoneRresults.students[j].phone)
				continue;
			}
			

		}
		for(let i=0;i<sum_of_students_who_did_not_attend_class_and_not_in_school;i++)
		{
		//	console.log("in for2",PhoneRresults.students[j].name,List_of_students_who_did_not_attend_class_and_not_in_school[i].name)
			if(PhoneRresults.students[j].name===List_of_students_who_did_not_attend_class_and_not_in_school[i].name)
			{
			console.log("in2 i:",i)
				List_of_students_who_did_not_attend_class_and_not_in_school[i].setphone(PhoneRresults.students[j].phone)
				continue;
			}
		}
	}


	console.log("IN G()")
	//console.log(List_of_students_who_did_not_attend_class_but_is_in_school,List_of_students_who_did_not_attend_class_and_not_in_school)

}

























//------ The names of the students in which the teacher entered true (Lesson)-----//
// let InfoPer=[
// 	{
// 	IDper:"",
// 	classNamePer:"",
// 	names_True_Lesson:[],
// 	names_False_Lesson:[],
// 	professionPer:"",
// 	}
// ]
//,'id':{$ne:InfoPer[x].IDper}





// f()
// async function f(){
// 	let Rresults=await LessonSchema.find({'day':today})
// 	console.log(Rresults)



// 	//let size=Rresults.length


// //  for(let j=0;j<size;j++)
// // {
// // 	console.log("ID:",Rresults[j].id)
// // 	console.log("profession:",Rresults[j].className)
// // 	console.log("profession:",Rresults[j].profession)
// // 	let size2=Rresults[j].students.length
// // 	//console.log(size2)
// // 	for(let i=0;i<size2;i++)
// // 	{
// // 		InfoPer[j].Name.push(Rresults[j].students[i].name)
// // 		InfoPer[j].arrived.push(Rresults[j].students[i].arrived)
// // 	}
// // 	console.log("j is",j)
// // 	console.log("NAMES",InfoPer[j].Name)
// // 	console.log("TRUE OR FALSE:",InfoPer[j].arrived)
// 	console.log("IN F()")


// // }
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















