
const express =require('express');
const bodyParser=require('body-parser');
//const session = require('./Authentication/session');
//const authenticate = require('./Authentication/authenticate');
//const db = require('./config/database');
//const app = express.Router();
const app=express();
app.use(bodyParser.json());
//app.use(session);



const login=require('./Pages/login');
const signUp=require('./Pages/signUp');
const myProf=require('./Pages/myProf');
const addPost=require('./Pages/addPost');
const usersInfo=require('./Pages/usersInfo');
const addComit=require('./Pages/addComit');
const search=require('./Pages/search');
const addComplaint=require('./Pages/addComplaint');
const addTenders=require('./Pages/addTenders');


app.use('/login',login)
app.use('/signUp',signUp);
app.use('/myProf',myProf);
app.use('/addPost',addPost);
app.use('/usersInfo',usersInfo);
app.use('/addComit',addComit);
app.use('/search',search);
app.use('/addComplaint',addComplaint);
app.use('/addTenders',addTenders);

//app.use(authenticate);


// create the homepage route at '/'
app.get('/', (req, res) => {

  console.log('Inside the homepage callback function')
  //console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})





app.listen('80',()=> 
{
  console.log('server started on port 80');
  

});

