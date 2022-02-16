import React from 'react';
import { View, StyleSheet, Button} from 'react-native';

export const HomePage = (props) => {


  return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
              <View style={styles.button}>
                <Button title="התחברות" onPress={ () => props.navigation.navigate('LogIn') } color='#2E8B57'/>
              </View>
              <View style={styles.button}>
                <Button title="הרשמה"  onPress={ () => props.navigation.navigate('SignUpByEmail')}   color='#2E8B57'/>
              </View>
            </View>
        </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: "center",
      alignItems: 'center',
      justifyContent: 'center', 
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
      borderRadius: 10,
      backgroundColor: 'white',
      borderColor: '#4E6D4E',
      color: '#4E6D4E',
      borderWidth: 2,
      width: '35%',
    }
  });


export default HomePage