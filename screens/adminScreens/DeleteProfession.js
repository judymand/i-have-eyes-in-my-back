import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ProfessionList } from '../ProfessionList'
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/MainButton'

export const DeleteProfession = (props) => {

  const token = useSelector(state => state.authReducer.token);
  const[professionListToDeleate, setProfessionListToDeleate] = useState([]);

  const submitData = async () => {

    try{

      let response = await fetch("http://localhost:3000/deleteProfession",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
            professionListToDeleate: professionListToDeleate,
        })
      })   


      const resData = await response.json()

    
      Alert.alert(
        resData.message,
        '',
      [
        { 
          text: resData.list.textButton,
          onPress: () => props.navigation.navigate(resData.list.pageName) 
        }
      ]
      )
      

    }catch(error){
      console.log(error)
    }
    
  }

  const deleteprofession = () => {

    let message = ' המקצועות שנבחרו הם: '
    let text1 = 'שנה בחירה'
    let text2 = 'מחק מקצועות'
    
    
    if(professionListToDeleate.length === 0){
      message = ' לא נבחר אף מקצוע'
      text1 = ' חזור '
      text2 = ''

    }else if(professionListToDeleate.length === 1){
      message = ' המקצוע שנבחר: '
      text1 = 'שנה בחירה'
      text2 = 'מחק מקצוע'

    }

    Alert.alert(
      message + professionListToDeleate,
      '',
     [
      { 
        text: text1, 
        onPress: () => {}, 
      },
      { 
        text: text2, 
        onPress: () => submitData(professionListToDeleate), 
      }
     ]
    )

  }

  return (

    <View style={style.container}>
      <BodyText style={style.header} >לחץ על המקצוע שתירצי/ה למחוק  </BodyText>
      <ProfessionList 
      onPress={ (item) => { item !== null ? setProfessionListToDeleate(item): null }}
      MultipleSelection={true} 
    
      />

        <MainButton 
        onPress={ () => deleteprofession() } 
        >
          אישור
        </MainButton>
      
    </View>

   
    
    
  );
}
  export default DeleteProfession