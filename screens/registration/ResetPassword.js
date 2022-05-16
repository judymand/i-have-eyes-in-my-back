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
import { checkPassword } from '../../functional/passwordValid'

export const ResetPassword = (props) => {
  

  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const [passwordLevel,setPasswordLevel] = useState('')
  const email = props.navigation.getParam('Email')
  const passwordVisibility = useTogglePasswordVisibility();
  const verifyPasswordVisibility = useTogglePasswordVisibility();
  const errorText = "הסיסמא שהכנסת לא זהה"
  const checkPassword1 = checkPassword(password) 
  const checkPasswordVerify = checkPassword(verifyPassword) 

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

  

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
       <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}>
          
      <Card > 
        <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> איפוס סיסמה  </BodyText>
           
              <BodyText style={style.Bodytext} > סיסמא:</BodyText>
              <View style={{...style.inputContainer, ...password === '' ? style.inputContainer : checkPassword1.color === 'red' ? style.noValid : checkPassword1.color === 'blue' ? style.mediumPasswordStyle : style.Valid }}>
                  <Input 
                  style={ style.input } 
                  onChangeText={ SetPassword }
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
                <BodyText  style={{color: "red",fontSize: 12}}>  {password === ""  ? "" : checkPassword1.passwordLevel} </BodyText>
              <BodyText style={style.Bodytext} > וידוי סיסמא:</BodyText>
              <View style={{...style.inputContainer, ...verifyPassword === '' ? style.inputContainer : checkPasswordVerify.color === 'red' ? style.noValid : checkPasswordVerify.color === 'blue' ? style.mediumPasswordStyle : style.Valid }}>
                  <Input 
                  style={ style.input } 
                  onChangeText={ SetVerifyPassword }
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