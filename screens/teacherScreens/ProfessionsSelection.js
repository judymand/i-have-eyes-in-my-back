import React, { useState, useEffect } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { List } from '../../components/List'
// import { ProfessionList } from '../ProfessionList'

export const ProfessionsSelection = (props) => {

  const theSelectionClass = props.navigation.getParam('theSelectionClass')

  const [data, Setdata] = useState([])

  useEffect(() => {

    async function fetchMyAPI(){

      try{

        let response = await fetch("http://localhost:3000/getProfessionsOfClass",
        {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          }, 
          body:JSON.stringify({
            theSelectionClass
          })
        })

        const resData = await response.json()

        Setdata(resData.profession)

      }catch(error){
        console.log(error)
      }
    }
    fetchMyAPI()

  }, [theSelectionClass])

  

  const selectionConfirmation = (item) => {
    Alert.alert(
        'האם המקצוע שאתה מלמד כעת הוא ' + item,
        '',
       [
        { 
          text:'כן', 
          onPress: () => props.navigation.navigate('StudentSelection' ,{ profession: item, theSelectionClass: theSelectionClass}), 
        },
        { 
          text:'לא' 
        }
       ]
      )
    }

  return (
    <View style={style.container}>
      <BodyText style={style.header} >לחץ על המקצוע שאת/ה מלמד/ת כעת  </BodyText>
      <List 
      Data={data} 
      type='Profession' 
      num={2} 
      MultipleSelection={false}
      key={(item) => item} 
      onPress={ (item) => { item !== null ? selectionConfirmation(item): null } }
      />
      
    </View>
       
  );
}
  export default ProfessionsSelection