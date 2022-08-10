
const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');
const chats = require('../models/chats');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

let ts = Date.now();
let date_ob = new Date(ts);
const appl = express.Router();
    let MyImage;
    let SenderImage;
    let SenderName ;

appl.get('/SendMessage', (req, res) => {
 
    var MEmail= req.query.MyEmail;
    var SEmail= req.query.SenderEmail;
    //var Date= req.query.date;
    var TwxtMessage= req.query.TextMessage;
    var WhoSend= req.query.WhoSender;
    var TMessage= req.query.TypeMessage;
    //var LMessage= req.query.LastMessage;
    //var MessaView= req.query.MessageView;



    //console.log(emailP +" --")

    userInfo.findOne({ email: MEmail })
    .then(UserInfor1 => {

      if (!UserInfor1) 
         console.log('not found My Email');
      
     else
         MyImage=UserInfor1.image;
                       });
  
      

      userInfo.findOne({ email: SEmail })
    .then(UserInfor2 => {
  
      if (!UserInfor2) 
         console.log('not found Sender Email');
      
     else
     {
        SenderImage=UserInfor2.image;
        SenderName=UserInfor2.name;

     }
                    });                 


                    sleep(500).then(() => {
         

 let newMessage = new chats(
                {
                   
                    MyEmail: MEmail,
                    SenderEmail: SEmail,
                    MyImage: MyImage,
                    SenderImage: SenderImage,
                    date :date_ob,
                    SenderName : SenderName,
                    TextMessage : TwxtMessage,
                    WhoSender :WhoSend,
                    TypeMessage :TMessage,
                    LastMessage :'True',
                    MessageView : 'False'
                  

                });
       
  
                newMessage.save((err) => {
            if (!err) {

              res.json({
                  NT:'done'
                      })
              console.log("done ");
                        
                      
            }

            else {
            
                res.json({
                    NT:'cannt send !'
                })
                console.log('cannt send ! =>'+err);

            }

        })

    });


});


appl.post('/getPepole', (req, res) => {

    var MEmail= req.query.MyEmail;
    var SEmail= req.query.SenderEmail;

   

    chats.find({ MyEmail: MEmail })
  .then(Pepole => {

   

});





  });
  

  




module.exports = appl;



