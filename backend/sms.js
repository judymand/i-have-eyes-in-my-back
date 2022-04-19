// judi '+972543315931----+12184141637'
//0523190543
//0523194226
//mmyt1785@gmail.com
// ZSRX_9PTwu@=Zc^12345678

const LessonSchema = require('./models/Lesson');
const DailyAttendanceSchema = require('./models/DailyAttendance');
const studentsListSchema=require("./models/studentList");
const schedule = require('node-schedule');

//add check Classname//

//---DATE FORMAT + DATE=TODAY ---//
const Ttoday = new Date();
const yyyy = Ttoday.getFullYear();
let mm = Ttoday.getMonth() + 1; // Months start at 0!
let dd = Ttoday.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const today = dd + '/' + mm + '/' + yyyy;
console.log(today);

//---DATE FORMAT ---//



//---TIME TO START EVREY DAY ---//
const Ttime='23:40'
//---TIME TO START EVREY DAY ---//




//התחברות מסד נתונים
require('dotenv').config()
 require('./db');
 let List_of_students_in_a_school=[]
 let List_of_students_not_in_a_school=[]
 //let inSchool=[{className:"",profession:[],name:"",phone:""}];
 class Class_of_students{
	 constructor(className,profession,name,phone)
	 {
		 this.profession=[];
		 this.className=className;
		 this.profession[this.profession.length]=profession;
		 this.name=name;
		 this.phone=phone;
	 }
	 setphone(phone){
		 this.phone=phone;
	 }
	 addProfession(profession)
	{
		this.profession[this.profession.length]=profession
	}
	addProfessionArray(profession)
	{
		this.profession=[];
		let size=profession.length;
		for(let i=0;i<size;i++)
		{
			this.profession[i]=profession[i];
		}
	}


 }
	inSchool= new Class_of_students()//done
	List_of_students_who_did_not_attend_class_but_is_in_school= new Class_of_students()
	List_of_students_who_did_not_attend_class_and_not_in_school= new Class_of_students() //done
	not_in_class= new Class_of_students()
	let sum_of_student_in_school=0
	let sum_of_students_who_did_not_attend_class_but_is_in_school=0
	let sum_of_students_who_did_not_attend_class_and_not_in_school=0


    //let now = new Date(); 
	//const sdate=new Date(now)
	//sdate.setHours(17,0,0)//time to send message

	schedule.scheduleJob('00 00 17 * * 0-5', ()=>{
	console.log('start');
		g()
	console.log('end');
	});


// רשימה שהמצלמה עדכנה dailyAttendance


async function g(){

	let Rresults=await DailyAttendanceSchema.find({'day':today})//מצלמה שמזהה את מי הגיע
	const PhoneRresults=await studentsListSchema.findOne({})//מספרי טלפון ושמות
	let  Lessonresults=await LessonSchema.find({'day':today})//המורה הכניסה מי הגיע לשיעור
    //add check if no one on school or in class //


	let index=0
	let Lsize=Lessonresults.length//size->גודל של כמה קולקשנים
	a=0

	for(let i=0;i<Lsize;i++)
	{
	let LsizeStudent=Lessonresults[i].students.length//LsizeStudent->גודל של כמה סטודנטים בכל קולקשן
	for(let j=0;j<LsizeStudent;j++)
	{
	if(Lessonresults[i].students[j].arrived==false)
		{
			//בדיקה אם קיים כבר פשוט להוסיף מקצוע
			for(let x=0;x<index;x++)
			{
				if(not_in_class[x].name.localeCompare(Lessonresults[i].students[j].name)==0)
				{
					not_in_class[x].addProfession(Lessonresults[i].profession)
					a++
				}


			}
			if(a==0){
			//אם לא נמצא נוסיף את המידע כחדש באינדקס חדש
			not_in_class[index]=new Class_of_students(Lessonresults[i].className,Lessonresults[i].profession,Lessonresults[i].students[j].name.replace(/\-/, ' '),"")
			index++;
			a==0
			}
		}	
	}
	}


	for(let i=0;i<Rresults[0].students.length;i++)
	{
		if(Rresults[0].students[i].arrive==true)
		{
			List_of_students_in_a_school.push(Rresults[0].students[i].name)
			inSchool[sum_of_student_in_school]= new Class_of_students("","",Rresults[0].students[i].name,"")
			sum_of_student_in_school++;
		}
		else if(Rresults[0].students[i].arrive==false)
		{
			List_of_students_not_in_a_school.push(Rresults[0].students[i].name)
			List_of_students_who_did_not_attend_class_and_not_in_school[sum_of_students_who_did_not_attend_class_and_not_in_school]= new Class_of_students("","",Rresults[0].students[i].name,"")
			sum_of_students_who_did_not_attend_class_and_not_in_school++;
		}
	}
	let nameP
	let nameL
	for(let j=0;j<PhoneRresults.students.length;j++)
	{
		nameP=PhoneRresults.students[j].name
		nameP.replace(/\-/, ' ')
		for(let i=0;i<sum_of_student_in_school;i++)
		{
			nameL=inSchool[i].name
			nameL.replace(/\-/, ' ')
			if(nameP.localeCompare(nameL)==0)
			{
				inSchool[i].setphone(PhoneRresults.students[j].phone)
				continue;
			}
			

		}
		for(let i=0;i<sum_of_students_who_did_not_attend_class_and_not_in_school;i++)
		{
			nameL=List_of_students_who_did_not_attend_class_and_not_in_school[i].name
			nameL.replace(/\-/, ' ')
			if(nameP.localeCompare(nameL)==0)
			{
				List_of_students_who_did_not_attend_class_and_not_in_school[i].setphone(PhoneRresults.students[j].phone.replace(/\-/, ''))
				continue;
			}
		}
	}

	//compare Not in class with in school
	const size_of_sudent_not_in_class=index;
	const size_of_student_in_school=sum_of_student_in_school;

	for(let i=0;i<size_of_sudent_not_in_class;i++)
	{
		for(let j=0;j<size_of_student_in_school;j++)
		{
			if(inSchool[j].name==not_in_class[i].name)
			{
				List_of_students_who_did_not_attend_class_but_is_in_school[sum_of_students_who_did_not_attend_class_but_is_in_school]=new Class_of_students (not_in_class[i].className,"",not_in_class[i].name.replace(/\-/, ' '),inSchool[j].phone.replace(/\-/, ''))//check profession (for)
				List_of_students_who_did_not_attend_class_but_is_in_school[sum_of_students_who_did_not_attend_class_but_is_in_school].addProfessionArray(not_in_class[i].profession)
				sum_of_students_who_did_not_attend_class_but_is_in_school++
				continue;
			}

		}
	}

	console.log("IN G()")
	console.log(List_of_students_who_did_not_attend_class_but_is_in_school)
	SMS_SENDER_Breeze_from_class()
	SMS_SENDER_Breeze_from_School()
	console.log(List_of_students_who_did_not_attend_class_and_not_in_school)
}


function SMS_SENDER_Breeze_from_class(){
console.log("in SMS_SENDER_Breeze_from_class()",sum_of_students_who_did_not_attend_class_but_is_in_school)
for(let i=0;i<sum_of_students_who_did_not_attend_class_but_is_in_school;i++)
{
let phone=List_of_students_who_did_not_attend_class_but_is_in_school[i].phone.replace(/0/, "+972")
//let name=List_of_students_who_did_not_attend_class_but_is_in_school[i].name
//let profession=List_of_students_who_did_not_attend_class_but_is_in_school[i].profession
//let size_of_profession=profession.length
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "7ac87cfe",
  apiSecret: "Y6TADHof3zj4ODXh"
})


const from = "School"
const to = phone
let text="Your kid BREEZEE from the class";
vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
}
}


function SMS_SENDER_Breeze_from_School(){
	console.log("in SMS_SENDER_Breeze_from_class()",sum_of_students_who_did_not_attend_class_and_not_in_school)
	for(let i=0;i<sum_of_students_who_did_not_attend_class_and_not_in_school;i++)
	{
	let phone=List_of_students_who_did_not_attend_class_and_not_in_school[i].phone.replace(/0/, "+972")
	
	console.log(phone)
	//let name=List_of_students_who_did_not_attend_class_but_is_in_school[i].name
	//let profession=List_of_students_who_did_not_attend_class_but_is_in_school[i].profession
	//let size_of_profession=profession.length
	const Vonage = require('@vonage/server-sdk')
	
	const vonage = new Vonage({
	  apiKey: "7ac87cfe",
	  apiSecret: "Y6TADHof3zj4ODXh"
	})
	
	
	const from = "School"
	const to = phone
	let text="Your kid BREEZEE from the school";
	vonage.message.sendSms(from, to, text, (err, responseData) => {
		if (err) {
			console.log(err);
		} else {
			if(responseData.messages[0]['status'] === "0") {
				console.log("Message sent successfully.");
			} else {
				console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
			}
		}
	})
	}
	}
	





// const twilio=require('twilio');
// var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
// var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

// let Mymessage='judy modi'
// let Yournumber='+972523190543'
// let MyNumber='+12184141637'


// mesP()
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





// //  //הוספה של משתנה חדש ללסון
// // new LessonSchema({
// // 	className:"א2",
// // 	profession:"חשבון",
// // 	day:today,
// // 	time:Ttime,
// // 	students:[
// // 		{
// // 		name:"סיטארה אלייב",
// // 		arrived:true
// // 		},
// // 		{
// // 		name:"דודי ביטון",
// // 		arrived:true
// // 		},
// // 		{
// // 		name:"יהודית מנדלבוים",
// // 		arrived:false
// // 		}
// // 	]

// // }).save()

// let h="י-י"
// let d="י י"
// let a="ר"

// a=h.replace(/\-/, ' ')
// console.log(a);

// //console.log (d.localeCompare(h,'he'))




