import React, { useState, useEffect } from 'react';
import style from '../../styles/GlobalStyle'
import { List } from '../../components/List'
import { View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width

export const AdminPanel = (props) => {

  const data = [
      {_id: 0, title: 'הוספת כיתה' },
      {_id: 1, title: 'מחיקת כיתה' },
      {_id: 2, title: 'הוספת מורה למערכת' },
      {_id: 3, title: 'מחיקת מורה' },
      {_id: 4, title: 'שייך תלמיד לכיתה' },
      {_id: 5, title: 'הסר תלמיד מכיתה' },
      {_id: 6, title: 'הוסף מקצוע' },
      {_id: 7, title: 'הסר מקצוע' },
      {_id: 8, title: 'שייך מקצוע לכיתה' },
      {_id: 9, title: 'הוסף אדמין' },
  ]

  return (
    
    <List 
    Data={data} 
    type='title' 
    num={1} 
    onPress={props} 
    styleButton={style.adminButtons}/>
       
  );
}
  export default AdminPanel