import React from 'react';
import { View, Button} from 'react-native';
import style from '../styles/GlobalStyle'
import { LinearGradient } from 'expo-linear-gradient';

export const HomePage = (props) => {


  return (
        <View style={style.container}>
          <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
            <View style={style.containerButtonRow}>
              <View style={style.homePageButton}>
                <Button title="התחברות" onPress={ () => props.navigation.navigate('LogIn') } color='#2E8B57'/>
              </View>
              <View style={style.homePageButton}>
                <Button title="הרשמה"  onPress={ () => props.navigation.navigate('SignUpByEmail')}   color='#2E8B57'/>
              </View>
            </View>
          </LinearGradient>
        </View>
  );
}




export default HomePage