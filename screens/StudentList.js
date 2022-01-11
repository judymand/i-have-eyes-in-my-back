import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { List } from '../components/List'
import { View } from 'react-native';


export const StudentList = (props) => {

  const [data, Setdata] = useState([])

  useEffect(() => {
    fetch('http://10.0.0.5:3000/getClasses',
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(result => 
      Setdata(result.classRoom)
      )

  }, [])


  return (
    
    <List 
    Data={data} 
    type='studenName' 
    num={2} 
    onPress={props}/>
       
  );
}
  export default StudentList