import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert, Pressable } from 'react-native';
import style from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { Card } from '../../components/Card'
import { BodyText } from '../../components/BodyText'
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';


export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  

  const submitData =  async  () => {
    let action;
    action = authActions.login( email, password);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      const error =  await err.message
      setIsLoading(false);
      printError(error);
      
    }

  }

  const printError = (error) => {
    if(error){
      Alert.alert(
        error,
       '',
       [
        { 
          text:'הבנתי', 
          onPress: () =>  {}, 
        }
       ]
     )
    }
   
  };

  
  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}} >
        <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}>
          
            <Card>
              <View style={{textAlign: "center", alignItems: 'center'}}>
                  <BodyText style={style.header} > כניסה למערכת</BodyText>
                  <BodyText style={style.Bodytext} > הכנס מייל:</BodyText>
                  <Input
                  onChangeText={(text) => {SetEmail(text)}}
                  value={email}
                  />
                  <BodyText style={style.Bodytext} > הכנס סיסמא:</BodyText>
                  <View style={style.inputContainer}>
                    <Input 
                    onChangeText={(text) => {SetPassword(text)}}
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
                  <View style={style.button}>
                    <MainButton
                    styleMainButtonView={{...style.homePageBorderButton, ...style.myButtonStyle}}
                    styleMainButtonText={style.homePageButton}
                    onPress={submitData} 
                    >
                      היכנס
                    </MainButton>
                
                  </View>
                  <View style={style.button}>
                    <MainButton
                      styleMainButtonView={{...style.homePageBorderButton, ...style.myButtonStyle}}
                      styleMainButtonText={style.forgetPasswordButton}
                      onPress={() => {}} 
                      >
                        שכחתי סיסמה
                      </MainButton>
                    </View>
              </View>
            </Card>
         
        </ LinearGradient>
      </ TouchableWithoutFeedback>
  );
}

LogIn.navigationOptions = {
  headerTitle: 'התחברות'
};

export default LogIn