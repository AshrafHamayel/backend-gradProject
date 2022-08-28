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
        type: [String],

    },

    Ifollow: {
        type: [String],
    },

    rating: 
    {
        type: String,
    },
     description: {
        type: String,
    },

    Section: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    Salary: {
        type: String,
    },
  
    city: {
        type: String,
    },
    Type: {
        type: String,
    },

    Iterest: {
        type: [String],
    },

    Availability: {
        type: String,
    },

    UserType: {
        type: String,
    },

    latitude: {
        type: String,
    },
    
    longitude: {
        type: String,
    },


    Token: {
        type: String,
    },



})

let userInfo = mongoose.model('userInfo', userInfoSchema, 'userInfo');
module.exports = userInfo;