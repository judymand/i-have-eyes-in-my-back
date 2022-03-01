import React from 'react';
import { ScrollView, View ,Platform, KeyboardAvoidingView  } from 'react-native';
import style  from '../styles/GlobalStyle'

const device =  Platform.OS === 'ios'

export const Card = (props) => {
  let Behavior = device ? "position" : "padding"

  return (
    <View style={style.viewContainerCard}>
       <ScrollView style={[style.card, device ? style.cardIOS : style.cardAndroid]}>
         <KeyboardAvoidingView  behavior={Behavior} keyboardVerticalOffset={30}> 
            {props.children}
         </KeyboardAvoidingView>
       </ScrollView>
    </View>
       
  );
}

  export default Card