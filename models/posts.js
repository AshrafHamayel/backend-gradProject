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
        default: 'def.png',
    },

    imagepost: {
        type: String,
        required: true,
        default: 'def.png',
    },

    date: {
        type: Date,
        required: true,
      
    },




})

let User = mongoose.model('User', userSchema, 'users');
module.exports = User;