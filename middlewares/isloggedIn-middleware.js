const express = require('express');
const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = function(req,res,next){
    try {
        let token = req.cookies.token;
        
        if(!token){
            res.redirect('/login');
        }
        else{
         const decoded =   jwt.verify(token,process.env.JWT_KEY);
         req.user = decoded;
         next();
        }
    } catch (error) {
        console.log('err.message')
    }
};