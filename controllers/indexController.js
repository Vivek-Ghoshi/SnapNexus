const express = require("express");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const timeAgo = require('../utils/date');

module.exports.loginPageController = function (req, res) {
  res.render("login", { footer: false });
};
module.exports.profilePageController = async function (req, res) {
  let { email } = req.user;
  let user = await userModel.findOne({ email }).populate('posts').populate('followers', '_id').populate('following', '_id');
  res.render("profile", { footer: true, user: user , userId: req.user.id});
};
module.exports.feedPageController = async function (req, res) {
  const user = await userModel.findOne({email: req.user.email})
  const posts = await postModel.find().populate("user").populate({
    path: 'comments.commentedBy',
    select: "username profileImage",
  });
  res.render("feed", { footer: true, posts: posts , user: user,date: timeAgo.formatRelativeTime});
};
module.exports.uploadPageController = async function (req, res) {
  const user = await userModel.findOne({email: req.user.email});
  res.render("upload", { footer: true , user});
};
module.exports.editPageController = async function (req, res) {
  let { email } = req.user;
  let user = await userModel.findOne({ email });
  res.render("edit", { footer: true, user });
};
module.exports.searchPageController = async function (req, res) {
  const user = await userModel.findOne({email: req.user.email});
  res.render("search", { footer: true, user });
};
module.exports.searchProfileController = async function(req,res){
  try {
    const user = await userModel.findOne({_id: req.params.id}).populate('posts');
    res.render('profile',{footer: true, user: user,userId: req.user.id})
  } catch (error) {
    console.log(error.message)
  }
}
