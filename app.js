const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {sequelize}=require('./models');
const bcrypt = require('bcrypt');
const dbFunct = require(__dirname+"/database.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const multer = require("multer");
const fs=require("fs");

require('dotenv').config();

const app = express();
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/uploads"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1*60*60*1000*4
  }
}));
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

var sessionLogged = async(req, res, next) => {
  
  console.log("Origin URL: "+req.originalUrl);
  if (req.session.user && req.cookies.user_sid) {
      res.redirect("/");
  } else {
      next();
  }    
};
var sessionChecker = async(req, res, next) => {
  
  console.log("Origin URL: "+req.originalUrl);
  if (req.session.user && req.cookies.user_sid) {
      next();
  } else {
      res.redirect("/login");
  }    
};

app.set('port', 3000);

let msg="";

const folder='./uploads';
if(!fs.existsSync(folder))
{
  fs.mkdirSync(folder);
}

app.get("/",(req,res)=>{
  console.log(req.session.user);
  if (req.session.user && req.cookies.user_sid) {
    const userID=req.session.user.userID;
    const status=req.session.user.status; 
    var hour = 3600000*2;
    req.session.cookie.expires = new Date(Date.now() + hour)
    console.log("Auto LogOut Time: "+req.session.cookie.expires.toLocaleString('en-US', {timeZone: "Asia/Kolkata"}));
    console.log("User Session DashBoard "+JSON.stringify(req.session.user));
    res.render("home",{userID:userID,status:status});
  } else {
    res.render("home",{userID:"",status:false});
  }
  });

app.get("/colleague",async(req,res)=>{
  let users=[];
  if (req.session.user && req.cookies.user_sid) {
    const userID=req.session.user.userID;
    const status=req.session.user.status; 
    users=await dbFunct.getAllColleagues(userID);
    console.log(users);
    res.render("colleague",{userID:userID,status:status,users:users});
  } else {
    res.render("colleague",{userID:"",status:false,users:users});
  }
});

app.get("/colleague/remove/:colleagueID",async(req,res)=>{
const colleagueID=req.params.colleagueID;
const userID=req.session.user.userID;
await dbFunct.delColleague(userID,colleagueID);
res.redirect("/colleague");
});

app.post("/colleague/add",async(req,res)=>{
const userID=req.session.user.userID;
const colleagueID=req.body.roll;
try {
  const colleagueName=await dbFunct.getUser(colleagueID);
  console.log(colleagueName);
await dbFunct.storeColleague(userID,colleagueID,colleagueName.name);
} catch (error) {
  console.log(error);
}
res.redirect("/colleague");
});


app.get("/post",async(req,res)=>{
  if (req.session.user && req.cookies.user_sid) {
    const userID=req.session.user.userID;
    const status=req.session.user.status; 

    res.render("post",{userID:userID,status:status});
  } else {
    res.render("post",{userID:"",status:false});
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+req.session.user.userID+"N"+req.session.user.postN+ path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

var uploadFile = upload.fields([{ name: 'postFile', maxCount: 1 }])

app.post("/uploadPost",uploadFile,async(req,res)=>{
const userID=req.session.user.userID;
const userName=req.session.user.userName;
const caption=req.body.caption;
console.log("id: "+userID);
console.log("name: "+userName);
const prevPostN=req.session.user.postN;
const fileName="/"+req.files.postFile[0].filename;
console.log("fileName: "+fileName);
console.log("caption: "+caption);
await dbFunct.storePost(userID,userName,fileName,caption);
const postN=parseInt(prevPostN)+1;
await dbFunct.updateUserPost(userID,postN);
req.session.user.postN=postN;
res.redirect("/mypost");
});

app.get("/mypost",async(req,res)=>{
  let posts=[];
  if (req.session.user && req.cookies.user_sid) {
    const userID=req.session.user.userID;
    const status=req.session.user.status; 
    const posts=await dbFunct.getUserPosts(userID);
    res.render("myPosts",{userID:userID,status:status,posts:posts});
  } else {
    res.render("myPosts",{userID:"",status:false,posts:posts});
  }
});

app.get("/post/edit/:postID",async(req,res)=>{
res.render("editor",{postID:req.params.postID});
});

app.post("/post/update/:postID",async(req,res)=>{
const postID=req.params.postID;
const caption=req.body.caption;
await dbFunct.updateCaption(postID,caption);
res.redirect("/mypost");
});

app.get("/post/delete/:postID",async(req,res)=>{
  const postID=req.params.postID;
  await dbFunct.delPost(postID);
  res.redirect("/mypost");
  });

app.get("/feed",async(req,res)=>{
  let feeds=[];
const userID=req.session.user.userID;
const status=req.session.user.status;
const friends = await dbFunct.getAllFriends(userID);
friends.forEach(async(friend) => {
  const posts=await dbFunct.getUserPosts(friend.userID);
  feeds.push(posts);
});

res.render("feed",{userID:userID,status:status,feeds:feeds})
});

  app.get("/register",sessionLogged,(req,res)=>{
  res.sendFile(__dirname+"/views/register.html");
});
  
app.post("/register",async(req,res)=>{
console.log(req.body);
const pass=req.body.password;
const name=req.body.name;
const userID=req.body.roll;
const email=req.body.email;
msg=await dbFunct.storeUser(userID,name,email);

console.log(msg);

bcrypt.hash(pass,10, async(err, hash)=> {
  msg=await dbFunct.storeUserAuth(userID,hash);
  console.log(msg);
});
await dbFunct.storeColleague(userID,20512200,"Pauline I. Bird");
await dbFunct.storeColleague(userID,205122002,"Ralph L. Alva");
await dbFunct.storeColleague(userID,205122003,"John B. Roman");
await dbFunct.storeColleague(userID,205122004,"David O. Buckley");
const user=await dbFunct.getUser(userID);
        
req.session.user={
  userID:userID,
  userName:user.name,
  userEmail:user.email,
  status:true,
  postN:1
}
res.redirect("/");
  });  
  
  app.get("/login",sessionLogged,(req,res)=>{
  res.sendFile(__dirname+"/views/login.html");
})

  app.post("/login",async(req,res)=>{
    const userID=req.body.roll;
    const passIn=req.body.password;
    const pass=await dbFunct.getUserAuth(userID);
    
    bcrypt.compare(passIn, pass, async(err, result)=> {
      
      if(result){
        const user=await dbFunct.getUser(userID);
        
        req.session.user={
          userID:userID,
          userName:user.name,
          userEmail:user.email,
          status:true,
          postN:user.postN
        }
        res.redirect("/")
      }
      else
      res.redirect("/login")
  });
  });
  app.get('/logout',(req, res) => {
    console.log("/logout");
    if (req.session.user && req.cookies.user_sid) {
    req.session.user={};
    res.clearCookie('user_sid');
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
    
   
    } else {
        res.redirect('/login');
    }
  });

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });

  app.listen(app.get('port'), async()=> {
    console.log(`Server started on port ${app.get('port')}`);
    await sequelize.authenticate();
    console.log("db connected");
    const user = await dbFunct.getUser(205122001);
    if(!user){
    await dbFunct.storeUser(205122001,"Pauline I. Bird","a@b.com");
    await dbFunct.storeUser(205122002,"Ralph L. Alva","a@b.com");
    await dbFunct.storeUser(205122003,"John B. Roman","a@b.com");
    await dbFunct.storeUser(205122004,"David O. Buckley","a@b.com");
    
    bcrypt.hash("123",10, async(err, hash)=> {
    await dbFunct.storeUserAuth(205122001,hash);
    await dbFunct.storeUserAuth(205122002,hash);
    await dbFunct.storeUserAuth(205122003,hash);
    await dbFunct.storeUserAuth(205122004,hash);
    });
    
    }
    
  });