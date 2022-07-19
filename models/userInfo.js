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
        //required: true,
        default: 'def.png',
    },

    work: {
        type: String,
        //required: true
        default:'بدون مهنة',

    },

    followers: {
        type: Int32,
       // required: true,
        default:00,

    },

    Ifollow: {
        type: Int32,
       // required: true,
        default:00,
    },

    evaluation: {
        type: Int32,
       // required: true,
        default:00,
    },

     description: {
        type: String,
       // required: true,
        default:'اضف وصف لعملك',
    },






})

let userInfo = mongoose.model('userInfo', userInfoSchema, 'userInfo');
module.exports = userInfo;