const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/GraduationProject' ,{useNewUrlParser:true}, (err)=> {

if(err){
    console.log('Error',err);
}
else {

    console.log('conceted to DB successfully...');
}
})