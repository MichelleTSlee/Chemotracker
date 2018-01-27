var mongoose = require("mongoose");
var Treatment = require("./models/treatment");
var Comment = require("./models/comment");

var data = [
  {

    image: "https://cdn.pixabay.com/photo/2017/09/07/10/25/logo-2724481__340.png",
    date: "January",
    description: "Herceptin & Chemo"
  },
  {
    image: "https://cdn.pixabay.com/photo/2017/09/26/18/31/abstract-2789690__340.png",
    date: "February",
    description: "Herceptin & Chemo"
  },
  {
    image: "https://cdn.pixabay.com/photo/2017/10/16/22/10/dna-2858778__340.png",
    date: "March",
    description: "Herceptin & Chemo"
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
             text: "Aching bones",
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
