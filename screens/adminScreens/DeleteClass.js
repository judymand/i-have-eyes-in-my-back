import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ClassList } from '../ClassList'

export const DeleteClass = (props) => {

  const submitData = async (id) => {

    try{

      let response = await fetch("http://localhost:3000/deleteClassRoom",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id,
        })
      })   


      const resData = await response.json()

    
      Alert.alert(
        resData.message,
        '',
      [
        { 
          text: resData.textButton,
          onPress: () => props.navigation.navigate(resData.pageName) 
        }
      ]
      )
      

    }catch(error){
      console.log(error)
    }
    
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