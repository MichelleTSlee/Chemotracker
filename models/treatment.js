var mongoose = require('mongoose');

var treatmentSchema = new mongoose.Schema({
  date: String,
  chemo: String,
  medication: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
}, {
  usePushEach: true
});

module.exports = mongoose.model("Treatment", treatmentSchema);
