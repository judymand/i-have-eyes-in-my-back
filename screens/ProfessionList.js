import React, { useState, useEffect } from 'react';
import { List } from '../components/List'
import { useSelector } from 'react-redux';



export const ProfessionList = (props) => {

  const [data, Setdata] = useState([])
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    async function fetchMyAPI(){
      try{

        let response = await fetch("http://localhost:3000/getProfessions",
        {
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            'authorization': 'JWT '+ token 
          }
        })

        const resData = await response.json()

        Setdata(resData.profession)


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