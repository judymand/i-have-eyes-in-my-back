import React, { useState, useEffect } from 'react';
import style from '../../styles/GlobalStyle'
import { List } from '../../components/List'
import { View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width

export const AdminPanel = (props) => {

  const data = [
      {_id: 0, title: 'הוספת כיתה' , pageName: 'AddClass'},
      {_id: 1, title: 'מחיקת כיתה' , pageName: 'DeleteClass'},
      {_id: 2, title: 'הוספת מורה למערכת' , pageName: 'AddTeacher'},
      {_id: 3, title: 'מחיקת מורה' , pageName: 'DeleteTeacher'},
      {_id: 4, title: 'שייך תלמיד לכיתה' , pageName: 'BelongsStudentClass'},
      {_id: 5, title: 'הסר תלמיד מכיתה' , pageName: 'RemoveStudentClass'},
      {_id: 6, title: 'הוסף מקצוע', pageName: 'AddProfession' },
      {_id: 7, title: 'הסר מקצוע', pageName: 'RemoveProfession' },
      {_id: 8, title: 'שייך מקצוע לכיתה', pageName: 'BelongsProfessionClass' },
      {_id: 9, title: 'הוסף אדמין', pageName: 'AddAdmin' },
  ]
  
  return (
    
    <List 
    Data={data} 
    type='title' 
    num={1} 
    onPress={ (item) => props.navigation.navigate(item.pageName) } 
    styleButton={style.adminButtons}/>
       
  );
}
  export default AdminPanel