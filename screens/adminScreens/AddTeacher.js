import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'


export const AddTeacher = (props) => {
  const [email, SetEmail] = useState('')
  const [ValideEmail, SetValideEmail] = useState(false)

  const submitData=()=>{
    console.log("Add!!!!!!!!!!!!")
    fetch("http://10.0.0.5:3000/addTeacher",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email
      })
    })
    
    .then(res=>res.json())
     
 
  }

  const validateEmail  = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      SetValideEmail(false)
      SetEmail(text)
    }
    else {
      SetValideEmail(true)
      SetEmail(text)
    }
  }

  return (

    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <View style={style.viewContainerCard}>
        <Card>
          <BodyText style={style.header} > Add a new teacher</BodyText>
          <View style={{textAlign: "center", alignItems: 'center'}}>
          
            <BodyText style={style.Bodytext} > Email: </BodyText>
            <Input
            style={ email === '' ? style.input : ValideEmail ? style.Valid : style.noValid} 
            onChangeText={(text) => {validateEmail(text)}}
            value={email}
            /> 
            <View style={style.button}>
              <Button 
                title="Add" onPress={submitData}/>
            </View>
          </View>
        </Card>
      </View>
    </ TouchableWithoutFeedback>
       
  );
}
  export default AddTeacher