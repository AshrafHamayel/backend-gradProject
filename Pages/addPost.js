const express = require('express');
const db = require('../config/database');
const Post = require('../models/posts');
const userInfo = require('../models/userInfo');

const appl = express.Router();




//////          Time   & Date      ////////////
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let mm =year + "-" + month + "-" + date;
/////////////////////////////////////////////////


appl.post('/newPost', (req, res,err) => {

    var idPost = req.query.UserId;
    var descriptionPost = req.query.description;
    var imagePost = req.query.imagepost;
    //var datePost = req.query.date;


    userInfo.findOne({ _id: idPost })
    .then(ownerPost => {
        if(!ownerPost){
            console.log('not found');
        }


        else{

            let newPost = new Post(
                {
                    name:ownerPost.name,
                    id: idPost,
                    imageuser: ownerPost.image,
                    imagepost:imagePost,
                    date :mm,
                    description :descriptionPost,
                    Section:ownerPost.Section,
                    city:ownerPost.city,
                   
                  
                });

                newPost.save((err) => {
                    if (!err) {
                          
              res.json({
                NT:'done',
                name:newPost.name,
                id:newPost.id,
                imageuser: newPost.imageuser,
                imagepost:newPost.imagepost,
                description :newPost.description,
          
                
                    })
            console.log("done ");
               
                    }

                    else{
                        res.json({
                            NT:'error',
                                })
                        console.log("Error --- :"+err);

                    }
                
                });


        }


    });
 
        


});



appl.get('/myPosts', (req, res) => {
    var UserId= req.query.UserId;
    
 
 
     if (UserId.length> 10){

        
    Post.find({id: UserId })
     .then(userPosts => {
 
       if (!userPosts) 
       {
         console.log('not found Posts');
 
       }
     else
     {
        
        return res.json(userPosts);

     }
 
 
 });
 }
 
 else{
   console.log('Id is Null ---------');
 
 }
 
    
 
 });


 var UsersPosts = new Array();

 var AllJops = new Array('Building','WaterAndElectricity','Tiles','PaintAndPlaster','Brick','GardenCoordinator','Reformer','Trolleys','VarietyWorker');

 appl.get('/allPosts', (req, res) => {
    var UserId= req.query.UserId;
    
     userInfo.findOne({ _id: UserId })
    .then(Cuser => {
        
    Post.find({$or:[{Section:Cuser.Section},{description:{$regex:Cuser.description}},{city:Cuser.city},{Section:Cuser.Section},{description:{$regex:Cuser.work}}] })
    .then(userPosts => {
 
       if (!userPosts) 
       {
         console.log('not found Posts');
         return  res.json(Users)
       }
     else
     {

        return  res.json(userPosts)
        
        
     }
 
 
 });

 });

 
 console.log('not found user');
 
 });


 
appl.post('/GeneralPosts',(req, res) => {

  

  var CurrentUser= req.query.currentUser;
  

  userInfo.findOneAndUpdate({ _id:CurrentUser },{TypePosts:'general'},(err) => {
    if (err) console.log('GeneralPosts-- '+err);
    else
    {

      return  res.json({NT:'done' })

    

    }
  

  })

})



 
appl.post('/FollowersPosts',(req, res) => {

  

  var CurrentUser= req.query.currentUser;
  

  userInfo.findOneAndUpdate({ _id:CurrentUser },{TypePosts:'Followers'},(err) => {
    if (err) console.log('FollowersPosts-- '+err);
    else
    {

      return  res.json({NT:'done' })

    

    }
  

  })

})





appl.get('/getPostsFollowers', (req, res) => {
  var UserId= req.query.UserId;
  
   userInfo.findOne({ _id: UserId })
  .then(Cuser => {
      
  Post.find({id:Cuser.Ifollow})
  .then(userPosts => {

     if (!userPosts) 
     {
       console.log('not found Posts');
       return  res.json({NT:'not found' })
     }
   else
   {

      return  res.json(userPosts)
      
      
   }


});

});


console.log('not found user');

});



appl.post('/AddLike',(req, res) => {

  
  var post1= req.query.PostId;
  var CurrentUser= req.query.currentUser;
 
  Post.findOne({ _id:post1,Like: CurrentUser})
.then(UserPost => {

  if (!UserPost) 
  {
     Post.findOneAndUpdate({ _id:post1 },{ $push: { Like: CurrentUser }},(err) => {
          if (err) {
            console.log('Add like-- '+err);
            return  res.json({NT:'not done' })
          }
          else
          {
    
            return  res.json({NT:'done' })
    
          }
        
    
        })
    

  }
     else
     {

      
      Post.findOneAndUpdate({ _id:post1 },{ $pull: { Like: CurrentUser }},(err) => {
        if (err) {
          console.log('Add like-- '+err);
          return  res.json({NT:'not done' })
        }
        else
        {
  
          return  res.json({NT:'done' })
  
        }
      
  
      })
   

     }

})

  



     

       



})



 

module.exports = appl;



















