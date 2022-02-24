import React from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { ProfessionList } from '../ProfessionList'

export const ProfessionsSelection = (props) => {

  const theSelectionClass = props.navigation.getParam('theSelectionClass')

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
        <ProfessionList 
        MultipleSelection={false}
        onPress={ (item) => { item !== null ? selectionConfirmation(item): null
        
          } } 
      />
    </View>
       
  );
}
  export default ProfessionsSelection