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
router.post("/", function(req, res){
   var image = req.body.image;
   var date = req.body.date;
   var description = req.body.description;
   var newTreatment = {image: image, date: date, description: description}
   Treatment.create(newTreatment, function(err, newlyCreated){
   if(err){
      console.log(err);
    } else {
      res.redirect("/treatments");
    }
 });
});

//NEW - show form to create new treatment.
router.get("/new", function(req, res){
  res.render("treatments/new.ejs");
});

//SHOW - get more info about a specific treatment
router.get("/:id", function(req, res){
  //Find Treatment by ID
  Treatment.findById(req.params.id).populate("comments").exec( function(err, foundTreatment){
    if(err){
       console.log(err);
     } else {
       console.log(foundTreatment);
       res.render("treatments/show", {treatment: foundTreatment});
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
