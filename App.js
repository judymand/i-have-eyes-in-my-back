import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import { createStore, combineReducers } from 'redux';
import NavigationContainer from './Navigation/NavigationContainer'
import Navigator from './Navigation/Navigator';
import style  from './styles/GlobalStyle'
import 'react-native-gesture-handler';
// import authReducer from './store/reducer/auth'
// import { Provider } from 'react-redux';

export default function App() {

  const [isloading, setisloading] = useState(true);


  // const rootReducer = combineReducers({
  //   authReducer: authReducer
  // })
  // const store = createStore(rootReducer)

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
      // <Provider store={store}>
      //   < NavigationContainer/>
      // </Provider>
      <Navigator />
      
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
