import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/MainButton'
import { ClassList } from '../ClassList'
import { List } from '../../components/List'


export const RemoveProfessionClass = (props) => {


  const token = useSelector(state => state.authReducer.token);
  const [isClass, setIsClass] = useState(false);
  const [data, setData] = useState([]);
  const[selectClass, setSelectClass] = useState("");
  const[professionListToDeleate, setProfessionListToDeleate] = useState([]);

  const getProfessionOfClass = async () => {

    try{

      let response = await fetch("http://localhost:3000/getProfessionsOfClass",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        }, 
        body:JSON.stringify({
          theSelectionClass: selectClass
        })
      })

      const resData = await response.json()

      setData(resData.profession)

    }catch(error){
      console.log(error)
    }
  }

  

  const submitData = async () => {

    try{

      let response = await fetch("http://localhost:3000/deleteProfessionFromClass",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
            selectClass: selectClass,
            professionListToDeleate: professionListToDeleate,
        })
      })   


      const resData = await response.json()

    
      Alert.alert(
        resData.message,
        '',
      [
        { 
          text: resData.list.textButton,
          onPress: () => props.navigation.navigate(resData.list.pageName) 
        }
      ]
      )
      

    }catch(error){
      console.log(error)
    }
    
  }



  if(!isClass){
    
    return (
        
    <View style={style.container}>
      <BodyText style={style.header} > בחר כיתה </BodyText>
      <ClassList 
      MultipleSelection={false}
      onPress={ (item) => { 
        item !== null ? setSelectClass(item): null } } 
      />
             <MainButton 
            onPress={ () => {
              getProfessionOfClass()
              setIsClass(true)} 
            }            
           >
             בחר
         </MainButton>
    </View>
      
    );
  }


  return (

    <View style={style.container}>
      <BodyText style={style.header} >לחץ על המקצוע שתרצה למחוק  </BodyText>
      <List 
      Data={data} 
      type='Profession' 
      num={2} 
      MultipleSelection={true}
      key={(item) => item} 
      onPress={ (item) => { 
        item !== null ? setProfessionListToDeleate(item): null 
      } }
      />
      <MainButton 
          onPress={ () => 
            submitData()
           
          }            
          >
            בחר
        </MainButton>
  
    </View>
      
  );
}
  export default RemoveProfessionClass