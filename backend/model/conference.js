const mongoose = require("mongoose");
const { Schema } = mongoose;

const conferenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  researchArea: {
    type: String,
    required: true,
  },
  paper_urls: [{
    type: String,
  }],
  reviewers: [{
    type:  Schema.Types.ObjectId
  }],
  authors: [{
    type:  Schema.Types.ObjectId
  }],
  chairperson: {
    type: Schema.Types.ObjectId
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  accpeting: {
    type: Boolean,
    default: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

// conferenceSchema.statics.login = function login(id, callback) {
//   return this.findByIdAndUpdate(
//     id,
//     { $set: { last_login_date: Date.now() }, new: true },
//     callback
//   );
// };

// Sets the created_at parameter equal to the current time
conferenceSchema.pre("save", function (next) {
  now = new Date();
  if (!this.creation_date) {
    this.creation_date = now;
  }
  next();
});

const Conference = mongoose.model("Conference", conferenceSchema);
module.exports = Conference;
