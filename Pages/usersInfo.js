
const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');

const appl = express.Router();
let sectionSameUsers='Building';

let sectionSecandUsers='WaterAndElectricity';
let sectionThirdUsers='PaintAndPlaster';
let sectionFourthUsers='Tiles';

var Users = new Array();
Users=[];
//----------------------------Get name sec user--------------------------------------

appl.get('/userSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
  var sectionBuilding='Building';

 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
  sectionSameUsers=userCurren.Section;
   if(!userCurren){
        return  res.json({
            NT:'not found'
        })
   }

   
   else if (userCurren.UserType=='true')
   {
    return  res.json({NT:' عمال البناء في  '+ userCurren.city.toString() })

   }

        else {
           if (userCurren.Section==sectionBuilding){
            return  res.json({NT:' عمال البناء في  '+ userCurren.city.toString() })
        
           }
        
        
           else if (userCurren.Section=='WaterAndElectricity'){
            return  res.json({NT:' عمال التمديدات الكهربائية و الصحية في  '+ userCurren.city.toString() })
        
           }
        
           else if (userCurren.Section=='PaintAndPlaster'){
            return  res.json({NT:'عمال الدهان و الجبصين في  '+ userCurren.city.toString() })
        
           }
           else if (userCurren.Section=='Tiles'){
            return  res.json({NT:' عمال البلاط في  '+ userCurren.city.toString() })
        
           }
        
           
           else if (userCurren.Section=='GardenCoordinator'){
            return  res.json({NT:' منسقين الحدائق في  ' +userCurren.city.toString()})
        
           }
        
           else if (userCurren.Section=='Brick'){
            return  res.json({NT:' عمال القرميد و الديكور في  ' +userCurren.city.toString() })
        
           }
           else if (userCurren.Section=='Reformer'){
            return  res.json({NT:' عمال الصيانة في  '+ userCurren.city.toString() })
        
           }
        
           else if (userCurren.Section=='Trolleys'){
            return  res.json({NT:' قسم المركبات في  ' + userCurren.city.toString() })
        
           }
        
           else 
           {
            return  res.json({NT:' عمال ذو اعمال مختلفة في  ' + userCurren.city.toString()})
        
           }
        
        
        
          
        }
  

  
});


});


//----------------------------Get Name Secand sec --------------------------------------

appl.get('/getNameSecandSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
 
 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
   if(!userCurren){
    console.log('not found Get Name Secand sec');
        return  res.json({
            NT:'not found'
        })
   }


   else if (userCurren.UserType=='true')
   {
    return  res.json({NT:' التمديدات  الكهربائية و الصحية في ' + userCurren.city.toString() })

   }



   else {
    return  res.json({NT:' اعمال و اقسام متنوعة في  '+ userCurren.city.toString() })
   }

  
});


});

//----------------------------Get Name Third sec --------------------------------------

appl.get('/getNameThirdSec', (req, res)  => {
  var CurrentUser= req.query.currentUser;
  var sectionBuilding='Building';

 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
  sectionSameUsers=userCurren.Section;
   if(!userCurren){
    console.log('not found Get Name Third sec');
        return  res.json({
            NT:'not found'
        })
   }


   else if (userCurren.UserType=='true')
   {
    return  res.json({NT:'  عمال الدهان و الديكور في  '+ userCurren.city.toString() })

   }

   else{

    if (userCurren.Section==sectionBuilding){
      return  res.json({NT:'عمال البناء '})
  
     }
  
  
     else if (userCurren.Section=='WaterAndElectricity'){
      return  res.json({NT:'عمال التمديدات الكهربائية و الصحية '})
  
     }
  
     else if (userCurren.Section=='PaintAndPlaster'){
      return  res.json({NT:'عمال الدهان و الجبصين   '})
  
     }
     else if (userCurren.Section=='Tiles'){
      return  res.json({NT:'عمال البلاط'})
  
     }
  
     
     else if (userCurren.Section=='GardenCoordinator'){
      return  res.json({NT:'منسقين الحدائق'})
  
     }
  
     else if (userCurren.Section=='Brick'){
      return  res.json({NT:'عمال القرميد و الديكور' })
  
     }
     else if (userCurren.Section=='Reformer'){
      return  res.json({NT:'عمال الصيانة'})
  
     }
  
     else if (userCurren.Section=='Trolleys'){
      return  res.json({NT:'قسم المركبات'})
  
     }
  
     else 
     {
      return  res.json({NT:'عمال ذو اعمال مختلفة'})
  
     }
  
  
  
   }



  
});
});



//----------------------------Get users same sec--------------------------------------
appl.get('/usersSameSec', (req, res) => {

  var CurrentUser= req.query.currentUser;

  userInfo.findOne({_id:CurrentUser })
  .then(userCurren => {
    if(!userCurren){
      console.log('not found Get users same sec');
      return  res.json(Users)
     }


     else if (userCurren.UserType=='true')
     {
      userInfo.find({$and:[{Section:'Building'},{city:userCurren.city}] })
      .then(SectionSameUsers => {
        if (!SectionSameUsers) 
        {
          return  res.json(Users)
      
        }
      else
      {
         return res.json(SectionSameUsers);
      }
     
     
     });
  
     }


     else{
      userInfo.find({$and:[{Section:userCurren.Section},{city:userCurren.city}] })
 .then(SectionSameUsers => {
   if (!SectionSameUsers) 
   {
     return  res.json(Users)
 
   }
 else
 {
    return res.json(SectionSameUsers);
 }


});

     }
  });


 


});




//----------------------------get Users Second Sec--------------------------------------

appl.get('/getUsersSecondSec', (req, res) => {
  var CurrentUser= req.query.currentUser;

 
  userInfo.findOne({_id:CurrentUser })
  .then(userCurren => {
    if(!userCurren){
      console.log('not found  get Users Second Sec');
      return  res.json(Users)
     }


     else if (userCurren.UserType=='true')
     {
      userInfo.find({$and:[{Section:'WaterAndElectricity'},{city:userCurren.city}] })
      .then(SectionSameUsers => {
        if (!SectionSameUsers) 
        {
          return  res.json(Users)
      
        }
      else
      {
         return res.json(SectionSameUsers);
      }
     
     
     });
  
     }


     else{
      
      userInfo.find({city:userCurren.city,Section:{ $not: { $regex:userCurren.Section} }})
 .then(SectionSameUsers => {

   if (!SectionSameUsers) 
   {
     return  res.json(Users)
 
   }
 else
 {
    return res.json(SectionSameUsers);
 }


});

     }
  });


 

});

//----------------------------get Users Third Sec--------------------------------------

appl.get('/getUsersThirdSec', (req, res) => {

  var CurrentUser= req.query.currentUser;

 
  userInfo.findOne({_id:CurrentUser })
  .then(userCurren => {
    if(!userCurren){
      console.log('not found get Users Third Sec');
      return  res.json(Users)
     }


     else if (userCurren.UserType=='true')
     {
      userInfo.find({$and:[{Section:'PaintAndPlaster'},{city:userCurren.city}] })
      .then(SectionSameUsers => {
        if (!SectionSameUsers) 
        {
          return  res.json(Users)
      
        }
      else
      {
         return res.json(SectionSameUsers);
      }
     
     
     });
  
     }
     else{
      userInfo.find({Section:userCurren.Section,city:{ $not: { $regex:userCurren.city} }})
 .then(SectionSameUsers => {

   if (!SectionSameUsers) 
   {
     console.log('not found users get Users Third Sec');
     return  res.json(Users)
 
   }
 else
 {
    return res.json(SectionSameUsers);
 }


});

     }
  });


 

});



//----------------------------get Users Fourth Sec--------------------------------------

appl.get('/getUsersFourthSec', (req, res) => {

  var CurrentUser= req.query.currentUser;

 
  userInfo.findOne({_id:CurrentUser })
  .then(userCurren => {
    if(!userCurren){
      console.log('not found get Users Fourth Sec-');
      return  res.json(Users)
     }
     else{
      userInfo.find({$or:[{latitude:userCurren.latitude},{longitude:userCurren.longitude},{Salary:userCurren.Salary},{description:userCurren.description},{name:userCurren.name}],city:{ $not: { $regex:userCurren.city} },Section:{ $not: { $regex:userCurren.Section} }})
 .then(SectionSameUsers => {

   if (!SectionSameUsers) 
   {
     console.log('not found users get Users Fourth Sec-');
     return  res.json(Users)
   }
 else
 {
    return res.json(SectionSameUsers);
 }


});

     }
  });


 

});

module.exports = appl;



