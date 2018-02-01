var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//================
//ROOT ROUTE
//================

router.get("/", function(req, res){
  res.render("landing");
});


//================
//AUTH ROUTES
//================

//=================
//SIGN UP
//==================

//Show sign up form (so GET request)
router.get("/register", function(req, res){
  res.render("register", {page: "register"});
});


//Handle user sign up (so POST)
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      req.flash("error", err.message);
      console.log(err);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Chemo Tracker " + user.username);
      res.redirect("/treatments");
    });
  });
});

//===============
//LOGIN ROUTES
//================

//Show login form
router.get("/login", function(req, res){
  res.render("login", {page: "login"});
});

//Handle login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/treatments",
  failureRedirect: "/login"
}), function(req, res){
});


//===============
//LOGOUT ROUTE
//===============

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/treatments");
  });




  module.exports = router;
