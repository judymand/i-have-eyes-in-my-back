import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View} from 'react-native';

import { ClassList } from '../ClassList';

export const Addstudent = (props) => {
  
    const [selectedClass, SetSelectedClass] = useState('')
  
    if(!(selectedClass)){
        return ( 
            <ClassList onPress={(item) => {SetSelectedClass(item)}}/>     
        );
    }
    else{
        return ( 
            <ClassList onPress={(item) => {SetSelectedClass(item)}}/>     
        );
    }

}
  export default Addstudent