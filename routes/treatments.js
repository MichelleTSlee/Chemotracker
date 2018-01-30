var express = require("express");
var router = express.Router({mergeParams: true});
var Treatment = require("../models/treatment");
var Comment = require("../models/comment");


//INDEX - get all treatments
router.get("/", function(req, res){
  Treatment.find({}, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("treatments/treatments", {treatment: treatment});
    }
  });
});

//CREATE route - add new treatment to database
router.post("/", isLoggedIn, function(req, res){
   var neutrophils = req.body.neutrophils;
   var date = req.body.date;
   var description = req.body.description;
   var author = {
     id: req.user._id,
     username:  req.user.username
   };
   var newTreatment = {date: date, description: description, neutrophils: neutrophils, author: author};
   Treatment.create(newTreatment, function(err, newlyCreated){
   if(err){
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/treatments");
    }
 });
});

//NEW - show form to create new treatment.
router.get("/new", isLoggedIn, function(req, res){
  res.render("treatments/new.ejs");
});

//SHOW - get more info about a specific treatment
router.get("/:id", function(req, res){
  //Find Treatment by ID
  Treatment.findById(req.params.id).populate("comments").exec( function(err, foundTreatment){
    if(err){
       console.log(err);
     } else {
       res.render("treatments/show", {treatment: foundTreatment});
    }
 });
});

//EDIT Treatment route
router.get("/:id/edit", function(req, res){
  Treatment.findById(req.params.id, function(err, foundTreatment){
    if(err){
      res.redirect("/treatments");
    } else {
      res.render("treatments/edit", {treatment: foundTreatment});
    }
  });
});

//UPDATE route
router.put("/:id", function(req, res){
  //find&update the correct treatment
  Treatment.findByIdAndUpdate(req.params.id, req.body.treatment, function(err, updatedTreatment){
    if(err){
      res.redirect("/treatments");
    } else {
      res.redirect("/treatments/" + req.params.id);
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
