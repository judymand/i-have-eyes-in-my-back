import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { ShowAlert } from '../../components/ShowAlert';
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../../store/actions/auth';
import { checkValidEmail } from '../../functional/emailValid'
import { NoInput, NoValidInput } from '../../alertData.json/alert.json'
 
export const ForgetPassword = (props) => {

  const [email, SetEmail] = useState('')
  const checkEmailInput = checkValidEmail(email) 


  const submitData = async () => {
    try{

      if(email === ""){
        ShowAlert(props, NoInput)
        return;
      }
      if(!checkEmailInput.valideEmail){
        ShowAlert(props, NoValidInput)
        return;
      }

      const response = await auth.checkEmail(email)
      const resData = await response.json()

      let message = "המשתמש לא קיים במערכת."
      let text = ""
      if(resData.registered == "yes"){
        message = "אנא בדוק את המייל"
        text = "נשלח קוד אימות לצורך אימות מייל המשתמש."

      }
      else if(resData.registered == "no"){
        message = "עדיין לא נרשמת למערכת"
      }

      Alert.alert(
        message,
        text,
        [
          { 
            text:'הבנתי', 
            onPress: () =>  { 
              if(resData.registered == "yes"){
                props.navigation.navigate('VerifyCode', { Email: email })
              }
              else 
                props.navigation.navigate('HomePage')
            }, 
          }
        ]
      )
      
        
    }catch{
        (err) => {console.log(err)}
    }
    
  }



  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
     <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}>
          
      <Card > 
        <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> שכחת סיסמה?  </BodyText>
              <BodyText  style={{fontWeight: 'bold',fontSize: 16}}> הכנס מייל לצורך איפוס סיסמה  </BodyText>

              <BodyText  style={style.Bodytext}> דוא״ל: </BodyText>
              <Input 
              style={ email === '' ? style.input : checkEmailInput.valideEmail ? style.Valid : style.noValid} 
              onChangeText={(text) => 
                text.charAt(text.length -1) === " " ? {} : SetEmail(text)
                }
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

ForgetPassword.navigationOptions = {
  headerTitle: 'שכחתי סיסמה'
};


export default ForgetPassword