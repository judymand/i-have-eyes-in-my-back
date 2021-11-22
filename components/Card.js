import React from 'react';
import { ScrollView  ,Platform, KeyboardAvoidingView  } from 'react-native';
import style  from '../styles/GlobalStyle'

const device =  Platform.OS === 'ios'

export const Card = (props) => {
  let Behavior = device ? "position" : "padding"

  return (
       <ScrollView style={[style.card, device ? style.cardIOS : style.cardAndroid]}>
         <KeyboardAvoidingView  behavior={Behavior} keyboardVerticalOffset={30}> 
            {props.children}
         </KeyboardAvoidingView>
       </ScrollView>
       
  );
}

  export default Card