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
 //let inSchool=[{className:"",profession:[],name:"",phone:""}];
 class Class_of_students{
	 constructor(className,profession,name,phone)
	 {
		
		 this.className=className;
		 this.profession=[];
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
	 


 }
	inSchool= new Class_of_students()//done
	List_of_students_who_did_not_attend_class_but_is_in_school= new Class_of_students()
	List_of_students_who_did_not_attend_class_and_not_in_school= new Class_of_students() //done
	not_in_class= new Class_of_students()
	let sum_of_students_who_did_not_attend_class_but_is_in_school=0
	let sum_of_students_who_did_not_attend_class_and_not_in_school=0

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





// רשימה שהמצלמה עדכנה dailyAttendance

g()
async function g(){

	let Rresults=await DailyAttendanceSchema.find({'day':today})
	const PhoneRresults=await studentsListSchema.findOne({})//מספרי טלפון ושמות
	let  Lessonresults=await LessonSchema.find({'day':today})
	let index=0
	let Lsize=Lessonresults.length//size->גודל של כמה קולקשנים
	a=0

	for(let i=0;i<Lsize;i++)
	{
	let LsizeStudent=Lessonresults[i].students.length//LsizeStudent->גודל של כמה סטודנטים בכל קולקשן
	for(let j=0;j<LsizeStudent;j++)
	{
		console.log("i:",i,"j:",j)
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
			inSchool[sum_of_students_who_did_not_attend_class_but_is_in_school]= new Class_of_students("","",Rresults[0].students[i].name,"")
			sum_of_students_who_did_not_attend_class_but_is_in_school++;
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
		for(let i=0;i<sum_of_students_who_did_not_attend_class_but_is_in_school;i++)
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
				List_of_students_who_did_not_attend_class_and_not_in_school[i].setphone(PhoneRresults.students[j].phone)
				continue;
			}
		}
	}

	//compare Not in class with in school





	console.log("IN G()")
	console.log(".......",inSchool,".......",List_of_students_who_did_not_attend_class_and_not_in_school,"............",not_in_class,".......")
}









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















