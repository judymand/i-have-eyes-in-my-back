import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ClassList } from '../ClassList'

export const classSelection = (props) => {

   const selectionConfirmation = (item) => {
    Alert.alert(
        'האם הכיתה שאתה מלמד כעט היא ' + item.className,
        '',
       [
        { 
          text:'כן', 
          onPress: () => props.navigation.navigate('ProfessionsSelection' ,{parms: item._id}), 
        },
        { 
          text:'לא' 
        }
       ]
      )
    }

  return (
    <View style={style.container}>
    <BodyText style={style.header} >לחץ על הכיתה שאת/ה מלמד/ת כעת  </BodyText>
    <ClassList 
    onPress={ (item) => selectionConfirmation(item) } 
    />
  </View>
  );
}
  export default classSelection