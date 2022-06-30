
var emailInput;
var usernameInput;
var passwordInput;


function defineSignupVariables(){
  emailInput = document.getElementById("emailInputSignup")
  usernameInput = document.getElementById("usernameInputSignup")
  passwordInput = document.getElementById("passwordInputSignup")
  signupNotify = document.querySelector(".signup-notifications")
  
}

defineSignupVariables()
checkIfLoggedIn()


function checkIfLoggedIn(){
  k= document.cookie

  user = getCookieValue("user")

  if(user==false){
    
    user = "{}"
  }
  user = JSON.parse(user)
  
  if(user.username == "" || !user.username || user.username==undefined){
    return
  }
  
  verifyLogInfromBackend(user,true)
    .then(data=>{
      //alert(data.password)
      if(data.success == false){
        return
      }
      userData = data.data
      setCookie("user", JSON.stringify(userData))
      if(data.toHome == true){
        window.location.href = "/"
      }
    })
    .catch(err=>{console.log(err)})
  
  
}




function validateCridentials(){
  signupNotify.innerText = ""
  signupNotify.style.display = "none"
  signupNotify.style.color = "green"
  
  usernameValidationResult = validateUserName()
  if(usernameValidationResult!=true){
    signupNotify.style.display = "block"
    signupNotify.style.color = "red"
    signupNotify.innerText = usernameValidationResult
    return
  }

  signupNotify.style.display = "none"
  signupNotify.style.color = "green"

  emailValidationResult = validateEmail()
  if(emailValidationResult!=true){
    signupNotify.style.display = "block"
    signupNotify.style.color = "red"
    signupNotify.innerText = emailValidationResult
    return
  }

  signupNotify.style.display = "none"
  signupNotify.style.color = "green"

  
  passwordValidationResult = validatePassword()
  if(passwordValidationResult!=true){
    signupNotify.style.display = "block"
    signupNotify.style.color = "red"
    signupNotify.innerText = passwordValidationResult
    return
  }

  signupNotify.style.display = "block"
  signupNotify.style.color = "blue"
  signupNotify.innerHTML = `Validating credentials <i class="fa-solid fa-cog fa-spin"></i>`

  infoObject = {
    username:usernameInput.value,
    password:passwordInput.value,
    email:emailInput.value
  }
  validateCredentialsWithBackend(infoObject)
    .then(data=>{
      if(data.success == false){

        signupNotify.style.display = "block"
        signupNotify.style.color = "red"
        signupNotify.innerText = data.message
        return
      }
      
      setCookie("user", JSON.stringify(data))
      window.location.href = "/"
      
          
        
    })
    .catch(err=>{throw err})
 

  
  
}


function validateUserName(){
  usernameValue = usernameInput.value
  if(usernameValue.length<3){
    return "The username must be bigger than 2 letters"
  }

  if(usernameValue.length>20){
    return "The username must be less than 10 letters"
  }

  return true

}

function validateEmail(){
  emailValue = emailInput.value
  if(emailValue.length<3){
    
    return "Please enter a valid email address!"
  }
  
  if(emailValue.includes("@")==false || emailValue.includes(".")==false){
    
    return "Please enter a valid email address!"
  }
  
  letters = "abcdefghijklmnopqrstuvwxyz"
  validChars = letters+letters.toUpperCase()+"0123456789@."+"!#$%&'*+-/=?^_`{|}~"
  for(char in emailValue){
    char = emailValue[char]
    
    if(validChars.includes(char)==false){
      return "Please enter a valid email address!"
    }
    
  }

  return true
  
}


function validatePassword(){
  passwordValue = passwordInput.value
  if(passwordValue.length<5){
    return "The password must consist of 6+ letters,numbers or symbols!"
  }
  return true
}


function validateCredentialsWithBackend(obj){
  infoObject = obj

  options = {
    method:"POST",
    body: JSON.stringify(infoObject),
    headers: {
      "Content-Type":"application/json"
    }
  }

  return fetch("/api/validateCredentials", options)
    .then(data=>data.json())
    .then(data=>{
      return data
      
      
    
    })
    .catch(err=>{console.log(err)})
  
}





function verifyLogInfromBackend(obj,toHome=false){
  options = {
    method:"POST",
    body: JSON.stringify(obj),
    headers:{
      "Content-Type":"application/json"
    }
  }

  return fetch("/api/validateLogin", options)
    .then(data=>data.json())
    .then(data=>{
      if(toHome!=false){
        data.toHome = true
      }
      return data
    })
    .catch(err=>{console.log(err)})
}



setInterval(checkIfLoggedIn, 60000)