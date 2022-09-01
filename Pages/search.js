const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');

const appl = express.Router();

var AllJops = new Array('Building','WaterAndElectricity','PaintAndPlaster','Tiles','Worker','GardenCoordinator','Brick','Reformer','Trolleys','VarietyWorker');
 
var Checked = new Array();
var Distan = new Array();  
var NewlJops = new Array();
var ResultSearch = new Array();
 
appl.get('/getResultSearch', (req, res) => {
  var CurrentUser= req.query.currentUser;
  var NameWorker= req.query.nameWorker;
  var Work= req.query.work;
  var City= req.query.city;
  var Closest= req.query.closest;
  var jops;



  jops=Work.split(".");
  var JOP=jops[1].toString();

    userInfo.findOne({_id:CurrentUser})
    .then(userCurren => {
     if(!userCurren)
     {
       res.json({ NT:'Not User', })
 
     }
     else
     {

      if(City=='cities.mycity')
      {
      if(NameWorker.length>1)

       {
      if(JOP=='MyWork')
      {
     // search on MYcity and Name and MYwork 

     userInfo.find({$and:[{work:userCurren.work},{city:{$regex:userCurren.city}},{name:{$regex:NameWorker}}]})
     .then(usersSameWork => {
    
       if (!usersSameWork) 
       {
         return  res.json({
             NT:'not found'
         })
     
       }
     else
     {
       
        return res.json(usersSameWork);
    
     }
    
    
    });

      } /// end  search on MYcity and Name and MYwork 

//     -------------else 3

      else
      {
      // search on MYcity and Name and any Work  

 userInfo.find({$and:[{Section:JOP},{city:{$regex:userCurren.city}},{name:{$regex:NameWorker}}]})
 .then(usersAnyWork => {

   if (!usersAnyWork) 
   {
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
   
    return res.json(usersAnyWork);

 }


});



      }// End  search on MYcity and Name and any Work 


    }
//     -------------else 2
    else  //   search on MYcity  and  Work
    {

      if(JOP=='MyWork')
      {
     // search on MYcity and Name and MYwork 

     userInfo.find({$and:[{work:userCurren.work},{city:{$regex:userCurren.city}}]})
     .then(usersSameWork => {
    
       if (!usersSameWork) 
       {
         return  res.json({
             NT:'not found'
         })
     
       }
     else
     {
       
        return res.json(usersSameWork);
    
     }
    
    
    });

      } /// end  search on MYcity and Name and MYwork 

//     -------------else 3

      else
      {
      // search on MYcity  and any Work  

 userInfo.find({$and:[{Section:JOP},{city:{$regex:userCurren.city}}]})
 .then(usersAnyWork => {

   if (!usersAnyWork) 
   {
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
   
    return res.json(usersAnyWork);

 }


});



      }




    }
       


   


  } // end if(City=='cities.mycity')







  else
  {  //else any City

    if(NameWorker.length>1)

    {
   if(JOP=='MyWork')
   {
  // search on   Name and MYwork 

  userInfo.find({$and:[{work:userCurren.work},{name:{$regex:NameWorker}}]})
  .then(usersSameWork => {
 
    if (!usersSameWork) 
    {
      return  res.json({
          NT:'not found'
      })
  
    }
  else
  {
    
     return res.json(usersSameWork);
 
  }
 
 
 });

   } /// end  search on MYcity and Name and MYwork 

//     -------------else 3

   else
   {
   // search on   Name and any Work  

userInfo.find({$and:[{Section:JOP},{name:{$regex:NameWorker}}]})
.then(usersAnyWork => {

if (!usersAnyWork) 
{
  return  res.json({
      NT:'not found'
  })

}
else
{

 return res.json(usersAnyWork);

}


});



   }// End  search on MYcity and Name and any Work 


 }
//     -------------else 2
 else  //   search on    Work
 {

   if(JOP=='MyWork')
   {
  // search on  MYwork 

  userInfo.find({work:userCurren.work})
  .then(usersSameWork => {
 
    if (!usersSameWork) 
    {
      return  res.json({
          NT:'not found'
      })
  
    }
  else
  {
    
     return res.json(usersSameWork);
 
  }
 
 
 });

   } /// end  search on   MYwork 


   

   else
   {
   // search on  any Work  

userInfo.find({Section:JOP})
.then(usersAnyWork => {

if (!usersAnyWork) 
{
  return  res.json({
      NT:'not found'
  })

}
else
{

 return res.json(usersAnyWork);

}


});

   }


 }
    

  } //end else any City

   }// end else user exsit


  })



})

module.exports = appl;
