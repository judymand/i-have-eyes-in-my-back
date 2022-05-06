import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Alert, Pressable } from 'react-native';
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { BodyText } from '../components/BodyText'
import { MainButton } from '../components/MainButton'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../store/actions/auth'
import { checkPassword } from '../functional/passwordValid'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './registration/useTogglePasswordVisibility';



export const Settings = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [data, setData] = useState('');
  const [error, setError] = useState();
  const [flag, setFlag] = useState(false)
  const [validnewPassword, setValidnewPassword] = useState(false)
  const [checkStrongPassword,setCheckStrongPassword] = useState('')
  const passwordVisibility = useTogglePasswordVisibility();
  const newPasswordVisibility = useTogglePasswordVisibility();


  const submitData =  async  () => {
    try{

      const resData = await auth.updateUser(data, firstName, lastName, password, newPassword, validnewPassword)
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
    
    }catch(error){
      console.log(error)
    }

  }

  const checkNewPassword = (text) => {
    setNewPassword(text)
    obj = checkPassword(text)
    setCheckStrongPassword(obj.color)
    if(obj.isGoodPassword){
      setValidnewPassword(true)
    }else{
      setValidnewPassword(false)
    }

  }



  useEffect(() => {

    const userDetails = async () => {
      try{

        setData(await auth.getUser())
        setFlag(true)
      }catch(error){
        console.log(error)
      }
    }
    userDetails()

  }, [])

  useEffect(() => {

    const userDetails = async () => {
      try{

        setFirstName(await data.firstName)
        setLastName(await data.lastName)
    
      }catch(error){
        console.log(error)
      }
    }
    userDetails()

  }, [flag])

  if(!flag){
    return (
      <View></View>
    )
  }


  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}} >
      <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}> 
          <Card>
            <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText style={style.header} > שינוי פרטי משתמש </BodyText>

              <BodyText style={style.Bodytext} >  שם פרטי: </BodyText>
              <Input
                  onChangeText={(text) => {setFirstName(text)}}
                  value={firstName}
                  />
              <BodyText style={style.Bodytext} > שם משפחה: </BodyText>
              <Input
                  onChangeText={(text) => {setLastName(text)}}
                  value={lastName}
                  />
              <BodyText style={style.Bodytext} > הסיסמא שלך: </BodyText>
              <View style={style.inputContainer}>
                <Input 
                onChangeText={(text) => {setPassword(text)}}
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
              <BodyText style={style.Bodytext} > הסיסמא החדשה: </BodyText>
              <View style={{...style.inputContainer,  ...newPassword === '' ? style.inputContainer : checkStrongPassword === 'red' ? style.noValid : checkStrongPassword === 'blue' ? style.mediumPasswordStyle : style.Valid}}>
                <Input 
                onChangeText={(text) => { 
                  checkNewPassword(text)
                }}
                textContentType='newPassword'
                secureTextEntry={newPasswordVisibility.passwordVisibility}
                value={newPassword}
                enablesReturnKeyAutomatically
                />
              <Pressable onPress={newPasswordVisibility.handlePasswordVisibility}
              style={style.inputContainerPassword}
              >
                <MaterialCommunityIcons name={newPasswordVisibility.rightIcon} size={22} color="#232323" />
              </Pressable>
            </View>
            </View>
            <View style={style.button} >
                    <MainButton 
                    styleMainButtonView={style.myButtonStyle}
                    styleMainButtonText={style.homePageButton}
                    onPress={submitData }>
                      שמור
                    </MainButton>
            </View>
         
          </Card>
      
      </ LinearGradient>
    </ TouchableWithoutFeedback>
  );
}
  export default Settings