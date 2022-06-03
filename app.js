const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config();

const app = express();
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('port', 3000);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
  });

  app.listen(app.get('port'), async()=> {
    console.log(`Server started on port ${app.get('port')}`);
  });