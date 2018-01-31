var Treatment = require("../models/treatment");
var Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkTreatmentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Treatment.findById(req.params.id, function(err, foundTreatment){
      if(err){
        req.flash("error", "Treatment not found");
        res.redirect("/treatments");
      } else {
        //does user own treatment?
        if(foundTreatment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please log in first");
    res.redirect("back");
  }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        //does user own comment?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please log in first");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
};


module.exports = middlewareObj;
