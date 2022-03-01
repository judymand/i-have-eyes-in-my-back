import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import style from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { BodyText } from '../../components/BodyText'
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



export const LogIn = (props) => {
 
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.isAdmin);
 

  const submitData =  async  () => {
    let action;
    action = authActions.login( email, password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }

  }


  // const submitData = useCallback(
  //   (email,password)  => {
  //     dispatchFormState({
  //       type: LOGIN,
  //       email: email,
  //       password: password
  //     });
  //   },
  //   [dispatchFormState]
  // );



    // try{

    //   let response = await fetch("http://localhost:3000/login",
    //   {
    //     method:"POST",
    //     headers:{
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //       email,
    //       password
    
    //     })
    //   })  

    //   const resData = await response.json()

    //   if(response.status == 201 ){
    //     dispatch({ type: LOGIN, token: resData.token, userId: resData.user._id, isAdmin: user.admin });
    //   }
    //   else if(response.status == 401 ){
    //     Alert.alert(
    //       resData.message,
    //       '',
    //     [
    //       { 
    //         text: resData.textButton, 
    //         onPress: () => props.navigation.navigate(resData.pageName),     
    //       }
    //     ]
    //     )
    //   }
    //   else{
    //     Alert.alert(
    //       'משהו השתבש, נסה שנית מאוחר יותר.',
    //       '',
    //     [
    //       { 
    //         text: 'חזרה לעמוד הבית', 
    //         onPress: () => props.navigation.navigate('HomePage'), 
    //       }
    //     ]  
    //     )
    //   }
   

    // }catch{
    //   (err) => {console.log(err)}

    // }
  
  // }
  

  return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
         <View style={style.viewContainerCard}>
          <Card>
              <View style={{textAlign: "center", alignItems: 'center'}}>
                  <BodyText style={style.header} > כניסה למערכת</BodyText>
                  <BodyText style={style.Bodytext} > הכנס מייל:</BodyText>
                  <Input
                  onChangeText={(text) => {SetEmail(text)}}
                  value={email}
                  />
                  <BodyText style={style.Bodytext} > הכנס סיסמא:</BodyText>
                  <Input 
                  onChangeText={(text) => {SetPassword(text)}}
                  value={password}
                  />

                  <View style={style.button}>
                    <Button title="היכנס" onPress={submitData }/>
                  </View>
              </View>
            </Card>
          </View>
        </ TouchableWithoutFeedback>
  );
}


export default LogIn