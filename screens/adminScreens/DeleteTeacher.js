import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { List } from '../../components/List'

export const DeleteTeacher = (props) => {


  // const submitData = (id) => {
  //   fetch("http://10.0.0.5:3000/deleteCTeacher",
  //   {
  //     method:"POST",
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({
  //       id,
  //     })
  //   })   
  //   .then( res => { 
  //     res.json()
    
  //   })
  // }

  

  const deleteCTeacher = (item) => {
    Alert.alert(
      'האם את/ה בטוח/ה שהינך רוצה למחוק את המורה: ' + item.className,
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
      <BodyText style={style.header} >לחץ על המורה שתירצי/ה למחוק  </BodyText>
      {/* <List 
      Data={data} 
      type='teachers' 
      num={2} 
      onPress={ (item) => deleteCTeacher(item)  }/> */}
    </View>
    
  );
}
  export default DeleteTeacher