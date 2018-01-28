var express = require("express");
var router = express.Router({mergeParams: true});
var Treatment = require("../models/treatment");
var Comment = require("../models/comment");


//NEW - show form to create new comment.
router.get("/new", isLoggedIn, function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {treatment: treatment});
    }
  })
});

////CREATE  - add new comment to database
router.post("/", isLoggedIn, function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
      res.redirect("/treatments/:id/comments/new");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        } else {
          treatment.comments.push(comment._id);
          treatment.save();
          res.redirect("/treatments");
        }
      });
    }
  });
});

//=========================
//CHECK if User Logged In
//==========================

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };


module.exports = router;
