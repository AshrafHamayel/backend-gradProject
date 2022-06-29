const sessions = require('express-session');
const uuid = require('uuid').v4;
const cookieParser = require("cookie-parser");
const express = require('express');
const appl=express.Router();
appl.use(cookieParser());

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result; 
  }
  
  console.log(makeid(50));
  
  
  
  const uniqueId = makeid(50);
  const oneDay = 1000 * 60 * 60 * 24;
  module.exports = sessions({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    userid: null,
    secret: uniqueId,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay}
  })
 

 




  