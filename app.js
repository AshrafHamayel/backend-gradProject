
const express =require('express');
const bodyParser=require('body-parser');
const session = require('./Authentication/session');
const authenticate = require('./Authentication/authenticate');
//const app = express.Router();
const app=express();
app.use(bodyParser.json());
app.use(session);



const login=require('./Pages/login');
const signUp=require('./Pages/signUp');


app.use('/login',login)
app.use('/signUp',signUp);

app.use(authenticate);


// create the homepage route at '/'
app.get('/', (req, res) => {

  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})



app.listen('3000',()=> 
{
  console.log('server started on port 3000');

});

