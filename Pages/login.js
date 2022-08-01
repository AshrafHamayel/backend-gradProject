
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const User = require('../models/user');

const appl = express.Router();

appl.post('/login', (req, res) => {
  const  oldUser = new User();
  let email1= req.query.email;
  let  pass  = req.query.password;
    console.log(email1 +"--")
   User.findOne({ email: email1 })
    .then(oldUser => {

      if (!oldUser) {
        console.log('not found');
        res.json({
          NT:'not found'
      })
    }
    else
{
if(pass==oldUser.password)
{

  return  res.json({
    NT:'done'
})

}
else {
  return  res.json({
    NT:'The password is incorrect'
})


}



}
  


});

});


module.exports = appl;