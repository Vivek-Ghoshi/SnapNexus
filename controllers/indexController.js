const express = require("express");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

module.exports.loginPageController = function (req, res) {
  res.render("login", { footer: false });
};
module.exports.profilePageController = async function (req, res) {
  let { email } = req.user;
  let user = await userModel.findOne({ email }).populate('posts')
  res.render("profile", { footer: true, user: user });
};
module.exports.feedPageController = async function (req, res) {
  const posts = await postModel.find().populate("user");
  res.render("feed", { footer: true, posts: posts });
};
module.exports.uploadPageController = function (req, res) {
  res.render("upload", { footer: true });
};
module.exports.editPageController = async function (req, res) {
  let { email } = req.user;
  let user = await userModel.findOne({ email });
  res.render("edit", { footer: true, user });
};
module.exports.searchPageController = function (req, res) {
  res.render("search", { footer: true });
};
