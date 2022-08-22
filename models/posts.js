const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({

    name:
     {
        type: String,
        required: true
    },

   
    id: {
        type: String,
        required: true,
       
    },


    
    imageuser: {
        type: String,
        required: true,
    },

    imagepost: {
        type: String,
        required: true,
        unique: true

    },

    Section: {
        type: String,
       
    },


    date: {
        type: String,
        required: true,
      
    },

    description: {
        type: String,
    },


    numberLike: {
        type: Number,
    },

    numberDisLike: 
    {
        type: Number,
    },





})

let posts = mongoose.model('posts', postsSchema, 'posts');
module.exports = posts;