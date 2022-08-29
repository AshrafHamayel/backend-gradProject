const express = require('express');
const db = require('../config/database');
const tenders = require('../models/tenders');
const userInfo = require('../models/userInfo');
const appl = express.Router();




//////          Time   & Date      ////////////
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let mm =year + "-" + month + "-" + date;
/////////////////////////////////////////////////

var secAr=[	'اختر مجال العمل',' البناء بشكل عام ', 'التميديات الكهربائية و الصحية','الدهان و ديكورات الجبصين', ' البلاط',
   ' منسق حدائق و جنائن',
   'القرميد و ديكوراته',
   ' صيانة و تصليح',
   ' ما يخص المركبات',];
var Works=['anyOne','Building','WaterAndElectricity','PaintAndPlaster','Tiles','GardenCoordinator','Brick','Reformer','Trolleys'];

appl.post('/newtenders', (req, res,err) => {

    var idTenders = req.query.UserId;
    var descriptionTenders = req.query.description;
    var imageTenders1 = req.query.imageComplaint;
    var SectionTenders=req.query.sectionTenders;
    var CityT=req.query.CityTenders;

var secENg;
    for(var i=0;i<9;i++){

        if(SectionTenders==secAr[i])
        secENg=Works[i];

    }
    var IMg='Ten.jpg';
if(imageTenders1!='null'){
    IMg=imageTenders1;

}
    userInfo.findOne({ _id: idTenders })
    .then(ownerTenders => {
        if(!ownerTenders){
            console.log('not found');
        }
        else{

            let newTenders = new tenders(
                {
                    name:ownerTenders.name,
                    id:idTenders,
                    imageuser: ownerTenders.image,
                    imageTenders:IMg,
                    date :mm,
                    Section:SectionTenders,
                    SectionEng:secENg,
                    CityTenders:CityT,
                    description :descriptionTenders,
                 
                  
                });

                newTenders.save((err) => {
                    if (!err) {
                          
              res.json({
                NT:'done',})
         
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




appl.get('/myTenders', (req, res) => {
    var UserId= req.query.UserId;
    
 
     if (UserId.length> 10){

        
     tenders.find({id: UserId })
     .then(userTenders => {
 
       if (!userTenders) 
       {
         console.log('not found Tenders');
 
       }
     else
     {
        
        return res.json(userTenders);

     }
 
 
 });
 }
 
 else{
   console.log('Id is Null ---------');
 
 }
 
    
 
 });






 
appl.get('/getApplicants', (req, res) => {
    var tendersId= req.query.TendersId;
    
 
     if (tendersId.length> 10){

        
     tenders.findOne({_id: tendersId })
     .then(userTenders => {
 
       if (!userTenders) 
       {
         console.log('not found Tenders');
 
       }
     else
     {
        
           
  userInfo.find({ _id:userTenders.applicants })
  .then(UsersInfor => {

    if (!UsersInfor) 
    {
      console.log('not found');
    }
       else
       {

        
        return res.json(UsersInfor);
     

       }

})


     }
 
 
 });
 }
 
 else{
   console.log('Id is Null ---------');
 
 }
 
    
 
 });





 
appl.get('/getTendersForWorker', (req, res) => {
    var userId= req.query.UserId;
    
 
    userInfo.findOne({ _id: userId })
    .then(UserInfor => {
  
      if (!UserInfor) 
      {
        console.log('not found');
      }
         else
         {
  
          
            tenders.find({$and:[{SectionEng:UserInfor.Section},{CityTenders:UserInfor.city}]})
            .then(Tenders => {
        
              if (!Tenders) 
              {
                console.log('not found Tenders');
        
              }
            else
            {
                tenders.find({applicants:userId})
                .then(Tendersss => {
            
                  if (!Tendersss) 
                  {
                    console.log('not found Tenders');
            
                  }
                else
                {
    
                    
                    return res.json(Tenders);
    
                }
                  })

               

            }
              })
  
         }
  
  })
 
    
 
 });



 
appl.post('/AddToApplicants',(req, res) => {

  
    var tendersId= req.query.TendersId;
    var CurrentUser= req.query.currentUser;
    
       
    tenders.findOne({ _id: tendersId })
    .then(tendersInfo => {
  
      if (!tendersInfo) 
      {
        console.log('not found');
      }
         else
         {
  
          
            tenders.findOneAndUpdate({ _id:tendersId },{ $push: { applicants: CurrentUser }},(err) => {
            if (err) console.log('Not save '+err);
            else
            {
      
              return  res.json({NT:'done' })
      
            }
          
      
          })
       
  
         }
  
  })
  
  
  })
  
  




module.exports = appl;