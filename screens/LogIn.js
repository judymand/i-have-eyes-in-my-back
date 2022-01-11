import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import style from '../styles/GlobalStyle'
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { BodyText } from '../components/BodyText'





export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  
  const submitData=()=>{
    console.log("LOGIN!!!!!!!!!!!")
    fetch("http://10.0.0.5:3000/login",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
  
      })
    })
    
    .then(res=>res.json())
  
    //props.navigation.navigate('HomePage')
  
  }
  

  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
         <View style={style.viewContainerCard}>
          <Card>
              <View style={{textAlign: "center", alignItems: 'center'}}>
                  <BodyText style={style.header} > Log In</BodyText>
                  <BodyText style={style.Bodytext} > Email:</BodyText>
                  <Input
                  onChangeText={(text) => {SetEmail(text)}}
                  value={email}
                  />
                  <BodyText style={style.Bodytext} > Password:</BodyText>
                  <Input 
                  onChangeText={(text) => {SetPassword(text)}}
                  value={password}
                  />

                  <View style={style.button}>
                    <Button title="Log In" onPress={submitData }/>
                  </View>
              </View>
            </Card>
          </View>
        </ TouchableWithoutFeedback>
  );
}


export default LogIn