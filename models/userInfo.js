const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true

    },

    name: {
        type: String,
        required: true
    },

 
    password: {
        type: String,
        required: true

    },

    image: {
        type: String,
    },

    work: {
        type: String,

    },

    followers: {
        type: Number,

    },

    Ifollow: {
        type: Number,
    },

    evaluation: {
        type: Number,
    },

     description: {
        type: String,
    },

    Section: {
        type: String,
    },

    phoneNumber: {
        type: Number,
    },
  
    Location: {
        type: String,
    },
    Type: {
        type: String,
    },
    Token: {
        type: String,
    },



})

let userInfo = mongoose.model('userInfo', userInfoSchema, 'userInfo');
module.exports = userInfo;