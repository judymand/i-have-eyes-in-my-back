import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { List } from '../components/List'
import { View } from 'react-native';


export const ProfessionList = (props) => {

  const [data, Setdata] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/getProfessions',
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(result => 
      {Setdata(result.profession)
      console.log(result.profession)}
      )

  }, [])


  return (
    
    <List 
    Data={data} 
    type='Profession' 
    num={2} 
    onPress={props}/>
       
  );
}
  export default ProfessionList