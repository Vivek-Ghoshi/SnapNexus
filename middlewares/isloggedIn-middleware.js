const express = require('express');
const jwt = require('jsonwebtoken');
const timeAgo = require('../utils/date');

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
// module.exports.timeAgo = function (req, res, next) {
//     res.locals.timeAgo = timeAgo; 
//     next();
//   };