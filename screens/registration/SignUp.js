import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
// import { computeWindowedRenderLimits } from 'react-native/Libraries/Lists/VirtualizeUtils';
 

export const SignUp = (props) => {
  
  const [firstName, SetfirstName] = useState('')
  const [lastName, SetLastName] = useState('')
  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const [checkSamePassword,setCheckSamePassword] = useState(false)
  const email = props.navigation.getParam('Email')
  const admin = props.navigation.getParam('Admin')

  const submitData =  async () => {
    try{
  
      let response = await fetch("http://localhost:3000/signup",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          firstName,
          lastName,
          email,
          admin,
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


  const samePassword = (text) => {
    SetVerifyPassword(text) 
    //  console.log(password)
     console.log(verifyPassword)
    //  console.log(checkStrongPassword)
    if(checkStrongPassword === "green"){
    if(password === verifyPassword){
      setCheckSamePassword(true)
    }else{
      setCheckSamePassword(false)
    }
  }
    else{
      setCheckSamePassword(false)
    }
  }



  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
       <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
          
      <Card > 
        <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> הרשמה  </BodyText>
              <BodyText  style={style.Bodytext}> שם פרטי: </BodyText>
              <Input 
              style={style.input} 
              onChangeText={(text) => {SetfirstName(text)}}
              value={firstName}
              />

              <BodyText  style={style.Bodytext}> שם משפחה: </BodyText>
                <Input 
                style={style.input} 
                onChangeText={(text) => {SetLastName(text)}}
                value={lastName}
                />
              <BodyText style={style.Bodytext} > סיסמא:</BodyText>
              <Input 
              style={ password === '' ? style.input : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid } 
              onChangeText={checkPassword}
              value={password}
              />
              {/* <BodyText style={style.Bodytext} > וידוי סיסמא:</BodyText>
              <Input 
              style={ verifyPassword === '' ? style.input : checkSamePassword ? style.Valid : style.noValid} 
              onChangeText={samePassword}
              value={verifyPassword}
              />  */}
              <View style={style.button}>
              <Button 
                title="הירשם" onPress={ submitData }/>
              </View>
            
          </View>
        </Card>
      </LinearGradient>
    </TouchableWithoutFeedback>
       
  );
}

SignUp.navigationOptions = {
  headerTitle: 'הרשמה למערכת'
};


export default SignUp