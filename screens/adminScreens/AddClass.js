import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'

export const AddClass = (props) => {
  
  const [newClassRoom, SetNewClassRoom] = useState('')
  const [newClassNumber, SetnewClassNumber] = useState('')


  const submitData=()=>{
    console.log("Add!!!!!!!!!!!!")
    fetch("http://10.0.0.5:3000/AddClassRoom",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        newClassRoom,
        newClassNumber
      })
    })
    
    .then(res=>res.json())
     
 
  }

  return (

    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <View style={style.viewContainerCard}>
        <Card>
          <BodyText style={style.header} > Add a new class</BodyText>
          <View style={{textAlign: "center", alignItems: 'center'}}>
          
            <BodyText style={style.Bodytext} > Class: </BodyText>
            <Input
            onChangeText={(text) => {SetNewClassRoom(text)}}
            value={newClassRoom}
            /> 
            <BodyText style={style.Bodytext} > Class Number: </BodyText>
            <Input
            onChangeText={(text) => {SetnewClassNumber(text)}}
            keyboardType='numeric'
            value={newClassNumber}
            /> 
            <View style={style.button}>
              <Button 
                title="Add" onPress={ submitData}/>
            </View>
          </View>
        </Card>
      </View>
    </ TouchableWithoutFeedback>
       
  );
}
  export default AddClass