const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  forgetPass: {
    type: String,
    default:undefined,
  },
  organisation: {
    type: String,
    required: true,
    min: 6,
    max: 2048,
  },
  country: {
    type: String,
    required: true,
    min: 3,
    max: 128,
  },
  contact: {
    type: String,
    required: true,
  },
  conferences: [{
    type: Schema.Types.ObjectId,
  }],
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_login_date: {
    type: Date,
    default: Date.now,
  },
  access: {
    type: Boolean,
    default: true,
  },
});

authorSchema.statics.login = function login(id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { last_login_date: Date.now() }, new: true },
    callback
  );
};

// Sets the created_at parameter equal to the current time
authorSchema.pre("save", function (next) {
  now = new Date();
  this.last_login_date = now;
  if (!this.creation_date) {
    this.creation_date = now;
  }
  next();
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
