import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { ClassList } from '../ClassList'

export const DeleteClass = (props) => {

  const submitData = (id) => {
    fetch("http://10.0.0.5:3000/deleteClassRoomS",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        id,
      })
    })   
    .then(res=>res.json())
  }

  const deleteClassRoom = (item) => {
    // Alert.alert('האם את/ה בטוח/ה שהינך רוצה למחוק כיתה ' +  item.className,
    // [ { text:'כן', onPress: () => submitData(item)  }, { text:'לא' }])
  }

  return (

    <ClassList 
    onPress={ (item) => deleteClassRoom(item) } 
    />
    
    
  );
}
  export default DeleteClass