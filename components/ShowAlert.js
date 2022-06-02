import { Alert } from 'react-native';

export const ShowAlert = (props, resData, resData2) => {

    Alert.alert(
      resData.message,
      resData.text,
    [
      { 
        text: !resData.textButton ? "הבנתי" : resData.textButton, 
        onPress: () => resData.pageName === "" || !resData.pageName ? {} : props.navigation.navigate(resData.pageName),     
      },
      { 
        text:  !resData2 ? "" : resData2.message, 
        onPress: () => !resData2 ? {} : props.navigation.navigate(resData2.pageName),     
      },
    ]
    )

}
  export default ShowAlert