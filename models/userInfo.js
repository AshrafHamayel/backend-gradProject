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
        type: String,

    },

    Ifollow: {
        type: String,
    },

    evaluation: {
        type: String,
    },

     description: {
        type: String,
    },






})

let userInfo = mongoose.model('userInfo', userInfoSchema, 'userInfo');
module.exports = userInfo;