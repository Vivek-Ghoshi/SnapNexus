const express = require('express');

module.exports.loginPageController = function(req,res){
    res.render('login',{footer: false})
};
module.exports.profilePageController = function(req,res){
    res.render('profile',{footer: false})
};
module.exports.feedPageController = function(req,res){
    res.render('feed',{footer: false})
};
module.exports.uploadPageController = function(req,res){
    res.render('upload',{footer: false})
};
module.exports.editPageController = function(req,res){
    res.render('edit',{footer: false})
};
module.exports.searchPageController = function(req,res){
    res.render('search',{footer: false})
};
