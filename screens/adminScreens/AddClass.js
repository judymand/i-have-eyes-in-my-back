import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button, Alert, ImageBackground } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

export const AddClass = (props) => {
  
  const [newClassRoom, SetNewClassRoom] = useState('')
  const [newClassNumber, SetnewClassNumber] = useState('')
  const token = useSelector(state => state.authReducer.token);

  const submitData = async () => {
    

    try{

      let response = await fetch("http://localhost:3000/AddClassRoom",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
          newClassRoom,
          newClassNumber
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
      {/* <ImageBackground source={require("../../assets/logo.jpeg")}  style={[style.image,{alignItems:'center', justifyContent: 'center',  opacity: 0.8}]} > */}
        <Card style={ {backgroundColor: '#d9e6f2'}}>
          <BodyText style={style.header} > הוסף כיתה חדשה </BodyText>
          <View style={{textAlign: "center", alignItems: 'center'}}>
          
            <BodyText style={style.Bodytext} > כיתה: </BodyText>
            <Input
            onChangeText={(text) => {SetNewClassRoom(text)}}
            value={newClassRoom}
            /> 
            <BodyText style={style.Bodytext} > מספר כיתה: </BodyText>
            <Input
            onChangeText={(text) => {SetnewClassNumber(text)}}
            keyboardType='numeric'
            value={newClassNumber}
            /> 
            <View style={style.button}>
              <Button 
                title="הוסף" onPress={ submitData}/>
            </View>
          </View>
        </Card>
        {/* </ImageBackground> */}
      </LinearGradient>
    </ TouchableWithoutFeedback>
       
  );
}
  export default AddClass