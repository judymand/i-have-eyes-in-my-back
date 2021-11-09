import React from 'react';
import { ScrollView  ,Platform  } from 'react-native';
import style  from '../styles/GlobalStyle'

const device =  Platform.OS === 'ios'

export const Card = (props) => {

  return (
       <ScrollView style={[style.card, device ? style.cardIOS : style.cardAndroid]}>
         {props.children}
       </ScrollView>
       
  );
}

  export default Card