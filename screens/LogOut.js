import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import style from '../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { useFocusEffect } from '@react-navigation/native';

export const LogOut = (props) => {


  const dispatch = useDispatch();

  // useEffect( () => {

  //   const unsubscribe = props.navigation.addListener('focus', () => {
 
  //     return () => unsubscribe.remove()
  //   }, [logOff])
  // });



  useEffect( () => {
   
    Alert.alert(
      'האם אתה בטוח/ה שאת/ה רוצה להתנתק? ' ,
      '',
      [
      { 
        text:'כן', 
        onPress: () =>   dispatch(authActions.logout()), 
      },
      { 
        text:'לא' ,
        onPress: () => props.navigation.navigate('HomePage'),
      }
      ]
    )
  }, [])

  
 

  return(
  <View style={style.container}>

  </View> 
 );

 
}

export default LogOut