
// const express = require('express');
// const db = require('../config/database');
// const userInfo = require('../models/userInfo');
// const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

// let ts = Date.now();
// let date_ob = new Date(ts);

// var NameSenders1 = new Array();
// var NameSenders2 = new Array();
// var NameSenders3 = new Array();
// var test=0;
// var caount=5;

// const appl = express.Router();
//     let MyImage;
//     let SenderImage;
//     let SenderName ;

// appl.get('/SendMessage', (req, res) => {
 
//     var MEmail= req.query.MyEmail;
//     var SEmail= req.query.SenderEmail;
//     //var Date= req.query.date;
//     var TwxtMessage= req.query.TextMessage;
//     var WhoSend= req.query.WhoSender;
//     var TMessage= req.query.TypeMessage;
//     //var LMessage= req.query.LastMessage;
//     //var MessaView= req.query.MessageView;



//     //console.log(emailP +" --")

//     userInfo.findOne({ email: MEmail })
//     .then(UserInfor1 => {

//       if (!UserInfor1) 
//          console.log('not found My Email');
      
//      else
//          MyImage=UserInfor1.image;
//                        });
  
      

//       userInfo.findOne({ email: SEmail })
//     .then(UserInfor2 => {
  
//       if (!UserInfor2) 
//          console.log('not found Sender Email');
      
//      else
//      {
//         SenderImage=UserInfor2.image;
//         SenderName=UserInfor2.name;

//      }
//                     });                 


//                     sleep(500).then(() => {
         

//  let newMessage = new chats(
//                 {
                   
//                     MyEmail: MEmail,
//                     SenderEmail: SEmail,
//                     MyImage: MyImage,
//                     SenderImage: SenderImage,
//                     date :date_ob,
//                     SenderName : SenderName,
//                     TextMessage : TwxtMessage,
//                     WhoSender :WhoSend,
//                     TypeMessage :TMessage,
//                     LastMessage :'True',
//                     MessageView : 'False',
//                    // number:caount++

//                 });
       
  
//                 newMessage.save((err) => {
//             if (!err) {

//               res.json({
//                   NT:'done'
//                       })
//               console.log("done ");
                        
                      
//             }

//             else {
            
//                 res.json({
//                     NT:'cannt send !'
//                 })
//                 console.log('cannt send ! =>'+err);

//             }

//         })

//     });


// });


// appl.get('/getPepole', (req, res) => {
//     NameSenders1=[];
//     NameSenders2=[];

//     var MEmail= req.query.MyEmail;
//     console.log(MEmail);
//     chats.find( { $or: [ { MyEmail:MEmail }, { SenderEmail: MEmail } ] } )
//   .then(Pepole => {
//     if(!Pepole)
//     {
//         console.log('not found');

//         return  res.json('not found');
    

//     }
//     else
//     {
//         if(Pepole.length<3)
//         return  res.json('null');

//         else
//         {
//             // Pepole[2].SenderName
//            //  console.log(Pepole.length);
//            for(var i=0;i<Pepole.length;i++)
//            {

//             NameSenders1.push(Pepole[i].SenderName);
//             NameSenders2.push(Pepole[i]);


//            }
//            for(var i=0;i<Pepole.length;i++)
//            {
//             test=0;
//             for(var j=0;j<Pepole.length;j++)
//             {
            
//              if(NameSenders1[i]==NameSenders1[j])
//                     test++;
//             }

//             if(test>1)
//             {
//                 // delete NameSenders2[i];
//                 // delete NameSenders1[i];
//                 NameSenders2.splice(i, 1);
//                 NameSenders1.splice(i, 1);

//             }
           
            
//            }

//            console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
//            console.log(NameSenders2);
//             return res.json(NameSenders2);

//         }

//     }

// });


//   });
  

  




// module.exports = appl;



