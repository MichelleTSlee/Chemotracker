var mongoose = require('mongoose');

var treatmentSchema = new mongoose.Schema({
  image: String,
  date: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Treatment", treatmentSchema);
