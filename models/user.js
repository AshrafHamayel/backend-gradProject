const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({

    name :{
        type: String,
        required: true
    },

    email : {
        type: String,
         required: true,
         unique: true

    },

    password : {
        type: String,
        required: true

    },

    image:{
        type: String,
        required: true

    }

})

let User = mongoose.model('User',userSchema,'users');
module.exports=User;