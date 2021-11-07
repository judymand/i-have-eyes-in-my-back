import React from 'react';
import { View, Platform  } from 'react-native';
import style  from '../styles/GlobalStyle'

const device =  Platform.OS === 'ios'

export const Card = (props) => {

  return (
       <View style={[style.card, device ? style.cardIOS : style.cardAndroid]}>
         {props.children}
       </View>
       
  );
}

  export default Card