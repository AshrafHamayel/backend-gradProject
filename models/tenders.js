const mongoose = require('mongoose');

const tendersSchema = new mongoose.Schema({
    
    name:
     {
        type: String,
        required: true
     },

   
    id: {
        type: String,
        required: true,
       
         },

    
    imageuser: 
    {
        type: String,
        required: true,
    },

    imageTenders: 
    {
        type: String,
        required: true,
       

    },

    date:
     {
        type: String,
        required: true,
      
      },

      Section: {
        type: String,
    },

    description: 
    {
        type: String,
    },
    applicants: 
    {
        type: [String],
    },


})

let tenders = mongoose.model('tenders', tendersSchema, 'tenders');
module.exports = tenders;