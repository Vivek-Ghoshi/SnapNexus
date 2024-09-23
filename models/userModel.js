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
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]

},{timestamps: true});

module.exports = mongoose.model("user", userSchema);