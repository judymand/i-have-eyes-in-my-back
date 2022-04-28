

  const checkPassword = (password) => {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    let color = "red"
      if(strongPassword.test(password)  === true) {
        color = "green"
      } else if(mediumPassword.test(password)  === true){
        color = 'blue'
      } else{
        color = 'red'
      }
      return color
  }
//   const checkPassword = (Password) => {
//     let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
//     let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
//     SetPassword(Password)
//       if(strongPassword.test(password)  === true) {
//         setCheckStrongPassword("green")
//       } else if(mediumPassword.test(password)  === true){
//         setCheckStrongPassword('blue')
//       } else{
//         setCheckStrongPassword('red')
//       }
//   }


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
