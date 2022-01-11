import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import Navigtion from './Navigation/Navigator'
import style  from './styles/GlobalStyle'

import 'react-native-gesture-handler';

export default function App() {

  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisloading(!isloading);
    }, 2000);
  }, []);

  if (isloading) {
    return (
      <SafeAreaView style={styles.container} >
        <Image
        style={style.image}
        source={require('./assets/logo.jpeg')}
      />
      </SafeAreaView>
    )
} else {
    return (
      < Navigtion/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: '#4E6D4E',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },
 
  
  header: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 35,
  }
});
