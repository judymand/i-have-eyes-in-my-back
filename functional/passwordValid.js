

  export const checkPassword = (password) => {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    let color = "red"
    let isGoodPassword = false
      if(strongPassword.test(password)  === true) {
        color = "green"
        isGoodPassword = true
      } else if(mediumPassword.test(password)  === true){
        color = 'blue'
        isGoodPassword = false
      } else{
        color = 'red'
        isGoodPassword = false
      }
      return {color: color, isGoodPassword: isGoodPassword}
  }


  const samePassword = (text) => {
    SetVerifyPassword(text) 
     console.log(verifyPassword)
    if(checkStrongPassword === "green"){
    if(password === verifyPassword){
      setCheckSamePassword(true)
    }else{
      setCheckSamePassword(false)
    }
  }
    else{
      setCheckSamePassword(false)
    }
  }
