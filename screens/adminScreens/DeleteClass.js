import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ClassList } from '../ClassList'

export const DeleteClass = (props) => {

  const submitData = (id) => {
    fetch("http://10.0.0.5:3000/deleteClassRoom",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        id,
      })
    })   
    .then( res => { 
      res.json()
    
    })
  }

  const deleteClassRoom = (item) => {
    Alert.alert(
      'האם את/ה בטוח/ה שהינך רוצה למחוק את כיתה ' + item.className,
      '',
     [
      { 
        text:'כן', 
        onPress: () => submitData(item._id), 
      },
      { 
        text:'לא' 
      }
     ]
    )

  }

  return (

    <View style={style.container}>
      <BodyText style={style.header} >לחץ על הכיתה שתירצי/ה למחוק  </BodyText>
      <ClassList 
      onPress={ (item) => deleteClassRoom(item) } 
      />
    </View>

   
    
    
  );
}
  export default DeleteClass