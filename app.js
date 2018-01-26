var express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require("body-parser"),
  Treatment = require("./models/treatment"),
  seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/chemo", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// Developer.create({  //This creates & saves in one step
//   name: "Michelle Seashell",
//   image: "https://cdn.pixabay.com/photo/2017/07/06/18/48/wonder-woman-2478971__340.jpg",
//bio: "I know Java and Python"
//   }, function(err, developer){
//   if(err){
//       console.log(err);
//     } else {
//       console.log(developer);
//   }
// });

// Developer.find({}, function(err, developers){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(developers);
//   }
// });


app.get("/", function(req, res){
  res.render("landing");
});

//INDEX - get all developers
app.get("/treatments", function(req, res){
  Treatment.find({}, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("treatments", {treatment: treatment});
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
  res.render("new.ejs");
});

//SHOW - get more info about a specific developer
app.get("/treatments/:id", function(req, res){
  //Find Treatment by ID
  Treatment.findById(req.params.id, function(err, foundTreatment){
    if(err){
       console.log(err);
     } else {
       res.render("show", {treatment: foundTreatment});
    }
 });
});

app.listen(3000, function(){
  console.log("ChemoTracker Server is listening!!!")
});
