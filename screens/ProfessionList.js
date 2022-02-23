import React, { useState, useEffect } from 'react';
import style from '../styles/GlobalStyle'
import { List } from '../components/List'
import { View } from 'react-native';


export const ProfessionList = (props) => {

  const [data, Setdata] = useState([])

  useEffect(() => {
    async function fetchMyAPI(){
      try{

        let response = await fetch("http://localhost:3000/getProfessions",
        {
          method:"GET",
          headers:{
            'Content-Type':'application/json'
          }
        })

        const resData = await response.json()

        Setdata(resData.profession)

        // .then(res => res.json())
        // .then(result => 
        //   {Setdata(result.profession)
        //   console.log(result.profession)}
        //   )

      }catch(error){
        console.log(error)
      }
    }
    fetchMyAPI()

  }, [])

  return (
    
    <List 
    Data={data} 
    type='Profession' 
    num={2} 
    MultipleSelection={props.MultipleSelection}
    onPress={props.onPress}
    />
       
  );
}
  export default ProfessionList