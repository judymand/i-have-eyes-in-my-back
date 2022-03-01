import React, { useState, useEffect } from 'react';
// import style from '../styles/GlobalStyle'
import { List } from '../components/List'
// import { View,  ActivityIndicator, Text} from 'react-native';
import { useSelector } from 'react-redux';

export const ClassList = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, Setdata] = useState([])
  const className = null
  const { navigation } = props
  const token = useSelector(state => state.authReducer.token);
  
const loadClasses = async () => {
    try{
      setIsLoading(true);
      let response = await fetch('http://localhost:3000/getClasses',
      {
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'authorization': 'JWT '+ token 
        }
      })
     
      const resData = await response.json()
      
      Setdata(resData.classRoom)
      setIsLoading(false);

     
    }catch(error){
      console.log(error)
    }
}

  useEffect( () => {
    loadClasses()
  }, [])

 
  // if (isLoading) {
  //   return (
  //     <View >
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }
  // if (!isLoading && data.length === 0) {
  //   return (
  //     <View >
  //       <Text>לא קיימות כיתות במערכת</Text>
  //     </View>
  //   );
  // }


  return (
    
    <List 
    Data={data} 
    type='className' 
    num={2} 
    MultipleSelection={props.MultipleSelection}
    onPress={props.onPress}/>
       
  );
}
  export default ClassList