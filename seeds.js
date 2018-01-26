var mongoose = require("mongoose");
var Treatment = require("./models/treatment");
var Comment = require("./models/comment");

var data = [
  {
    date: "January",
    chemo: "Chemo",
    medication: "Herceptin"
  },
  {
    date: "February",
    chemo: "Chemo",
    medication: "Herceptin"
  },
  {
    date: "March",
    chemo: "Chemo",
    medication: "Herceptin"
  }
];


function seedDB() {
  //Remove all treatments
  Treatment.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Removed all treatments!");
    }
  });
  //add a few treatments
  data.forEach(function(seed){
    Treatment.create(seed, function(err, treatment){
      if(err){
        console.log(err);
      } else {
        console.log("Saved a treatment");
        //Add comment
         Comment.create(
          {
             text: "This treatment sucked!",
             author: "Michelle"
           }, function(err, comment){
             if(err){
               console.log(err);
             } else {
               treatment.comments.push(comment);
               treatment.save();
               console.log("Created a new comment");
             }
           });
      }
    });
  });
};

module.exports = seedDB;
