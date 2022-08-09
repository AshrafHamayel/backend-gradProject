const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    
    imageuser: {
        type: String,
        required: true,
    },

    imagepost: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
      
    },




})

let posts = mongoose.model('posts', postsSchema, 'posts');
module.exports = posts;