import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
 
export const SignUpByEmail = (props) => {

  const [email, SetEmail] = useState('')
  const [ValideEmail, SetValideEmail] = useState(false)
  const[userType, SetUserType] = useState(false)

  const submitData = async () => {
    try{
        let response = await fetch("http://localhost:3000/EmailCheck",
        {
        method:"POST",
        headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
            })
        })
        // console.log(response.status)
        const resData = await response.json()
        // console.log(resData.message)

        if(response.status == 202){
          props.navigation.navigate('SignUp', { Email: email, Admin: resData.admin})
        }
        else{
          Alert.alert(
            resData.message,
            '',
           []
          )
        }
        
    }catch{
        (err) => {console.log(err)}
    }
    
  }


  const validateEmail  = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      SetValideEmail(false)
      SetEmail(text)
    }
    else {
      SetValideEmail(true)
      SetEmail(text)
    }
  }



  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
      <View style={style.viewContainerCard}>
        <Card > 
          <View style={{textAlign: "center", alignItems: 'center'}}>
                <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> הרשמה  </BodyText>
              

                <BodyText  style={style.Bodytext}> דוא״ל: </BodyText>
                <Input 
                style={ email === '' ? style.input : ValideEmail ? style.Valid : style.noValid} 
                onChangeText={validateEmail}
                value={email}
                />
               
               
                <View style={style.button}>
                <Button 
                  title="המשך" onPress={ submitData }/>
                </View>
              
            </View>
          </Card>
        </View>
    </TouchableWithoutFeedback>
       
  );
}


export default SignUpByEmail