const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports.registerRouteController = async function(req,res){
    try{
         let{ username,name,email,password} = req.body;
       let user = await userModel.findOne({email});
       if(user) return res.send('you already have an account please login');
       bcrypt.genSalt(10,function(salt,err){
        bcrypt.hash(password,salt,async function(hash,err){
         const createdUser = await userModel.create({
            name,
            username,
            email,
            password: hash,
         })
         const token = jwt.sign({email:createdUser.email, id: createdUser._id},process.env.JWT_KEY);
         res.cookie('token',token);
         res.redirect('/profile')
        })
       })
    }
    catch(err){
        console.log(err.msg)
    }
};

module.exports.loginRouteController = async function(req,res){
    try{
         let{email,password} = req.body;
         let user = await userModel.findOne({email});
         if(!user) return res.send('you dont have any account please create one');
         bcrypt.compare(user.password, password, function(result,err){
            if(!result) return res.send('email or password did not match')
            else {
          const token = jwt.sign({email: user.email,id: user._id}, process.env.JWT_KEY);
          res.cookie('token',token);
          res.redirect('/profile')
                
            }
         })  
    }
    catch(err){
        console.log(err.message)
    }
};

module.exports.logoutRouteController = function (req,res){
    try{
        res.cookie('token', '');
        res.redirect('/login');
    }
    catch(err){
        console.log('err.message')
    }
}