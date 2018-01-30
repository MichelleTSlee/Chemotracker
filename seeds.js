var mongoose = require("mongoose");
var Treatment = require("./models/treatment");
var Comment = require("./models/comment");

// var data = [
//   {
//
//     date: "January 2018",
//     neutrophils: "1.4",
//     description: "Herceptin and Chemotherapy"
//   },
//   {
//     date: "February 2018",
//     neutrophils: "1.4",
//     description: "Herceptin and Chemotherapy"
//   },
//   {
//     date: "March 2018",
//     neutrophils: "1.4",
//     description: "Herceptin and Chemotherapy"
//   }
// ];


function seedDB() {
  //Remove all treatments
  Treatment.remove({}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log("Removed all treatments!");
    };
  });
  Comment.remove({}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log("Removed all comments!");
    };
  });
};


module.exports = seedDB;
