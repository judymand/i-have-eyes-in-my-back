import React from 'react';
import style from '../../styles/GlobalStyle'
import { View, Text } from 'react-native';

export const StudentSelection = (props) => {

  const theSelectionClass = props.navigation.getParam('theSelectionClass')
  const profession = props.navigation.getParam('profession')

  console.log(theSelectionClass)
  console.log(profession)

  return (

    <View>
        <Text>
            StudentSelection
        </Text>
    </View>
    
  );
}
  export default StudentSelection