const mongoose = require('mongoose');

const comitsSchema = new mongoose.Schema({

    name:
     {
        type: String,
        required: true
    },

   
    id: {
        type: String,
        required: true,
       
         },


         idFriend: {
            type: String,
            required: true,
           
             },
    
    imageuser: 
    {
        type: String,
        required: true,
    },

    imagecomit: 
    {
        type: String,
        required: true,
        unique: true

    },

    date:
     {
        type: String,
        required: true,
      
    },

    description: 
    {
        type: String,
    },


    rating: 
    {
        type: String,
    },
    
})

let comit = mongoose.model('comit', comitsSchema, 'comit');
module.exports = comit;