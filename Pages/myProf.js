
const express = require('express');
const db = require('../config/database');
const Post = require('../models/posts');
const userInfo = require('../models/userInfo');
const comit = require('../models/comit');
const appl = express.Router();


appl.get('/myProf', (req, res) => {
   var UserId= req.query.UserId;
  


    if (UserId.length> 10){
    userInfo.findOne({_id: UserId })
    .then(UserInfor => {

      if (!UserInfor) 
      {
        console.log('not found');

       }
    else
    {

      comit.find({id:UserId}).then(userRate => {

        var RatingFrind;
        var doubleNumber;
        var SumRating=0;
        var FinalRating;
        var RatingsNumber = new Array();
    
          for(var i=0;i<userRate.length;i++)
          {
        
            doubleNumber = parseFloat(userRate[i].rating);
            RatingsNumber.push(doubleNumber);
          }
         
          for(var i=0;i<RatingsNumber.length;i++)
          {
            SumRating=SumRating+RatingsNumber[i];
          }
         
          FinalRating=(SumRating/RatingsNumber.length);
          RatingFrind=FinalRating.toString();
        
       
       
        return  res.json({
          _id:UserInfor._id,
          email: UserInfor.email,
          name: UserInfor.name,
          image: UserInfor.image,
          work :UserInfor.work,
          followers : UserInfor.followers.length,
          Ifollow : UserInfor.Ifollow.length,
          rating:RatingFrind,
          Section:UserInfor.Section,
          phoneNumber:UserInfor.phoneNumber,
          city:UserInfor.city,
          description : UserInfor.description,
          Type:UserInfor.Type,
          Salary:UserInfor.Salary,
          latitude:UserInfor.latitude,
          longitude:UserInfor.longitude,
          Availability:UserInfor.Availability,
          UserType:UserInfor.UserType,
          pressAttention:'false',
          TypePosts:UserInfor.TypePosts,

      })



        });
      }


});
    }

else{
  console.log('Id is Null ---------');

}

   

});

appl.get('/frindProf', (req, res) => {
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;
var Favv;

var CurrentUserLat;
var CurrentUserLong;

userInfo.findOne({$and:[{_id: CurrentUser },{Ifollow: FrindId }]})
.then(UserFav => {

  if (!UserFav) 
  {
    Favv='false';

  }
else{
  Favv='true';
  
}

})



userInfo.findOne({_id: CurrentUser})
.then(UserCurrent => {

  if (!UserCurrent) 
  {
   
    CurrentUserLat='no';
    CurrentUserLong='no';
  }
else{
 
  
  CurrentUserLat=UserCurrent.latitude;
  CurrentUserLong=UserCurrent.longitude;
  
}

})




   if (FrindId.length> 10){
   userInfo.findOne({_id: FrindId })
   .then(UserInfor => {

     if (!UserInfor) 
     {
       console.log('not found');


   }
   else{



    comit.find({id:FrindId}).then(userRate => {

      var RatingFrind;
      var doubleNumber;
      var SumRating=0;
      var FinalRating;
      var RatingsNumber = new Array();
      if(!userRate)
      {
        RatingFrind='false';

      }

      else
      {
       
        for(var i=0;i<userRate.length;i++)
        {
      
          doubleNumber = parseFloat(userRate[i].rating);
          RatingsNumber.push(doubleNumber);
        }
       
        for(var i=0;i<RatingsNumber.length;i++)
        {
          SumRating=SumRating+RatingsNumber[i];
        }
       
        FinalRating=(SumRating/RatingsNumber.length);
        RatingFrind=FinalRating.toString();
      
      }
      
      comit.findOneAndUpdate({id:FrindId},{rating:RatingFrind})
            return  res.json({
              _id:UserInfor._id,
              email: UserInfor.email,
              name: UserInfor.name,
              image: UserInfor.image,
              work :UserInfor.work,
              followers : UserInfor.followers.length,
              Ifollow : UserInfor.Ifollow.length,
              rating :RatingFrind,
              description : UserInfor.description,
              Section:UserInfor.Section,
              phoneNumber:UserInfor.phoneNumber,
              city:UserInfor.city,
              Type:UserInfor.Type,
              Salary:UserInfor.Salary,
              latitude:UserInfor.latitude,
              longitude:UserInfor.longitude,
              Availability:UserInfor.Availability,
              UserType:UserInfor.UserType,
              pressAttention:'false',
              fav:Favv,
              CurrentUserLong:CurrentUserLong,
              CurrentUserLat:CurrentUserLat,
              TypePosts:UserInfor.TypePosts,
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



//////////////////////
appl.get('/posCurrentFrind', (req, res) => {
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;


 


userInfo.findOne({_id:CurrentUser})
.then(UserCurrent => {
 if (!UserCurrent) 
  {
    res.json({ NT:'Not found'});
  }

else{ 
 
      
        userInfo.findOne({_id: FrindId})
        .then(UserFrind => {
         if (!UserFrind) 
          {
            res.json({ NT:'Not found'});
          }
        
        else{ 
        
          res.json({
            CurrentUserLat:UserCurrent.latitude,
            CurrentUserLong:UserCurrent.longitude,
            FrindUserLat:UserFrind.latitude,
            FrindUserLong:UserFrind.longitude,
          
         })
         
        
        }
        
        })
      
      
      }

})

 






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




appl.post('/setAvailabil',(req, res) => {
  

  var UserId= req.query.UserId;


  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        
        userInfo.findOneAndUpdate({ _id: UserId }, {Availability:'true'},(err) => {
      if (err) console.log('saveImage ---1 '+err);
      else
      {
        return  res.json({
          NT:'done'
      })

      

      }
    

    })

           }
      


});

  

});




appl.post('/UnsetAvailabil',(req, res) => {
  

  var UserId= req.query.UserId;


  userInfo.findOne({ _id: UserId })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {
        
        userInfo.findOneAndUpdate({ _id: UserId }, {Availability:'false'},(err) => {
      if (err) console.log('saveImage ---1 '+err);
      else
      {

        return  res.json({NT:'done' })

      

      }
    

    })

           }
      


});

  

});






appl.post('/AddToFavorites',(req, res) => {

  
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;
  
     
  userInfo.findOne({ _id: CurrentUser })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {

        
        userInfo.findOneAndUpdate({ _id:CurrentUser },{ $push: { Ifollow: FrindId }},(err) => {
          if (err) console.log('AddToFavorites-- '+err);
          else
          {
    
            userInfo.findOneAndUpdate({ _id:FrindId },{ $push: { followers: CurrentUser }},(err) => {
              if (err) console.log('AddToFavorites-- '+err);
              else
              {
        
                return  res.json({NT:'done' })
        
              
        
              }
            
        
            })
    
          
    
          }
        
    
        })
     

       }

})


})





appl.post('/removeFromFavourites',(req, res) => {

  
  var FrindId= req.query.frindId;
  var CurrentUser= req.query.currentUser;
  
     
  userInfo.findOne({ _id: CurrentUser })
  .then(UserInfor => {

    if (!UserInfor) 
    {
      console.log('not found');
    }
       else
       {

        
        userInfo.findOneAndUpdate({ _id:CurrentUser },{ $pull: { Ifollow: FrindId }},(err) => {
          if (err) console.log('saveImage ---1 '+err);
          else
          {
    
            userInfo.findOneAndUpdate({ _id:FrindId },{ $pull: { followers: CurrentUser }},(err) => {
              if (err) console.log('saveImage ---1 '+err);
              else
              {
        
                return  res.json({NT:'done' })
        
              
        
              }
            
        
            })
    
          
    
          }
        
    
        })
     

       }

})


})


 
appl.get('/getFollow',(req, res) => {

  
  var userId= req.query.UserId;
  var type= req.query.Type;
  
     if(type=='followers'){
      userInfo.findOne({ _id: userId })
      .then(Userinfo => {
    
        if (!Userinfo) 
        {
          console.log('not found');
        }
           else
           {
    
            userInfo.find({_id:Userinfo.followers})
            .then(followerss => {
           
              if (!followerss) 
              {
                console.log('not found users ');
                return  res.json(Users)
            
              }
            else
            {
               return res.json(followerss);
            }
           
           
           });
           
    
           }
    
    })
     }
     else if(type=='Ifollow'){
      userInfo.findOne({ _id: userId })
      .then(Userinfo => {
    
        if (!Userinfo) 
        {
          console.log('not found');
        }
           else
           {
    
            userInfo.find({_id:Userinfo.Ifollow})
            .then(Ifolloww => {
           
              if (!Ifolloww) 
              {
                console.log('not found users ');
                return  res.json(Users)
            
              }
            else
            {
               return res.json(Ifolloww);
            }
           
           
           });
           
    
           }
    
    })
     }


     else{
      return  res.json({NT:'not Found'})

     }




})







appl.post('/setNewPos',(req, res) => {
  

  var UserId= req.query.UserId;
  var lat= req.query.LAT;
  var long= req.query.LONG;

  userInfo.findOneAndUpdate({ _id: UserId }, {latitude:lat,longitude:long},(err) => {
    if (err) console.log('saveImage ---1 '+err);
    else
    {
      return  res.json({
        NT:'done'
    })

    

    }
  

  })
  

});



module.exports = appl;



