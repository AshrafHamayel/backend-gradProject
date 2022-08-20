
const express = require('express');
const db = require('../config/database');
const Post = require('../models/posts');
const userInfo = require('../models/userInfo');
const userLiksAndFollow = require('../models/userLiksAndFollow');

const appl = express.Router();


appl.get('/myProf', (req, res) => {
   var UserId= req.query.UserId;
    console.log(UserId +" --")


    if (UserId.length> 10){
    userInfo.findOne({_id: UserId })
    .then(UserInfor => {

      if (!UserInfor) 
      {
        console.log('not found');


    }
    else
    return res.json(UserInfor);


});
}

else{
  console.log('Id is Null ---------');

}

   

});

appl.get('/frindProf', (req, res) => {
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;
var PressAttention0;

   if (FrindId.length> 10){
   userInfo.findOne({_id: FrindId })
   .then(UserInfor => {

     if (!UserInfor) 
     {
       console.log('not found');


   }
   else{



    userLiksAndFollow.find({id:CurrentUser,Ifollow:{$all:[FrindId]} }).then(useerfollow => {


      
      if(useerfollow.length>2)
      PressAttention0='true'
      if(useerfollow.length<2)
      PressAttention0='false'

        
            console.log('false');
            return  res.json({
              _id:UserInfor._id,
              email: UserInfor.email,
              name: UserInfor.name,
              image: UserInfor.image,
              work :UserInfor.work,
              followers : UserInfor.followers,
              Ifollow : UserInfor.Ifollow,
              evaluation :UserInfor.evaluation,
              description : UserInfor.description,
              Section:UserInfor.Section,
              phoneNumber:UserInfor.phoneNumber,
              city:UserInfor.city,
              Type:UserInfor.Type,
              Salary:UserInfor.Salary,
              pressAttention:PressAttention0,
          })
      



   }
 )


 
   }
   //return res.json(UserInfor);


});
}

else{
 console.log('Id is Null ---------');

}

  

});










appl.post('/editPassword', (req, res) => {
  var UserId= req.query.UserId;
  var oldPass = req.query.Opassword;
  var NewPass = req.query.Npassword;
  var ConfNewPass = req.query.NCpassword;

  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        if(oldPass==UserInfor.password){
           if(NewPass==ConfNewPass){

        // const update = {  { password: NewPass } }
        userInfo.findOneAndUpdate({ _id: UserId }, { password: NewPass },(err) => {
      if (err) console.log(err);
      else
      return  res.json({
        NT:'done'
    })

    })

           }
        else
        {
          return  res.json({
            NT:'password does not match'
        })
        }

           
        }
        else
        {
          return  res.json({
            NT:'The password is incorrect'
        })
        }

       }
        //return res.json(UserInfor);


});



});



appl.post('/saveImage',(req, res) => {
  

  var UserId= req.query.UserId;
 var imagePath= req.query.imagePath;

  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        
        //   if(NewPass==ConfNewPass){

      
        userInfo.findOneAndUpdate({ _id: UserId }, { image: imagePath ,Type:'email'},(err) => {
      if (err) console.log('saveImage ---1 '+err);
      else
      {

        Post.updateMany({ id: UserId }, { imageuser: imagePath },(err) => {
          if (err) console.log('saveImage ---2 '+err);
          else
      {
        return  res.json({
          NT:'done'
      })
      }

        })

      

      }
    

    })

           }
      

      // }
        //return res.json(UserInfor);


});

  

});






// appl.post('/setFollow',(req, res) => {

  
//   var FrindId= req.query.frindId;
//   var CurrentUser= req.query.currentUser;
//   console.log('from set Follow : ');
//   console.log('CurrentUser : '+CurrentUser);
//   console.log('FrindId : '+FrindId);
//   userLiksAndFollow.find({id:CurrentUser,Ifollow:{$all:[FrindId]} }).then(useerfollow => {
//     console.log('useerfollow : '+useerfollow);
//         if(!useerfollow){
//           userLiksAndFollow.findOneAndUpdate({id:CurrentUser, },
//             {$pull:{Ifollow:FrindId,},}).then(useerfollow1 => {
//               console.log('else-useerfollow1 : '+useerfollow1);
//     //-------------------------------------------------------------------------------
//               userLiksAndFollow.findOneAndUpdate({id:FrindId, },
//                 {$pull:{followers:CurrentUser,},}).then(useerfollow2 => {
//                   console.log('else-useerfollow2 : '+useerfollow2);
//     //-------------------------------------------------------------------------------    
                
//                   userInfo.findOneAndUpdate({ _id: CurrentUser }, { Ifollow:  useerfollow1.Ifollow.length},(err) => {
//                     console.log('else-useerfollow1.Ifollow.length : '+useerfollow1.Ifollow.length);
//                     userInfo.findOneAndUpdate({ _id: FrindId }, { followers: useerfollow2.followers.length},(err) => {
//                       console.log('else-useerfollow2.followers.length : '+useerfollow2.followers.length);
//                       console.log('false');
//                       return  res.json({pressAttention:'false'})
    
//                     })
//                   })
        
                  
//                 })
    
    
//             })
//         }
// //-------------------------------------------------------------------------------
//      else{
//     //-------------------------------------------------------------------------------
//     userLiksAndFollow.findOneAndUpdate({id:CurrentUser, },
//       {$push:{Ifollow:FrindId,},}).then(useerfollow1 => {
//         console.log('useerfollow1 : '+useerfollow1);
// //-------------------------------------------------------------------------------
//         userLiksAndFollow.findOneAndUpdate({id:FrindId, },
//           {$push:{followers:CurrentUser,},}).then(useerfollow2 => {
//             console.log('useerfollow2 : '+useerfollow2);
// //-------------------------------------------------------------------------------
          
//             userInfo.findOneAndUpdate({ _id: CurrentUser }, { Ifollow: useerfollow1.Ifollow.length},(err) => {
//               console.log('useerfollow1.Ifollow.length : '+useerfollow1.Ifollow.length);
//               userInfo.findOneAndUpdate({ _id: FrindId }, { followers: useerfollow2.followers.length},(err) => {
//                 console.log('useerfollow2.followers.length: '+useerfollow2.followers.length);
//                 console.log('true');
//                 return  res.json({pressAttention:'true'})

//               })


//             })


//           })


//       })
//     }


//      }
     
//    )


// });





appl.post('/setFollow',(req, res) => {

  
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;
  console.log('from set Follow : ');
  console.log('CurrentUser : '+CurrentUser);
  console.log('FrindId : '+FrindId);

  userLiksAndFollow.find({id:CurrentUser,Ifollow:{$all:[FrindId]} }).then(useerfollow => {

    console.log('useerfollow : '+useerfollow+'after');
    
        if(useerfollow.id!=CurrentUser){
          userLiksAndFollow.findOneAndUpdate({id:CurrentUser, },
            {$push:{Ifollow:FrindId,},}).then(useerfollow1 => {
              console.log('useerfollow1 : '+useerfollow1);
              userLiksAndFollow.findOneAndUpdate({id:FrindId, },
                {$push:{followers:CurrentUser,},}).then(useerfollow2 => {
                  return  res.json({pressAttention:'false'})
      
                })
      
      
            })
        
        }



     else{

      userLiksAndFollow.findOneAndUpdate({id:CurrentUser, },
        {$pull:{Ifollow:FrindId,},}).then(useerfollow1 => {
          console.log('else-useerfollow1 : '+useerfollow1);

          userLiksAndFollow.findOneAndUpdate({id:FrindId, },
            {$pull:{followers:CurrentUser,},}).then(useerfollow2 => {
              console.log('else-useerfollow2 : '+useerfollow2);
              return  res.json({pressAttention:'true'})
            })


        })
        
    }


     }
     
   )


});






module.exports = appl;



