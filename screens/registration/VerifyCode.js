import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import style  from '../../styles/GlobalStyle'
import { Input } from '../../components/Input'
import { MainButton } from '../../components/MainButton'
import { BodyText } from '../../components/BodyText'
import { Card } from '../../components/Card'
import { LinearGradient } from 'expo-linear-gradient';
import * as auth from '../../store/actions/auth'
 
export const VerifyCode = (props) => {

  const [code, SetCode] = useState('')
  const [codeInput, SetCodeInput] = useState('')
  const email = props.navigation.getParam('Email')

  useEffect(() => {
    async function getCode(){
      try{

       const resData = await auth.verifyEmailUser(email)
       console.log(await resData)
      
        SetCode(await resData.code)
   
      }catch(error){
        console.log(error)
      }
    }
    getCode()

  }, [])


  const submitData = async () => {
    try{

      if(code === codeInput){
        props.navigation.navigate('ResetPassword', { Email: email })
      }
      else{
        Alert.alert(
          "שגיאה",
          'הקוד שהוכנס לא תקין',
          [
            { 
              text:'הבנתי', 
              onPress: () =>  {}, 
            }
          ]
        )
      }
      
        
    }catch{
        (err) => {console.log(err)}
    }
    
  }




  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss();}}>
     <LinearGradient colors={['#c8e8ca', '#8BC2C4']} style={style.gradient}>
          
      <Card > 
        <View style={{textAlign: "center", alignItems: 'center'}}>
              <BodyText  style={{fontWeight: 'bold',fontSize: 22}}> שכחתי סיסמה?  </BodyText>
              <BodyText  style={{fontWeight: 'bold',fontSize: 16}}> הכנס את הקוד שקיבלת למייל  </BodyText>

              <BodyText  style={style.Bodytext}> קוד זיהוי: </BodyText>
              <Input 
              style={ style.input} 
              onChangeText={SetCodeInput}
              value={codeInput}
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
VerifyCode.navigationOptions = {
    headerTitle: 'קוד זיהוי'
    };
    
    
    export default VerifyCode