import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { BodyText } from '../components/BodyText'
import { MainButton } from '../components/MainButton'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../store/actions/auth'



export const Settings = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {

    const userDetails = async () => {
      try{
        setData(await auth.getUser())
        setFirstName(await data.firstName)
        setLastName(await data.lastName)
        setPassword(await data.password)

      }catch(error){
        console.log(error)
      }
    }
    userDetails()

  }, [])



  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}} >
      <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}> 
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
              <BodyText style={style.Bodytext} > סיסמא: </BodyText>
              <Input
                  onChangeText={(text) => {setPassword(text)}}
                  value={password}
                  />
            </View>
            <View style={style.button}>
                    <MainButton onPress={() => {} }>
                      שמור
                    </MainButton>
            </View>
          </Card>
      
      </ LinearGradient>
    </ TouchableWithoutFeedback>
  );
}
  export default Settings