export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let timer;

export const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  if (!userData) {
    return;
  }
  const transformedData = JSON.parse(userData);
  const { token } = transformedData;
  return token
}

export const authenticate = (userId, token, isAdmin, expiryTime) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token, isAdmin: isAdmin }, setLogoutTimer(expiryTime));
  };
};

const saveDataToStorage = async (userId, token, isAdmin, expirationDate) => {

  try{

    AsyncStorage.setItem(
      'userData', 
      JSON.stringify({
        userId: userId,
        token: token,
        isAdmin: isAdmin.toString(),
        expiryDate: expirationDate.toISOString()
      })
    );

  }catch(e){
    console.log(e)

  }

};

const device =  Platform.OS === 'ios'

let api = "10.0.0.4"

if(device){
  api = "localhost"
}

export const login = (email, password) => {

    try{
      return async dispatch => {
      let response = await fetch(`http://${api}:3000/login`,
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email,
          password
        })
      })  
  
      const resData = await response.json()
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
     
      dispatch(authenticate(resData.user._id, resData.token, resData.user.admin, expirationDate));
      saveDataToStorage(resData.user._id, resData.token, resData.user.admin, expirationDate);
    };

    }catch(e){
      console.log(e)
    }
   

};


export const logout = () => {
  
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return async dispatch => {
    dispatch({ type: LOGOUT });
  }

};
const clearLogoutTimer = () => {
  // console.log('timer')
  // console.log(timer)
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};





export const checkEmail = async (email) => {
  try{
   
    let response = await fetch(`http://${api}:3000/EmailCheck`,
    {
    method:"POST",
    headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
        })
    })
   
    return response

  }catch(error){
    console.log(error)
  }
}


export const signup = async (firstName, lastName, email, admin, password) => {
  try{
   
    let response = await fetch(`http://${api}:3000/signup`,
      {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          firstName,
          lastName,
          email,
          admin,
          password
        })

      })
    return response

  }catch(error){
    console.log(error)
  }
}


export const getAllTeacher = async () => {
  try{

    let response = await fetch(`http://${api}:3000/getAllTeacher`,
    {
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      }
    })

    const resData = await response.json()
    return resData.teacherArr

  }catch(error){
    console.log(error)
  }
}



export const deleteTeacher = async (teacherListToDeleate) => {
  try{

    let response = await fetch(`http://${api}:3000/deleteTeacher`,
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      },
      body:JSON.stringify({
        teacherListToDeleate: teacherListToDeleate,
      })
    })   
    return await response.json()
    
  }catch(error){
    console.log(error)
  }
}


export const addUserEmail = async (email, admin) => {
  try{
      
    let response = await fetch(`http://${api}:3000/addUserEmail`,
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'authorization': 'JWT '+ await getToken() 
      },
      body:JSON.stringify({
        email,
        admin
      })
    })
    return await response.json()
    
  }catch(error){
    console.log(error)
  }
}