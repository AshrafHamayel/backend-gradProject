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
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
console.log(hours + ":" + minutes);
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
                    numberLike : 0,
                    numberDisLike :0,
                  
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
                numberLike :newPost.numberLike,
                numberDisLike :newPost.numberLike,
                
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



 

module.exports = appl;























// for(var i=0;i<UsersPosts.length;i++){
//     UsersPosts.pop();
//     UsersPosts.pop();
// }
    
// var Index=-1;
//     for(var i=0;i<AllJops.length;i++)
//     {
//         if(AllJops[i]==Cuser.Section)
//         Index=i;
//     }


//     console.log(' Index ='+Index);
//     console.log(' AllJops[Index] ='+AllJops[Index]);
//     if(Index==-1){

        
  
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section=='Worker')
//         UsersPosts.push(userPosts[i]);
//     }


//     Index=0; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }
    
//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }
//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }
//     Index=Index+1; 
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }


// return res.json(UsersPosts);



//     }

//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

  
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section=='Worker')
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }
    
//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }
//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }

//     if(Index==8){ Index=0; }
//     else { Index=Index+1;}
//     for(var i=0;i<userPosts.length;i++)
//     {
//         if(userPosts[i].Section==AllJops[Index])
//         UsersPosts.push(userPosts[i]);
//     }


      



// return res.json(UsersPosts);
