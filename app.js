
const express =require('express');
const bodyParser=require('body-parser');
const session = require('./Authentication/session');
const authenticate = require('./Authentication/authenticate');
//const db = require('./config/database');
//const app = express.Router();
const app=express();
app.use(bodyParser.json());
app.use(session);



const login=require('./Pages/login');
const signUp=require('./Pages/signUp');
const logout=require('./Pages/logout');
const myProf=require('./Pages/myProf');
const chatMessage=require('./Pages/chatMessage');


app.use('/login',login)
app.use('/signUp',signUp);
app.use('/logout',logout);
app.use('/myProf',myProf);
app.use('/chatMessage',chatMessage);

app.use(authenticate);


// create the homepage route at '/'
app.get('/', (req, res) => {

  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})



app.listen('8000',()=> 
{
  console.log('server started on port 8000');

});

