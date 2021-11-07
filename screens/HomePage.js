import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
 

export const HomePage = (props) => {
 
  return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
              <View style={styles.button}>
              <Button title="Log In"  color='#2E8B57'/>
              </View>
              <View style={styles.button}>
              <Button title="Sign Up"    color='#2E8B57'/>
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
      borderColor: '#2E8B57',
      color: '#2E8B57',
      borderWidth: 2,
      width: '35%',
    }
  });


export default HomePage