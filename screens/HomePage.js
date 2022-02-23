import React from 'react';
import { View, Button} from 'react-native';
import style from '../styles/GlobalStyle'

export const HomePage = (props) => {


  return (
        <View style={style.container}>
            <View style={style.containerButtonRow}>
              <View style={style.homePageButton}>
                <Button title="התחברות" onPress={ () => props.navigation.navigate('LogIn') } color='#2E8B57'/>
              </View>
              <View style={style.homePageButton}>
                <Button title="הרשמה"  onPress={ () => props.navigation.navigate('SignUpByEmail')}   color='#2E8B57'/>
              </View>
            </View>
        </View>
  );
}




export default HomePage