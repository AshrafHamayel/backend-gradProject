
const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');
const userLiksAndFollow = require('../models/userLiksAndFollow');

const appl = express.Router();
let sectionSameUsers='Building';

let sectionSecandUsers='WaterAndElectricity';
let sectionThirdUsers='PaintAndPlaster';
let sectionFourthUsers='Tiles';

var UsersSameSec0 = new Array();

//----------------------------Get name sec user--------------------------------------

appl.get('/userSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
  var sectionBuilding='Building';

 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
  sectionSameUsers=userCurren.Section;
   if(!userCurren){
    console.log('not found');
        return  res.json({
            NT:'not found'
        })
   }

   else if (userCurren.Section==sectionBuilding){
    // console.log('قسم البناء');
    return  res.json({NT:'قسم البناء' })

   }


   else if (userCurren.Section=='WaterAndElectricity'){
    // console.log('قسم التمديات الكهربائية و الصحية');
    return  res.json({NT:'قسم التمديات الكهربائية والصحية' })

   }

   else if (userCurren.Section=='PaintAndPlaster'){
    // console.log('قسم الدهان و ديكورات الجبصين');
    return  res.json({NT:'قسم الدهان و ديكورات الجبصين'})

   }
   else if (userCurren.Section=='Tiles'){
    // console.log('قسم البلاط');
    return  res.json({NT:'قسم البلاط' })

   }

   else if (userCurren.Section=='Worker'){
    // console.log('قسم العمال المساعدين للحرفيين ');
    return  res.json({NT:'قسم العمال المساعدين للحرفيين ' })

   }


   else if (userCurren.Section=='GardenCoordinator'){
    // console.log('قسم منسقين الحدائق و الجنائن');
    return  res.json({NT:'قسم منسقين الحدائق و الجنائن' })

   }

   else if (userCurren.Section=='Brick'){
    // console.log('قسم القرميد و الديكور');
    return  res.json({NT:'قسم القرميد و الديكور' })

   }
   else if (userCurren.Section=='Reformer'){
    // console.log('قسم الصيانة و التصليح ');
    return  res.json({NT:'قسم الصيانة و التصليح' })

   }

   else if (userCurren.Section=='Trolleys'){
    // console.log('قسم تصليح و غسيل المركبات');
    return  res.json({NT:'قسم تصليح وغسيل المركبات' })

   }

   else{
    // console.log('قسم اعمال متنوعة');
    return  res.json({NT:'قسم اعمال متنوعة' })

   }


  
});


});



//----------------------------Get Name Secand sec --------------------------------------

appl.get('/getNameSecandSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
 
 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
   if(!userCurren){
    console.log('not found');
        return  res.json({
            NT:'not found'
        })
   }

   else if (userCurren.Section=='Building'){
    sectionSecandUsers='PaintAndPlaster';
    // console.log('قسم الدهان و ديكورات الجبصين');
    return  res.json({NT:'قسم الدهان و ديكورات الجبصين' })
   }


   else{
    sectionSecandUsers='Building';
    // console.log('قسم البناء');
    return  res.json({NT:'قسم البناء' })

   }


  
});


});

//----------------------------Get Name Third sec --------------------------------------

appl.get('/getNameThirdSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
 
 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
   if(!userCurren){
    console.log('not found');
        return  res.json({
            NT:'not found'
        })
   }

   else if (userCurren.Section=='WaterAndElectricity'){
    sectionThirdUsers='Tiles';
    // console.log('قسم البلاط');
    return  res.json({NT:'قسم البلاط' })
   }


   else{

    sectionThirdUsers='WaterAndElectricity';
    // console.log('قسم التمديات الكهربائية و الصحية');
    return  res.json({NT:'قسم التمديات الكهربائية والصحية' })
   }


  
});


});


//----------------------------Get Name Fourth sec --------------------------------------

appl.get('/getNameFourthSec', (req, res)  => {

  var CurrentUser= req.query.currentUser;
 
 userInfo.findOne({_id:CurrentUser })
 .then(userCurren => {
   if(!userCurren){
    console.log('not found');
        return  res.json({
            NT:'not found'
        })
   }

   else if (userCurren.Section=='PaintAndPlaster'||(userCurren.Section!='Worker'&&userCurren.Section==sectionSameUsers)||userCurren.Section=='Trolleys'){
    sectionFourthUsers='Worker';
    // console.log('قسم العمال');
    return  res.json({NT:'قسم العمال المساعدين للحرفيين' })
   }


   else{
    sectionFourthUsers='Trolleys';
    // console.log('قسم تصليح و غسيل المركبات');
    return  res.json({NT:'قسم تصليح وغسيل المركبات' })
   }


  
});


});


//----------------------------Get users same sec--------------------------------------
appl.get('/usersSameSec', (req, res) => {

  var CurrentUser= req.query.currentUser;

 
  userInfo.findOne({_id:CurrentUser })
  .then(userCurren => {
    // console.log(' userCurren :'+userCurren);
    if(!userCurren){
      console.log('not found');
          return  res.json({
              NT:'not found'
          })
     }
     else{
      sectionSameUsers=userCurren.Section
      userInfo.find({Section:sectionSameUsers })
 .then(SectionSameUsers => {

   if (!SectionSameUsers) 
   {
     console.log('not found users Building');
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
  
  for(var i=0;i<UsersSameSec0.length;i++){
     UsersSameSec0.pop();
  }
  UsersSameSec0.pop();
  // console.log('SectionSameUsers Befor==='+SectionSameUsers);
    var T;
    for(var i=0;i<SectionSameUsers.length;i++){

      if(SectionSameUsers[i]._id!=CurrentUser)
      UsersSameSec0.push(SectionSameUsers[i]);

    }
    
    // console.log('UsersSameSec0 After==='+UsersSameSec0);

    return res.json(UsersSameSec0);

 }


});

     }
  });


 


});




//----------------------------get Users Second Sec--------------------------------------

appl.get('/getUsersSecondSec', (req, res) => {

  

    //  var UsersSecondSec='Building';
    //  if(sectionSameUsers==UsersSecondSec)
    //  UsersSecondSec='WaterAndElectricity';

    userInfo.find({Section:sectionSecandUsers })
    .then(usersBuilding => {

      if (!usersBuilding) 
      {
        console.log('not found users Building');
        return  res.json({
            NT:'not found'
        })
    
      }
    else
    {
      
       return res.json(usersBuilding);

    }


});


});

//----------------------------get Users Third Sec--------------------------------------

appl.get('/getUsersThirdSec', (req, res) => {

  

  // var UsersSecondSec='WaterAndElectricity';
  // if(sectionSameUsers==UsersSecondSec)
  // UsersSecondSec='PaintAndPlaster';

 userInfo.find({Section:sectionThirdUsers })
 .then(usersBuilding => {

   if (!usersBuilding) 
   {
     console.log('not found users Building');
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
   
    return res.json(usersBuilding);

 }


});


});



//----------------------------get Users Fourth Sec--------------------------------------

appl.get('/getUsersFourthSec', (req, res) => {

  

  // var UsersSecondSec='PaintAndPlaster';
  // if(sectionSameUsers==UsersSecondSec)
  // UsersSecondSec='Trolleys';

 userInfo.find({Section:sectionFourthUsers })
 .then(usersBuilding => {

   if (!usersBuilding) 
   {
     console.log('not found users Building');
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
   
    return res.json(usersBuilding);

 }


});


});




//----------------------------get Users Fifth Sec--------------------------------------
var UsersFifthh = new Array();

appl.get('/getUsersFifthhSec', (req, res) => {

 
 userInfo.find()
 .then(usersBuilding => {

   if (!usersBuilding) 
   {
     console.log('not found users Building');
     return  res.json({
         NT:'not found'
     })
 
   }
 else
 {
   
  for(var i=0;i<UsersFifthh.length;i++)
  {
    UsersFifthh.pop();
    UsersFifthh.pop();

    
 }

   for(var i=0;i<usersBuilding.length;i++)
   {
   
     if(usersBuilding[i].Section!=sectionSameUsers &&usersBuilding[i].Section!= sectionSecandUsers&&usersBuilding[i].Section!= sectionThirdUsers&&usersBuilding[i].Section!= sectionFourthUsers)
     UsersFifthh.push(usersBuilding[i]);

   }
   
   //console.log(UsersFifthh);
    return res.json(UsersFifthh);

 }


});


});






module.exports = appl;



