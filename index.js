

dataStore = require("nedb")
express = require("express")
bcrypt = require("bcryptjs")
bodyParser = require("body-parser")
middlewares = require("./res/middlewares.js")

usersDB = new dataStore({filename:"databases/users.json", timestampData:true})
usersDB.loadDatabase()



app = new express()

app.use(express.json())
app.use(express.static("websites"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req,resp,next){
  usersDB.loadDatabase()
  next()
})

checkDatabasePost = middlewares.checkDatabasePost
oneSecondPause= middlewares.oneSecondPause


app.get("/", (req,resp)=>{
  
  resp.sendFile(__dirname+"/websites/sites/home.html")
  
})

app.get("/login", (req,resp)=>{
  
  resp.sendFile(__dirname+"/websites/sites/login.html")

})

app.get("/signup", (req,resp)=>{
  
  resp.sendFile(__dirname+"/websites/sites/signup.html")

})


app.get("/users/:userId", (req,resp)=>{
  resp.sendFile(__dirname+"/websites/sites/otherSites/userProfile.html")
})

app.get("api/users/:userId", (req,resp)=>{

  reqId = req.params.userId
  console.log(reqId)
  usersDB.loadDatabase()
  usersDB.find({id:reqId}, (err,doc)=>{
    if(err){throw err}
    if(doc.length<=0){
      obj = {
        success: false,
        message:"No user found matching that id"
      }
      
      resp.send(obj)
      return
    }
    doc[0].password = undefined
    
    obj = {
      success: true,
      message:"Found a user",
      data:doc[0]
    }
    
    resp.send(obj)
  })
  
})





app.post("/api/validateCredentials",checkDatabasePost, (req,resp)=>{
  
  if(!resp.headersSent){
    (async function createNewUser(){
      userInfo = req.body
      

      usersDB.find({}, (err,doc)=>{
        if(err){console.log(err)}

        obj1 = {
          username:userInfo.username,
          password:userInfo.password,
          email:userInfo.email,
          id:doc.length+1
        }

        hashedPass =   bcrypt.hashSync(userInfo.password,10)
        obj = {
          username:userInfo.username,
          password:hashedPass,
          email:userInfo.email,
          rank:"member",
          id:String(doc.length+1)
        }

        usersDB.insert(obj)
        obj1.success = true
        
        resp.send(obj1)
    
      })

    })()
    
  }
  
})


app.post("/api/validateLogin",oneSecondPause, (req,resp)=>{
  
  if(resp.headersSent){return}
  obj = {
    success:false,
    message:"Wrong username or password"
  }
  resp.send(obj)
  
})


app.listen(8080, ()=>{
  console.log(`Running http://localhost:8080`)
})
