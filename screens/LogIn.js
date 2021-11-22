import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import style from '../styles/GlobalStyle'
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { BodyText } from '../components/BodyText'

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')


  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
         <View style={style.viewContainerCard}>
          <Card>
              <View style={{textAlign: "center", alignItems: 'center'}}>
                  <BodyText style={style.header} > Log In</BodyText>
                  <BodyText style={style.Bodytext} > Email:</BodyText>
                  <Input
                  onChangeText={(text) => {SetEmail(text)}}
                  value={email}
                  />
                  <BodyText style={style.Bodytext} > Password:</BodyText>
                  <Input 
                  onChangeText={(text) => {SetPassword(text)}}
                  value={password}
                  />

                  <View style={style.button}>
                    <Button title="Log In" onPress={ () => props.navigation.navigate({ routeName: 'List', params: { DATA: DATA } })}/>
                  </View>
              </View>
            </Card>
          </View>
        </ TouchableWithoutFeedback>
  );
}


export default LogIn