const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://ashraf:ashraf@cluster0.egb9h2i.mongodb.net/GraduationProject' ,{useNewUrlParser:true}, (err)=> {

if(err){
    console.log('Error',err);
}
else {

    console.log('conceted to DB successfully...');
}
})