const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

module.exports.registerRouteController = async function (req, res) {
  try {
    let { username, name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.send("you already have an account please login");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const createdUser = await userModel.create({
          name,
          username,
          email,
          password: hash,
        });
        const token = jwt.sign(
          { email: createdUser.email, id: createdUser._id },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        res.redirect("/profile");
      });
    });
  } catch (err) {
    console.log(err.msg);
  }
};

module.exports.loginRouteController = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.send("you dont have any account please create one");
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) return res.send("email or password did not match");
      else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        res.redirect("/profile");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.logoutRouteController = function (req, res) {
  try {
    res.cookie("token", "");
    res.redirect("/login");
  } catch (err) {
    console.log("err.message");
  }
};

module.exports.updateRouteController = async function (req, res) {
  try {
    let { email } = req.user;
    let user = await userModel.findOneAndUpdate(
      { email },
      { username: req.body.username, name: req.body.name, bio: req.body.bio },
      { new: true }
    );
    if (req.file) {
      user.profileImage = req.file.filename;
    }
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.uploadRouteController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    const post = await postModel.create({
      Image: req.file.filename,
      caption: req.body.caption,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/feed");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.searchRouteController = async function (req, res) {
  try {
    const regex = new RegExp(`^${req.params.username}`, "i");
    const users = await userModel.find({ username: regex });
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.likeRouteController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let post = await postModel.findOne({ _id: req.params.id });
    if (post.likes.indexOf(user._id) === -1) {
      post.likes.push(user._id);
    } else {
      post.likes.splice(post.likes.indexOf(user._id), 1);
    }
    await post.save();
    res.redirect("/feed");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.commentRouteController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let post = await postModel.findOne({ _id: req.params.id });
    let comment = req.body.comment;

    if (!post) return res.send("post not found");
    post.comments.push({
      commentedBy: user._id,
      theComment: comment,
    });

    await post.save();
    res.redirect("/feed");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.followRouteController = async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const userToFollow = await userModel.findOne({ _id: req.params.id });
    const isFollowing = user.following.includes(userToFollow._id)
    if (!isFollowing) {
      user.following.push(userToFollow._id);
      userToFollow.followers.push(user._id);
    } else {
      res.send("you already follow each other");
    }
    await user.save();
    await userToFollow.save();
    res.redirect('/profile');

  } catch (error) {
    console.log(error.message);
  }
};

module.exports.unfollowRouteController = async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const userToUnFollow = await userModel.findOne({ _id: req.params.id });

    await userModel.findOneAndUpdate(
      { _id: user._id },
      { $pull: { following: userToUnFollow._id } }
    );

    await userModel.findOneAndUpdate(
      { _id: userToUnFollow._id },
      { $pull: { followers: user._id } }
    );

    res.redirect('/profile');
  } catch (error) {
    console.log(error.message);
  }
};
