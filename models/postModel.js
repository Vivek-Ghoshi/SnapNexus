const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Image: String,
    caption: String,
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    date:{
        type: Date,
        default: Date.now,
    },
    comments: [{
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        theComment: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('post', postSchema);