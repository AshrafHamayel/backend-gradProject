const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    
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

    imagecomplaint: 
    {
        type: String,
        required: true,
       

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

})

let complaint = mongoose.model('complaint', complaintSchema, 'complaint');
module.exports = complaint;