import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import style from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { BodyText } from '../../components/BodyText'





export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  
  const submitData =  async () => {
    
    try{
    
      let response = await fetch("http://localhost:3000/login",
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

      const resData = await response.json()

      if(response.status == 201 || response.status == 401 ){
        Alert.alert(
          resData.message,
          '',
        [
          { 
            text: resData.textButton, 
            onPress: () => props.navigation.navigate(resData.pageName),     
          }
        ]
        )
      }else{
        Alert.alert(
          'משהו השתבש, נסה שנית מאוחר יותר.',
          '',
        [
          { 
            text: 'חזרה לעמוד הבית', 
            onPress: () => props.navigation.navigate('HomePage'), 
          }
        ]  
        )
      }
   

    }catch{
      (err) => {console.log(err)}

    }
  
  }
  

  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
         <View style={style.viewContainerCard}>
          <Card>
              <View style={{textAlign: "center", alignItems: 'center'}}>
                  <BodyText style={style.header} > כניסה למערכת</BodyText>
                  <BodyText style={style.Bodytext} > הכנס מייל:</BodyText>
                  <Input
                  onChangeText={(text) => {SetEmail(text)}}
                  value={email}
                  />
                  <BodyText style={style.Bodytext} > הכנס סיסמא:</BodyText>
                  <Input 
                  onChangeText={(text) => {SetPassword(text)}}
                  value={password}
                  />

                  <View style={style.button}>
                    <Button title="היכנס" onPress={submitData }/>
                  </View>
              </View>
            </Card>
          </View>
        </ TouchableWithoutFeedback>
  );
}


export default LogIn