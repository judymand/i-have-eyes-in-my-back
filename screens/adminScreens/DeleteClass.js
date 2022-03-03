import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ClassList } from '../ClassList'
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/MainButton'

export const DeleteClass = (props) => {

  const token = useSelector(state => state.authReducer.token);
  const[classListToDeleate, setClassListToDeleate] = useState([]);

  const submitData = async () => {

    try{

      let response = await fetch("http://localhost:3000/deleteClassRoom",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
          classListToDeleate,
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

  const deleteClassRoom = () => {

    let message = ' הכיתות שנבחרו הם: '
    let text1 = 'שנה בחירה'
    let text2 = 'מחק כיתות'
    
    
    if(classListToDeleate.length === 0){
      message = ' לא נבחרה אף כיתה'
      text1 = ' חזור '
      text2 = ''

    }else if(classListToDeleate.length === 1){
      message = ' הכיתה שנבחרה: '
      text1 = 'שנה בחירה'
      text2 = 'מחק כיתה'

    }

    Alert.alert(
      message + classListToDeleate,
      '',
     [
      { 
        text: text1, 
        onPress: () => {}, 
      },
      { 
        text: text2, 
        onPress: () => submitData(classListToDeleate), 
      }
     ]
    )

  }

  return (

    <View style={style.container}>
      <BodyText style={style.header} >לחץ על הכיתה שתירצי/ה למחוק  </BodyText>
      <ClassList 
      onPress={ (item) => { item !== null ? setClassListToDeleate(item): null }}
      MultipleSelection={true} 
    
      />

        <MainButton 
        onPress={ () => deleteClassRoom() } 
        >
          אישור
        </MainButton>
      
    </View>

   
    
    
  );
}
  export default DeleteClass