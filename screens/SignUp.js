import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert  } from 'react-native';
import style  from '../styles/GlobalStyle'
import { Input } from '../components/Input'
import { BodyText } from '../components/BodyText'
import { Card } from '../components/Card'
 




export const SignUp = () => {
  

  const [firstName, SetfirstName] = useState('')
  const [lastName, SetLastName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const [ValideEmail, SetValideEmail] = useState(false)
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const [checkSamePassword,setCheckSamePassword] = useState(false)

  const submitData=()=>{
    console.log("SDADASDSDASDASDAD")
    fetch("http://10.200.201.216:3000/signup",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        firstName,
        lastName,
        email,
        password
 

      })
    })
    
    .then(res=>res.json())

 
  }
  const checkPassword = (Password) => {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    SetPassword(Password)
      if(strongPassword.test(password)  === true) {
        setCheckStrongPassword("green")
      } else if(mediumPassword.test(password)  === true){
        setCheckStrongPassword('blue')
      } else{
        setCheckStrongPassword('red')
      }
  }

  const validateEmail  = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      SetValideEmail(false)
      SetEmail(text)
    }
    else {
      SetValideEmail(true)
      SetEmail(text)
    }
  }

  const samePassword = (text) => {
    SetVerifyPassword(text) 
     console.log(password)
     console.log(verifyPassword)
     console.log(checkStrongPassword)
     if(checkStrongPassword === "green"){
    if(password === verifyPassword ){
      setCheckSamePassword(true)
    }
  }
    else{
      setCheckSamePassword(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <View style={style.viewContainerCard}>
        <Card > 
          <View style={{textAlign: "center", alignItems: 'center'}}>
                <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> Sign Up  </BodyText>
                <BodyText  style={style.Bodytext}> First name: </BodyText>
                <Input 
                style={style.input} 
                onChangeText={(text) => {SetfirstName(text)}}
                value={firstName}
                />

                <BodyText  style={style.Bodytext}> Last name: </BodyText>
                  <Input 
                  style={style.input} 
                  onChangeText={(text) => {SetLastName(text)}}
                  value={lastName}
                  />

                <BodyText  style={style.Bodytext}> Email: </BodyText>
                <Input 
                style={ email === '' ? style.input : ValideEmail ? style.Valid : style.noValid} 
                onChangeText={validateEmail}
                value={email}
                />
                <BodyText style={style.Bodytext} > Password:</BodyText>
                <Input 
                style={ password === '' ? style.input : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid } 
                onChangeText={checkPassword}
                value={password}
                />
                {/* <BodyText style={style.Bodytext} > Verify Password:</BodyText>
                <Input 
                style={ verifyPassword === '' ? style.input : checkSamePassword ? style.Valid : style.noValid} 
                onChangeText={samePassword}
                value={verifyPassword}
                />  */}
                <View style={style.button}>
                <Button 
                  title="Sign Up" onPress={submitData}/>
                </View>
              
            </View>
          </Card>
        </View>
    </TouchableWithoutFeedback>
       
  );
}


export default SignUp