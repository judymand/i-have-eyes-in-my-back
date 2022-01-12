import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'

export const AddProfession = (props) => {

  const [profession, SetProfession] = useState('')

  const submitData=()=>{
    console.log("Add!!!!!!!!!!!!")
    fetch("http://10.0.0.5:3000/AddProfession",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        profession
      })
    })
    
    .then(res=>res.json())
  }

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <View style={style.viewContainerCard}>
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
      </View>
    </ TouchableWithoutFeedback>
  );
}
  export default AddProfession