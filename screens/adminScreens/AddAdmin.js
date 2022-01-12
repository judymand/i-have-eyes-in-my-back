import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'

export const AddAdmin = (props) => {

  const [email, SetEmail] = useState('')
  const [valideEmail, SetValideEmail] = useState(false)
  const [newMessage, SetNewMessage] = useState('')


  const submitData=()=>{
    console.log("Add!!!!!!!!!!!!")
    fetch("http://10.0.0.5:3000/addAdmin",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email
      })
    })
    .then(res=> res.json() )
    // .then(res => {
    //   res.json()
    //   console.log(JSON.stringify(res))
    //   console.log('1')

    //   if(JSON.stringify(res.message)){
    //     SetNewMessage(JSON.stringify(res.message))
    //   }
    // })
    // .then(result => {
    //   console.log('2')
    //   console.log(result)
    //   console.log('3')
    //   if(JSON.stringify(result.message)){
        
    //     SetNewMessage(JSON.stringify(result.message))
    //   }
    // })

    Alert.alert(newMessage)
 
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
          <BodyText style={style.header} > הוספת משתמש אדמין/מנהל חדש</BodyText>
          <BodyText style={style.BodyText} >  ע״י הוספת הדואר האלקטרוני של המנהל, המנהל יוכל להירשם לאפליקציה כאדמין</BodyText>
          <View style={{textAlign: "center", alignItems: 'center'}}>
          
            <BodyText style={style.Bodytext} > דואר אלקטרוני: </BodyText>
            <Input
            style={ email === '' ? style.input : valideEmail ? style.Valid : style.noValid} 
            onChangeText={(text) => {validateEmail(text)}}
            value={email}
            /> 
            <View style={style.button}>
              <Button title="הוסף" onPress={submitData}/>
            </View>
          </View>
        </Card>
      </View>
    </ TouchableWithoutFeedback>
  
    
  );
}
  export default AddAdmin