import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../../store/actions/auth'
 
export const SignUpByEmail = (props) => {

  const [email, SetEmail] = useState('')
  const [ValideEmail, SetValideEmail] = useState(false)


  const submitData = async () => {
    try{
     
      const response = await auth.checkEmail(email)
      const resData = await response.json()

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
     <LinearGradient colors={['#c8e8ca', '#4E6D4E']} style={style.gradient}>
          
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
                <MainButton
                styleMainButtonView={{...style.homePageBorderButton, ...style.myButtonStyle}}
                styleMainButtonText={style.homePageButton}
                onPress={submitData} 
                >
                  המשך
                </MainButton>
            
              </View>
            
          </View>
        </Card>
      </LinearGradient>
    </TouchableWithoutFeedback>
       
  );
}

SignUpByEmail.navigationOptions = {
  headerTitle: 'הרשמה למערכת'
};


export default SignUpByEmail