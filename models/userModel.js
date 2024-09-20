const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    bio: String,
    profileImage: String,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],

},{timestamps: true});

module.exports = mongoose.model("user",userSchema);