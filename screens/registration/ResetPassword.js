import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert, Pressable } from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../../store/actions/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';

export const ResetPassword = (props) => {
  

  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const [checkSamePassword,setCheckSamePassword] = useState(false)
  const email = props.navigation.getParam('Email')
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  

  const submitData =  async () => {
    try{
  
      const response = await auth.signup(firstName, lastName, email, admin, password)
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
       <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}>
          
      <Card > 
        <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> איפוס סיסמה  </BodyText>
           
              <BodyText style={style.Bodytext} > סיסמא:</BodyText>
              <View style={{...style.inputContainer, ...password === '' ? style.inputContainer : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid }}>
                  <Input 
                  style={ style.input } 
                  onChangeText={checkPassword}
                  textContentType='newPassword'
                  secureTextEntry={passwordVisibility}
                  value={password}
                  enablesReturnKeyAutomatically
                  />
                  <Pressable onPress={handlePasswordVisibility}
                  style={style.inputContainerPassword}
                  >
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                  </Pressable>
                </View>
              <BodyText style={style.Bodytext} > וידוי סיסמא:</BodyText>
              <Input 
              style={ verifyPassword === '' ? style.input : checkSamePassword ? style.Valid : style.noValid} 
              onChangeText={samePassword}
              value={verifyPassword}
              /> 
              <View style={style.button}>
                <MainButton
                styleMainButtonView={{...style.homePageBorderButton, ...style.myButtonStyle}}
                styleMainButtonText={style.homePageButton}
                onPress={submitData} 
                >
                  היכנס
                </MainButton>
              </View>
            
          </View>
        </Card>
      </LinearGradient>
    </TouchableWithoutFeedback>
       
  );
}

ResetPassword.navigationOptions = {
  headerTitle: 'הרשמה למערכת'
};


export default ResetPassword