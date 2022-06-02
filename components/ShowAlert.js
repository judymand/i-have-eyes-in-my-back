import { Alert } from 'react-native';

export const ShowAlert = (props, resData, resData2) => {

  let text2 = null

  if(!!resData2){
      text2 = { 
        text:  !resData2.textButton ? {} : resData2.textButton, 
        onPress: () => !resData2.pageName ? {} : props.navigation.navigate(resData2.pageName)  
      }
    }

    Alert.alert(
      resData.message,
      resData.text,
    [
      { 
        text: !resData.textButton ? "הבנתי" : resData.textButton, 
        onPress: () => resData.pageName === "" || !resData.pageName ? {} : props.navigation.navigate(resData.pageName),     
      },
      text2
    ]
    )

}
  export default ShowAlert