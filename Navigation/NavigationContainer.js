import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Navigator from './Navigator';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);
  const isAdmin = useSelector(state => !!state.auth.admin);

  useEffect(() => {
    if (!isAuth) {

        if(isAdmin){
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'AdminNavigator' })
              );
        }
        else{
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'TeacherNavigator' })
              );
        }

     
    }
  }, [isAuth, isAdmin]);

  return <Navigator ref={navRef} />;
};

export default NavigationContainer;