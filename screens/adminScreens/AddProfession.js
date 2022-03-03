import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

export const AddProfession = (props) => {

  const [profession, SetProfession] = useState('')
  const token = useSelector(state => state.authReducer.token);

  const submitData = async () => {
    
    try{  
      let response = await fetch("http://localhost:3000/AddProfession",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
          profession
        })
      })
      const resData = await response.json()
  
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

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
        <Card>
          <BodyText style={style.header} > הוסף מקצוע </BodyText>
          <BodyText style={style.Bodytext} >  הוסף מקצוע חדש למקצועות הלימוד הנלמדים בבית הספר </BodyText>
          <View style={{textAlign: "center", alignItems: 'center'}}>
          
            <BodyText style={style.Bodytext} > שם המקצוע: </BodyText>
            <Input
            onChangeText={(text) => {SetProfession(text)}}
            value={profession}
            /> 
            <View style={style.button}>
              <Button 
                title="הוסף" onPress={submitData}/>
            </View>
          </View>
        </Card>
      </LinearGradient>
    </ TouchableWithoutFeedback>
  );
}
  export default AddProfession