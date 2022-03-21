import React, { useEffect } from 'react';
import { View, Button, ImageBackground} from 'react-native';
import style from '../styles/GlobalStyle'
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainButton } from '../components/MainButton'

export const HomePage = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
 
    const tryLogin = async () => {

      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { userId, token, isAdmin, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }

      dispatch(authActions.authenticate(userId, token, isAdmin === 'true'));
    };

    tryLogin();
  }, [dispatch]);



  return (
        <View style={style.container}>
          {/* <ImageBackground source={require("../assets/logo.jpeg")}  style={[style.image,{alignItems:'center', justifyContent: 'center',  opacity: 0.85}]} > */}
          <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
            <View style={style.containerButtonRow}>
              <View style={style.homePageBorderButton}>
                {/* <Button title="התחברות" onPress={ () => props.navigation.navigate('LogIn') } color='black' /> */}
                <MainButton
                styleMainButtonText={style.homePageButton}
                onPress={ () => props.navigation.navigate('LogIn') }
                >
                  התחברות
                </MainButton>
              </View>
              <View style={style.homePageBorderButton}>
                <MainButton
                  styleMainButtonText={style.homePageButton}
                  onPress={ () => props.navigation.navigate('SignUpByEmail')} 
                  >
                  הרשמה
                  </MainButton>
              </View>
            </View>
          </LinearGradient>
          {/* </ImageBackground> */}
        </View>
  );
}




export default HomePage