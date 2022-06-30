


//window.location.href = "/login"

var homeContainer;

function defineVariables(){
  homeContainer = document.getElementById("homeContainer")
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
    //alert(k)
    window.location.href = "/login"
    return false
    
  }
  
  verifyLogInfromBackend(user)
    .then(data=>{
      //alert(data.password)
      if(data.success == false){
        window.location.href = "/login"
        return false
      }
      userData = data.data
      setCookie("user", JSON.stringify(userData))
      return true
    })
    .catch(err=>{console.log(err)})
  
  return true
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



  

function greet(){
  loggedIn=checkIfLoggedIn()
  //alert(loggedIn)
  
  if(loggedIn==true){
    p= document.createElement("h1")
    p.innerHTML = '<span style="color:blue; font-size:6.5rem; text-align:center; display:block; white-space:break-word;">'+"Hello "+user.username+"</span>"
    
    homeContainer.append(p)
    
  }

}


greet()
setInterval(checkIfLoggedIn, 30000)


