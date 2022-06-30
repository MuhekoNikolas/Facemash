

function checkDatabasePost(req,resp,next){
  userInfo = req.body
  username = userInfo.username
  email = userInfo.email
  password = userInfo.password

  usersDB.find({username:username}, (err,doc)=>{
    if(err){console.log(err)}
    if(doc.length>0){
      obj = {
        success:false,
        message:`The username: ${username} is already in use.`
      }
      
      resp.send(obj)
      
    }
  })

  usersDB.find({email:email}, (err,doc)=>{
    if(err){console.log(err)}
    if(doc.length>0){
      obj = {
        success:false,
        message:`The email: ${email} is already in use.`
      }
      
      resp.send(obj)
      
    }
  })

  
  if(!resp.headersSent){
    setTimeout(next,500)
  }
  
}



function oneSecondPause(req,resp,next){
  userObj = req.body
  username = userObj.username
  password = userObj.password
  
  usersDB.find({username:username}, (err,doc)=>{
    if(err){throw err}
    if(doc.length<=0){
      obj = {
        success:false,
        message:"Wrong username or password"
      }
      resp.send(obj)
      resp.end()
    } else {

      /*/
      console.log(doc)
      console.log("pass: "+password)
      console.log("hash: "+doc[0].password)
      console.log(password)
      /*/
      passwordMatch = bcrypt.compareSync(password, doc[0].password)
      
      if(passwordMatch==false){
        obj = {
          success:false,
          message:"Wrong username or password"
        }
        resp.send(obj)
        resp.end()
      } else {
        doc.password = password

        toSendObj = doc[0]
        toSendObj.password = password
        obj = {
          success:true,
          message:"Succesfully logged in",
          data:toSendObj
          
        }
        
        
        resp.send(obj)
        resp.end()
      }
      
    }
    
    
  })
  setTimeout(next,500)
}


module.exports= {
  checkDatabasePost:checkDatabasePost,
  oneSecondPause:oneSecondPause
  
}