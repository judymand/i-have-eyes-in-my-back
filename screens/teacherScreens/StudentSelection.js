import React, {useEffect, useState} from 'react';
import style from '../../styles/GlobalStyle'
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { List } from '../../components/List'
import { MainButton } from '../../components/MainButton'

export const StudentSelection = (props) => {

  const theSelectionClass = props.navigation.getParam('theSelectionClass')
  const profession = props.navigation.getParam('profession')
  const token = useSelector(state => state.authReducer.token);
  const [studentList, setStudentList] = useState([])
  const [studentArrived, setStudentArrived] = useState([])

  useEffect(() => {
    async function getStudentOfClass(){
      try{
       
        let response = await fetch("http://localhost:3000/getStudentOfClass",
        {
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            'authorization': 'JWT '+ token
          }, 
          body:JSON.stringify({
            theSelectionClass: theSelectionClass
          })
        })
      
        const resData = await response.json()
       
        setStudentList(resData.students)

      }catch(error){
        console.log(error)
      }
    }
    getStudentOfClass()
  }, [])

  const createNewLesson = async () => {

    try{
  
      let response = await fetch("http://localhost:3000/createNewLesson",
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token
        },
        body:JSON.stringify({
          theSelectionClass,
          profession,
          studentList,
          studentArrived

        })
      })   


      const resData = await response.json()

    
      Alert.alert(
        resData.message,
        '',
      [
        { 
          text: resData.textButton,
          onPress: () => props.navigation.navigate(resData.pageName) 
        }
      ]
      )
      

    }catch(error){
      console.log(error)
    }

  }

  return (

    <View style={style.container}>
      <List 
      Data={studentList} 
      type='Student' 
      num={1} 
      MultipleSelection={true}
      onPress={ (item) => { item !== null ? setStudentArrived(item): null }  }
      />

      <MainButton 
        onPress={ () => {createNewLesson()} } 
        >
          אישור
        </MainButton>
    </View>

  
  );
}
  export default StudentSelection