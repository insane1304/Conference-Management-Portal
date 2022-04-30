const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new mongoose.Schema({
  detils: {
    type: String,
  },
  reviewer_id:{
    type: Schema.Types.ObjectId,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

// Sets the created_at parameter equal to the current time
feedbackSchema.pre("save", function (next) {
  now = new Date();
  if (!this.creation_date) {
    this.creation_date = now;
  }
  next();
});


const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
