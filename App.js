import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import style  from './styles/GlobalStyle'
import { HomePage } from './screens/HomePage';
// import { SignUp } from './screens/SignUp';
// import { LogIn } from './screens/LogIn';



export default function App() {

  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisloading(!isloading);
    }, 1500);
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
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          I Have Eyes In My Back
          </Text>
        <View style={styles.container}>
          <HomePage />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    width: '100%',
    height: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 35,
  }
});
