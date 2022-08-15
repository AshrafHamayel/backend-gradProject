
const express = require('express');
//const authenticate = require('../Authentication/authenticate'); /////  1
const db = require('../config/database');
const userInfo = require('../models/userInfo');

const appl = express.Router();

appl.post('/login', (req, res) => {
                const  oldUser = new userInfo();
                let email1= req.query.email;
                let  pass  = req.query.password;
                  console.log(email1 +"--")
                userInfo.findOne({ email: email1 })
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

                res.json({
                  NT:'done',
                  uid:oldUser._id,
                  name:oldUser.name,
                  imegUrl:oldUser.image,
                      })
            console.log("done ");

            }



          else {
              res.json({
              NT:'The password is incorrect'
          })


}



}
  


});

});


module.exports = appl;