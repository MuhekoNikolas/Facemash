


var usernameInput;
var passwordInput;
var loginNotifier;
var loginButton;
 


function defineVariables(){
  usernameInput= document.getElementById("usernameInput")
  passwordInput= document.getElementById("passwordInput")
  loginButton= document.querySelector(".loginButton")
  loginNotifier = document.querySelector(".login-notifications")
  
}
defineVariables()





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
        usernameInput.value = userData.username
        passwordInput.value = userData.password
        loginButton.click()
        //window.location.href = "/"
      }
    })
    .catch(err=>{console.log(err)})
  
  
}

  
  
  
  


checkIfLoggedIn()



function verifyCridentials(){

  username = usernameInput.value
  password = passwordInput.value
  obj={
    username,
    password
  }
  verifyLogInfromBackend(obj)
    .then(data=>{
      if(data.success == false){
        loginNotifier.style.display = "block"
        loginNotifier.style.color = "red"
        loginNotifier.innerText = data.message
        return
      }

      loginNotifier.style.display = "block"
      loginNotifier.style.color = "green"
      loginNotifier.innerText = data.message
      userData = data.data
      setCookie("user", JSON.stringify(userData))
      window.location.href = "/"
      
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