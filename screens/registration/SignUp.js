import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert, Pressable } from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../../store/actions/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import { checkPassword, samePassword } from '../../functional/passwordValid'

export const SignUp = (props) => {
  
  const [firstName, SetfirstName] = useState('')
  const [lastName, SetLastName] = useState('')
  const [password, SetPassword] = useState('')
  const [verifyPassword, SetVerifyPassword] = useState('')
  const email = props.navigation.getParam('Email')
  const admin = props.navigation.getParam('Admin')
  const passwordVisibility = useTogglePasswordVisibility();
  const verifyPasswordVisibility = useTogglePasswordVisibility();

  const checkPassword1 = checkPassword(password) 
  const checkSamePassword = samePassword(password, verifyPassword)

  const submitData =  async () => {
    try{

      if(checkSamePassword.checkSamePassword){
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
      }else{
        Alert.alert(
          'הסיסמאות שהזנת לא זהות.',
          '',
        [
          { 
            text: 'הבנתי', 
           
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
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> הרשמה  </BodyText>
              <BodyText  style={style.Bodytext}> שם פרטי: </BodyText>
              <Input 
              style={style.input} 
              onChangeText={(text) => {
                text.charAt(text.length -1) === " " ? {} : SetfirstName(text)}
              }
              value={firstName}
              />

              <BodyText  style={style.Bodytext}> שם משפחה: </BodyText>
                <Input 
                style={style.input} 
                onChangeText={(text) => {
                  text.charAt(text.length -1) === " " ? {} : SetLastName(text)}
                }
                value={lastName}
                />
              <BodyText style={style.Bodytext} > סיסמא:</BodyText>
              <View style={{...style.inputContainer, ...password === '' ? style.inputContainer : checkPassword1.color === 'red' ? style.noValid : checkPassword1.color === 'blue' ? style.mediumPasswordStyle : style.Valid }}>
                  <Input 
                  style={ style.input } 
                  onChangeText={(text) => {
                    text.charAt(text.length -1) === " " ? {} : SetPassword(text)}
                  }
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
                <BodyText  style={{color: checkPassword1.color,fontSize: 12}}>  {password === ""  ? "" : checkPassword1.passwordLevel} </BodyText>
              <BodyText style={style.Bodytext} > וידוי סיסמא:</BodyText>
              <View
                style={ {...style.inputContainer, ...verifyPassword === '' ? style.inputContainer : checkSamePassword.checkSamePassword ? style.Valid : style.noValid}} >
                <Input 
                style={ style.input } 
                onChangeText={(text) => 
                  text.charAt(text.length -1) === " " ? {} : SetVerifyPassword(text)}
                secureTextEntry={verifyPasswordVisibility.passwordVisibility}
                value={verifyPassword}
                /> 
                  <Pressable onPress={verifyPasswordVisibility.handlePasswordVisibility}
                    style={style.inputContainerPassword}
                    >
                      <MaterialCommunityIcons name={passwordVisibility.rightIcon} size={22} color="#232323" />
                    </Pressable>
              </View>
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

SignUp.navigationOptions = {
  headerTitle: 'הרשמה למערכת'
};


export default SignUp