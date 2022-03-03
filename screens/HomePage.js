import React from 'react';
import { View, Button, ImageBackground} from 'react-native';
import style from '../styles/GlobalStyle'
import { LinearGradient } from 'expo-linear-gradient';

export const HomePage = (props) => {


  return (
        <View style={style.container}>
          {/* <ImageBackground source={require("../assets/logo.jpeg")}  style={[style.image,{alignItems:'center', justifyContent: 'center',  opacity: 0.85}]} > */}
          <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
            <View style={style.containerButtonRow}>
              <View style={[style.homePageButton, {backgroundColor: '#A52A2A'}]}>
                <Button title="התחברות" onPress={ () => props.navigation.navigate('LogIn') } color='black' />
              </View>
              <View style={[style.homePageButton, {backgroundColor: '#A52A2A'}]}>
                <Button title="הרשמה"  onPress={ () => props.navigation.navigate('SignUpByEmail')}   color='black'/>
              </View>
            </View>
          </LinearGradient>
          {/* </ImageBackground> */}
        </View>
  );
}




export default HomePage