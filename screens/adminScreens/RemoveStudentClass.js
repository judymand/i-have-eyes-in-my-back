import React, { useState } from 'react';
import style from '../../styles/GlobalStyle'
import { View, Alert } from 'react-native';
import { BodyText } from '../../components/BodyText'
import { useSelector } from 'react-redux';
import { MainButton } from '../../components/MainButton'
import { ClassList } from '../ClassList'
import { List } from '../../components/List'


export const RemoveStudentClass = (props) => {


  const token = useSelector(state => state.authReducer.token);
  const [isClass, setIsClass] = useState(false);
  const [data, setData] = useState([]);
  const[selectClass, setSelectClass] = useState("");
  const[studentListToDeleate, setStudentListToDeleate] = useState([]);

  const getStudentOfClass = async () => {

    try{

      let response = await fetch("http://localhost:3000/getStudentOfClass",
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

      setData(resData.students)

    }catch(error){
      console.log(error)
    }
  }

  

  const submitData = async () => {

    try{

      let response = await fetch("http://localhost:3000/deleteStudentsFromClass",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
            selectClass: selectClass,
            studentListToDeleate: studentListToDeleate,
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
              getStudentOfClass()
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
      <BodyText style={style.header} >לחץ על התלמידים שתרצה למחוק  </BodyText>
      <List 
      Data={data} 
      type='Student' 
      num={1} 
      MultipleSelection={true}
      onPress={ (item) => { 
        item !== null ? setStudentListToDeleate(item): null 
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
  export default RemoveStudentClass