import React from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import style from '../styles/GlobalStyle'
import Input from '../components/Input'
 

export const LogIn = () => {
 
    // const [Email, SetEmail] = useState('')
    // const [Password, SetPassword] = useState('')


  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
          <View style={style.container}>
              <Text style={style.header} > Log In</Text>
              <Text style={style.text} > Email:</Text>
              <Input style={{color:'black' }}/>
              <Text style={style.text} > Password:</Text>
              <Input style={{color:'black' }}/>

              <Button title="Log In"/>
              
          </View>
        </ TouchableWithoutFeedback>
  );
}


export default LogIn