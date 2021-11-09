import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import style  from '../styles/GlobalStyle'
import Input from '../components/Input'
import Title from '../components/Title'
import Card from '../components/Card'
 

export const SignUp = () => {
 
  firstName
  const [firstName, SetfirstName] = useState('')
  const [lastName, SetLastName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const [ValideEmail, SetValideEmail] = useState(false)
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const [checkSamePassword,setCheckSamePassword] = useState(false)


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
    // console.log(password)
    // console.log(verifyPassword)
    // console.log(checkStrongPassword)
    if(password === verifyPassword && checkStrongPassword === "green"){
      setCheckSamePassword(true)
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
                <Title  style={{fontWeight: 'bold',fontSize: 22}}> Sign Up  </Title>
                <Title  style={style.text}> First name: </Title>
                <Input 
                style={style.input} 
                onChangeText={(text) => {SetfirstName(text)}}
                value={firstName}
                />

                <Title  style={style.text}> Last name: </Title>
                  <Input 
                  style={style.input} 
                  onChangeText={(text) => {SetLastName(text)}}
                  value={lastName}
                  />

                <Title  style={style.text}> Email: </Title>
                <Input 
                style={ email === '' ? style.input : ValideEmail ? style.Valid : style.noValid} 
                onChangeText={validateEmail}
                value={email}
                />
                <Title style={style.text} > Password:</Title>
                <Input 
                style={ password === '' ? style.input : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid } 
                onChangeText={checkPassword}
                value={password}
                />
                <Title style={style.text} > Verify Password:</Title>
                <Input 
                style={ verifyPassword === '' ? style.input : checkSamePassword ? style.Valid : style.noValid} 
                onChangeText={samePassword}
                value={verifyPassword}
                /> 
                <View style={style.button}>
                <Button 
                  title="Sign Up"/>
                </View>
              
            </View>
          </Card>
        </View>
    </TouchableWithoutFeedback>
       
  );
}


export default SignUp