import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import style  from '../styles/GlobalStyle'
import Input from '../components/Input'
import Title from '../components/Title'
import Card from '../components/Card'
 

export const SignUp = () => {
 
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [VerifyPassword, SetVerifyPassword] = useState('')
  const [ValideEmail, SetValideEmail] = useState(true)


  const checkPassword = (Password) => {
    SetPassword(Password)
  }

  const validateEmail  = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      // SetValideEmail('red')
      SetValideEmail(false)
      SetEmail(text)
    }
    else {
      SetValideEmail(true)
      SetEmail(text)
      // SetValideEmail('green') 
    }
  }

  const verifyPassword = (Password) => {
    SetVerifyPassword(Password)
    // if(Password != VerifyPassword){
    //   borderVerifyPassword 
    // }

  }

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <Card> 
        <View style={style.container}>
              <Title style={style.header}>Sign Up</Title>
              <Title  style={style.text}> Email: </Title>
              <Input 
              style={ Email === '' ? style.input : ValideEmail ? style.Valid : style.noValid} 
              onChangeText={validateEmail}
              value={Email}
              />
              <Title style={style.text} > Password:</Title>
              <Input 
              style={{color:'black' }} 
              onChangeText={checkPassword}
              value={Password}
              />
              <Title style={style.text} > Verify Password:</Title>
              <Input 
              style={{color:'black' }}
              onChangeText={verifyPassword}
              value={VerifyPassword}
              /> 
              <View style={style.button}>
              <Button 
                title="Sign Up"/>
              </View>
            
          </View>
        </Card>
    </TouchableWithoutFeedback>
       
  );
}


export default SignUp