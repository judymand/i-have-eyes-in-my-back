// judi '+972543315931----+12184141637'
//0523190543
//mmyt1785@gmail.com
// ZSRX_9PTwu@=Zc^12345678
require('dotenv').config()
const twilio=require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console


let Mymessage='judy modi'
let Yournumber='+972523190543'
let MyNumber='+12184141637'



console.log(".........")
var client=new twilio(accountSid,authToken)

client.messages
.create({
	from:MyNumber,
	to:Yournumber,
	body:Mymessage
})
.then(message=>console.log(message.sid)).done();
console.log(".........")
















