const mongoose = require('mongoose');

const userLiksAndFollowSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true

    },

    Ifollow: {
        type: [String],
    },

    followers: {
        type: [String],
    },
    Ilike: {
        type: [String],
    },
    Idislike: {
        type: [String],
    },



})

let userLiksAndFollow = mongoose.model('userLiksAndFollow', userLiksAndFollowSchema, 'userLiksAndFollow');
module.exports = userLiksAndFollow;