const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({

    MyEmail: {
        type: String,
        required: true
    },

    SenderEmail: {
        type: String,
        required: true,
    },

    
    MyImage: {
        type: String,
        required: true,
    },

    SenderImage: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
      
    },

    SenderName: {
        type: String,
        required: true,
    },
    TextMessage: {
        type: String,
        required: true,
    },

    WhoSender: {
        type: String,
        required: true,
    },

    TypeMessage: {
        type: String,
        required: true,
    },

    LastMessage: {
        type: String,
        required: true,
    },

    MessageView: {
        type: String,
        required: true,
    },

})

let chats = mongoose.model('chats', chatsSchema, 'chats');
module.exports = chats;

