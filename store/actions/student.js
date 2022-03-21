import { Platform } from 'react-native';
import { getToken } from './auth'

const device =  Platform.OS === 'ios'

let api = "10.0.0.10"

if(device){
  api = "localhost"
}

export const getStudentOfClass = async (theSelectionClass) => {
  
  try{
     
      let response = await fetch(`http://${api}:3000/getStudentOfClass`,
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ await getToken() 
        }, 
        body:JSON.stringify({
          theSelectionClass: theSelectionClass
        })
      })
    
      const resData = await response.json()

      return resData.students


    }catch(error){
      console.log(error)
    }
}

export const getAllStudents = async () => {
 
  try{
    
    let response = await fetch(`http://${api}:3000/getAllStudent`,
    {
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken()  
      }
    })

    const resData = await response.json()

    return resData.studentList

  }catch(error){
    console.log(error)
  }
}

export const deleteStudentsFromClass = async (selectClass, studentListToDeleate) => {

  try{
    
    let response = await fetch(`http://${api}:3000/deleteStudentsFromClass`,
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      },
      body:JSON.stringify({
          selectClass: selectClass,
          studentListToDeleate: studentListToDeleate,
      })
    })   

    return await response.json()

  }catch(error){
    console.log(error)
  }

}

export const addStudentsToClass = async (studentsList, classList) => {
  try{
    
    let response = await fetch(`http://${api}:3000/addStudentsToClass`,
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      },
      body:JSON.stringify({
        studentsList,
        classList
      })
    })

    return await response.json()


  }catch(error){
    console.log(error)
  }

}

export const createLesson = async (theSelectionClass, profession, studentList, studentArrived) => {

  try{
    
    let response = await fetch(`http://${api}:3000/createNewLesson`,
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      },
      body:JSON.stringify({
        theSelectionClass,
        profession,
        studentList,
        studentArrived

      })
    })   

    return await response.json()

  }catch(error){
    console.log(error)
  }

}
