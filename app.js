var express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require("body-parser"),
  Treatment = require("./models/treatment"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/chemo", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.render("landing");
});

//INDEX - get all developers
app.get("/treatments", function(req, res){
  Treatment.find({}, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("treatments/treatments", {treatment: treatment});
    }
  });
});

//CREATE route - add new developer to database
app.post("/treatments", function(req, res){
   var date = req.body.date;
   var chemo = req.body.chemo;
   var medication = req.body.medication;
   var newTreatment = {date: date, chemo: chemo, medication: medication}
   Treatment.create(newTreatment, function(err, newlyCreated){
   if(err){
      console.log(err);
    } else {
      res.redirect("/treatments");
    }
 });
});

//NEW - show form to create new user. Has to be above the :id route below
app.get("/treatments/new", function(req, res){
  res.render("treatments/new.ejs");
});

//SHOW - get more info about a specific developer
app.get("/treatments/:id", function(req, res){
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


//COMMENTS ROUTES
//========================

//NEW - show form to create new comment.
app.get("/treatments/:id/comments/new", function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {treatment: treatment});
    }
  })
});

////CREATE route - add new comment to database
app.post("/treatments/:id/comments", function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
      res.redirect("/treatments");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        } else {
          treatment.comments.push(comment);
          treatment.save();
          res.redirect("/treatments/" +  treatment._id);
        }
      });
    }
  });
});


app.listen(3000, function(){
  console.log("ChemoTracker Server is listening!!!")
});
