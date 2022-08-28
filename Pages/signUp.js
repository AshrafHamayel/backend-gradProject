
const express = require('express');
const db = require('../config/database');
const userInfo = require('../models/userInfo');
const userLiksAndFollow = require('../models/userLiksAndFollow');

const appl = express.Router();

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


function isEmailValid(email) {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}

 

appl.post('/signUp', (req, res,err) => {

    var email = req.query.email;
    var name = req.query.name;
    var pass = req.query.password;
    var confPassword = req.query.confPassword;
    var token = req.query.fbm;
    var usertype = req.query.userType;
    
    console.log(email);
    if (isEmailValid(email)) {

      
       

            let newUser = new userInfo(
                {
                   
                    email: email,
                    name: name,
                    password: pass,
                    image: 'NoImage.jpg',
                    work :'---',
                    rating :'0',
                    description : '---',
                    Section:'VarietyWorker',
                    phoneNumber:'غير منوفر',
                    city:'غير منوفر',
                    Salary:'100',
                    Type:'email',
                    latitude:'false',
                    longitude:'false', 
                     Availability:'true',
                     UserType:usertype,
                    Token:token,


                });

                

                if(pass== confPassword){
        newUser.save((err) => {
            if (!err) {



                let newUserLiksAndFollow = new userLiksAndFollow(
                    {
                        id:newUser._id,
                       
                    });
                     newUserLiksAndFollow.save(() => { })

             
              res.json({
                  NT:'done',
                  uid:newUser._id,
                  imegUrl:newUser.image,
                  token:newUser.Token,
                      })
              console.log("done ");
                        
                      
            }

            else {
            
                console.log('Email exists !');
                console.log(err);
                res.json({
                    NT:'Email exists !'
                })
                console.log('Email exists !');

            }

        })


    }
    else{

        console.log("password does not match"); 
        console.log('this error'+err)
        res.json({
            NT:'password does not match'
        })
    }

    }

    else {

        res.json({
            NT:'Invalid Email !'
        })
        console.log('Invalid Email !');

    }


});



appl.post('/addUserFromGoogleOrFacebook', (req, res,err) => {

    var email = req.query.email;
    var name = req.query.name;
    var Uimage = req.query.image;
    var token = req.query.fbm;
    var usertype = req.query.userType;
    if (isEmailValid(email)) {
            let newUser = new userInfo(
                {
                   
                    email: email,
                    name: name,
                    password:'password',
                    image: Uimage,
                    work :'---',
                    rating :'0',
                    description :'---',
                    Section:'VarietyWorker',
                    phoneNumber:'غير منوفر',
                    city:'غير منوفر',
                    Type:'Google',
                    Salary:'100',
                    latitude:'false',
                    longitude:'false',
                    Availability:'true',
                    UserType:usertype,
                    Token:token,
                   
                });

               
        newUser.save((err) => {
            if (!err) {

             
                let newUserLiksAndFollow = new userLiksAndFollow(
                    {
                        id:newUser._id,
                       
                    });
                     newUserLiksAndFollow.save(() => { })

                res.json({
                    NT:'done',
                    uid:newUser._id,
                    token:newUser.Token,
                        })
              console.log("done ");
                        
                      
            }

            else {
            
                console.log('Email exists !');
                res.json({
                    NT:'Email exists !',
                    uid:newUser._id,
                    token:newUser.Token,
                })

            }

        })
    }

});





appl.post('/addInfoUser', (req, res,err) => {

    var Uid = req.query.UserId;
    var _work = req.query.Work;
    var _description = req.query.Description;
    var _phoneNumber = req.query.PhoneNumber;
    var _salary = req.query.Salary;
    var _city = req.query.City;
    var lat= req.query.LAT;
    var long= req.query.LONG;



    var section;
    if(_work.includes('بناء')||_work.includes('طوبرجي')||_work.includes('طوبار')||_work.includes('بنّاء')||_work.includes('بنّا')||_work.includes('معلم طوبار')||_work.includes('بنا حجر')||_work.includes('بناء حجر')||_work.includes('بنّاء حجر')||_work.includes('بلوك')||_work.includes('بنأ')||_work.includes('بنأء')||_work.includes('بنا')||_work.includes('قصير')||_work.includes('قصار')||_work.includes('قصارة')||_work.includes('بقصر')||_work.includes('ائصير')||_work.includes('أصار')||_work.includes('معلم قصارة'))
    section='Building';

   else if(_work.includes('موسرجي')||_work.includes('كهربجي')||_work.includes('كهربائي')||_work.includes('تمديدات صحية')||_work.includes('تمديدات كهربائية')||_work.includes('فني كهرباء')||_work.includes('مواسير')||_work.includes('معلم كهربا')||_work.includes('معلم مياه')||_work.includes('تأسيس كهر')||_work.includes('تأسيس م')||_work.includes('تاسيس كهر')||_work.includes('تسيس م'))
   section='WaterAndElectricity';
    

    else if(_work.includes('دهان')||_work.includes('ديكور دهان')||_work.includes('جبصين')||_work.includes('دهين')||_work.includes('دهّين')||_work.includes('معلم دها')||_work.includes('دهان و جبصين')||_work.includes('الدهان'))
    section='PaintAndPlaster';

    else if(_work.includes('بليط')||_work.includes('بلاط')||_work.includes('ببلط')||_work.includes('معلم بلاط')||_work.includes('بليّط')||_work.includes('رخام')||_work.includes('تبيلط')||_work.includes('ارضيات')||_work.includes('روب')||_work.includes('ترويب'))
    section='Tiles';
    
    else if(_work.includes('عامل')||_work.includes('متنوع')||_work.includes('بشتغل عامل')||_work.includes('عمال')||_work.includes('شبتسيم')||_work.includes('شوبتسيم')||_work.includes('اعمال متنوعة')||_work.includes('اي شي'))
    section='Worker';

    else if(_work.includes('حدائق')||_work.includes('منسق حد')||_work.includes('تنظيف جناين')||_work.includes('جنانة')||_work.includes('جناين')||_work.includes('جنائن')||_work.includes('فني حدائق')||_work.includes('زراع')||_work.includes('زريعة')||_work.includes('مزارع')||_work.includes('فلاح'))
    section='GardenCoordinator';

    else if(_work.includes('قرميد')||_work.includes('سقف روف')||_work.includes('قرميد و ديكو')||_work.includes('خلايا')||_work.includes('شمسية')||_work.includes('تركيب خلايا'))
    section='Brick';

    else if(_work.includes('مصلح')||_work.includes('تصليح')||_work.includes('صيانة')||_work.includes('تزبيط'))
    section='Reformer';

    else if(_work.includes('تجليس سيارات')||_work.includes('ميكانيكي سيار')||_work.includes('تغيير زي')||_work.includes('مغسلة سيار')||_work.includes('تنظيف سيا')||_work.includes('منظف سيا')||_work.includes('مغسلة'))
    section='Trolleys';

    else 
    section='VarietyWorker';



    
   

  

    console.log(Uid);
  

    userInfo.findOneAndUpdate({ _id: Uid }, { work: _work ,description:_description , phoneNumber:_phoneNumber ,Salary:_salary ,city:_city ,Section:section,latitude:lat,longitude:long },(err) => {
        if (err) {
            
            console.log(err);
            console.log('Email Not exists !');
            return  res.json({
                NT:'Email Not exists !'
            });


        }
        else
        {
            return  res.json({
                NT:'done'
            });

        }
       
  
      })

});






appl.post('/addNotWorkerInfo', (req, res,err) => {

    var Uid = req.query.UserId;
    var _description = req.query.Description;
    var _city = req.query.City;
    var lat= req.query.LAT;
    var long= req.query.LONG;

  

    userInfo.findOneAndUpdate({ _id: Uid }, { description:_description ,city:_city,latitude:lat,longitude:long },(err) => {
        if (err) {
            
            console.log(err);
            console.log('Email Not exists !');
            return  res.json({
                NT:'Email Not exists !'
            });


        }
        else
        {
            return  res.json({
                NT:'done'
            });

        }
       
  
      })

});







module.exports = appl;