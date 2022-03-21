import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import style from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { BodyText } from '../../components/BodyText'
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

 

  const submitData =  async  () => {
    let action;
    action = authActions.login( email, password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }

  }

  
  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}} >
        <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
          
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
         
        </ LinearGradient>
      </ TouchableWithoutFeedback>
  );
}

LogIn.navigationOptions = {
  headerTitle: 'התחברות'
};

export default LogIn