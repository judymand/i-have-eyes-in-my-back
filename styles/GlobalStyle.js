import { StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


export default StyleSheet.create({
  
    container: {
      flex: 1,
      textAlign: "center",
      alignItems: 'center',
      justifyContent: 'center', 
    },
    header: {
      fontSize: windowWidth > 350 ? 32 : 26,
      paddingBottom: windowHeight / 19,
      paddingTop: windowHeight / 25,
      fontWeight: 'bold',
    
    },
    text: {
      fontSize: windowWidth > 350 ? 22 : 16,
      paddingTop: windowHeight / 50,
      paddingBottom: windowHeight / 80,
    },
    input: {
      borderWidth: 1,
      width: windowWidth / 2,
      height: windowHeight / 25,
    },
    Valid: {
      borderColor: 'green',
      borderWidth: 2,
 
    },
    noValid: {
      borderColor: 'red',
      borderWidth: 2,
      
    },
    button: {
      padding: windowHeight / 20,
    },
    card:{
      width: '80%',
      height: '70%',
      padding: windowWidth / 6,
      borderRadius: 12,
    },

    cardIOS: {
     
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      backgroundColor: 'white',
   
    },
    cardAndroid: {
      elevation: 8,
        
    },
    image: {
      flex:1,
      width: windowWidth,
      height: windowHeight,
      resizeMode: 'stretch',
    },
  
  });
  