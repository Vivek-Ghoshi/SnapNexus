const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    name:{
        type,String,
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
    profileImg: Buffer,
    posts:{
        type: Array,
        default:[]
    },

},{timestamps: true});

module.exports = mongoose.model("user",userSchema);