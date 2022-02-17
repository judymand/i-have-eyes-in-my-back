import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { List } from '../components/List'
import { View } from 'react-native';


export const ClassList = (props) => {

  const [data, Setdata] = useState([])
  const className = null

  useEffect( () => {
    async function fetchMyAPI(){
      try{

        let response = await fetch("http://localhost:3000/getClasses",
        {
          method:"GET",
          headers:{
            'Content-Type':'application/json'
          }
        })
       
        const resData = await response.json()
        
        Setdata(resData.classRoom)
       
      }catch(error){
        console.log(error)
      }
  }
  fetchMyAPI()
 

  }, [])


  return (
    
    <List 
    Data={data} 
    type='className' 
    num={2} 
    onPress={props.onPress}/>
       
  );
}
  export default ClassList