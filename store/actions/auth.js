export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (email, password) => {

  return async dispatch => {
   
    let response = await fetch("http://localhost:3000/login",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    })  

    const resData = await response.json()

    dispatch({ type: LOGIN, userId: resData.user._id, token: resData.token, isAdmin: resData.user.admin });

  };

};


export const logout = () => {
  // clearLogoutTimer();
  // AsyncStorage.removeItem('userData');

  return async dispatch => {
    dispatch({ type: LOGOUT });
  }
    
};
