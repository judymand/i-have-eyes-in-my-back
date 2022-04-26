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
    containerButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    myButtonStyle: {
      borderRadius: 22,
      backgroundColor: '#8BC2C4',
      borderColor: '#808080',
      textAlign: "center",
      borderWidth: 3,
      height: windowHeight  / 20,
    },
    homePageBorderButton: {
      width: "80%",
    },
    homePageButton: {
      fontSize: windowWidth > 350 ? 22 : 16,
    },
    header: {
      fontSize: windowWidth > 350 ? 26 : 18,
      paddingBottom: windowHeight / 19,
      paddingTop: windowHeight / 25,
      fontWeight: 'bold',
    
    },
    Bodytext: {
      fontSize: windowWidth > 350 ? 18 : 12,
      paddingTop: windowHeight / 50,
      paddingBottom: windowHeight / 80,
    },
    input: {
      borderWidth: 1,
      width: windowWidth / 2,
      height: windowHeight / 30,
      alignItems: 'baseline',
    },
    Valid: {
      borderColor: 'green',
      borderWidth: 2,
 
    },
    noValid: {
      borderColor: 'red',
      borderWidth: 2,
    },
    mediumPasswordStyle: {
      borderColor: 'blue',
      borderWidth: 2,
    },
    button: {
      padding: windowHeight / 30,
    },
    viewContainerCard:{
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'right'
    },
    card:{
      borderRadius: 12,
      width: '80%',
      height: '50%',
      maxWidth: windowWidth / 1.2,
      maxHeight: windowHeight / 1.4,
      padding: windowHeight / 25,
   
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
      borderRadius:12,
      backgroundColor: 'white',
   
        
    },
    inputContainer: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: '#d7d7d7'
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex:1,
      width: windowWidth,
      height: windowHeight,
     resizeMode: 'stretch',
      
    },
    mainButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: windowHeight / 30,
      marginVertical: windowHeight / 120,
      height: windowHeight  / 25,
      borderRadius: 16,
      //backgroundColor: '#4E6D4E',
    },
    smallButton: {
      width: windowWidth  / 3,
    },
    mainButtonText: {
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: windowWidth > 350 ? 20 : 16,
    },
    list: {
      marginVertical: windowHeight / 30,
      marginHorizontal: windowHeight / 200,
    },
    adminButtons: {
      width: windowWidth  / 1.3,
      height: windowHeight  / 18,
    },
    selected:{
      backgroundColor: 'black',
      color: '#fff'
    },
    notSelected:{
      backgroundColor:  "#4E6D4E",
      color: 'black'
    },
    logOutPage: {
      backgroundColor: '#696969'
    }

  });
  