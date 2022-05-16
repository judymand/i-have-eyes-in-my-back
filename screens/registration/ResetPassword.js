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
  const [passwordLevel,setPasswordLevel] = useState('')
  const email = props.navigation.getParam('Email')
  const passwordVisibility = useTogglePasswordVisibility();
  const verifyPasswordVisibility = useTogglePasswordVisibility();
  const errorText = "הסיסמא שהכנסת לא זהה"

  const submitData =  async () => {
    try{
  
      if(password === verifyPassword){
        const resData = await auth.ResetPassword(email, password)
        Alert.alert(
          resData.message,
          '',
        [
          { 
            text: resData.list.textButton, 
            onPress: () => props.navigation.navigate(resData.list.pageName),     
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
        setPasswordLevel('סיסמה חזקה')
      } else if(mediumPassword.test(password)  === true){
        setCheckStrongPassword('blue')
        setPasswordLevel('סיסמה בינונית')
      } else{
        setCheckStrongPassword('red')
        setPasswordLevel('סיסמה חלשה')
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
                  secureTextEntry={passwordVisibility.passwordVisibility}
                  value={password}
                  enablesReturnKeyAutomatically
                  />
                  <Pressable onPress={passwordVisibility.handlePasswordVisibility}
                  style={style.inputContainerPassword}
                  >
                    <MaterialCommunityIcons name={passwordVisibility.rightIcon} size={22} color="#232323" />
                  </Pressable>
                </View>
                <BodyText  style={{color: "red",fontSize: 12}}>  {password === ""  ? "" : passwordLevel} </BodyText>
              <BodyText style={style.Bodytext} > וידוי סיסמא:</BodyText>
              <View style={{...style.inputContainer, ...verifyPassword === '' ? style.inputContainer : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid }}>
                  <Input 
                  style={ style.input } 
                  onChangeText={SetVerifyPassword}
                  textContentType='newPassword'
                  secureTextEntry={verifyPasswordVisibility.passwordVisibility}
                  value={verifyPassword}
                  enablesReturnKeyAutomatically
                  />
                  <Pressable onPress={verifyPasswordVisibility.handlePasswordVisibility}
                  style={style.inputContainerPassword}
                  >
                    <MaterialCommunityIcons name={verifyPasswordVisibility.rightIcon} size={22} color="#232323" />
                  </Pressable>
                </View>
                <BodyText  style={{color: "red",fontSize: 12}}>  {password === verifyPassword || verifyPassword === "" ? "" : errorText} </BodyText>

              
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