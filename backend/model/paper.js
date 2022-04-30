const mongoose = require("mongoose");
const { Schema } = mongoose;


const ratingSchema = new mongoose.Schema({
  user_id:{
    type: Schema.Types.ObjectId,
  },
  rate:{
    type:Schema.Types.Decimal128

  },
  user_feedback:{
    type:String
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});


const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  abstract:{
    type: String,
    required:true,
  },
  keywords:{
    type: String,
    required:true,
  },
  url:{
    type: String,
  },
  author_id:{
    type: Schema.Types.ObjectId,
  },
  conference_id:{
    type: Schema.Types.ObjectId,
  },
  feedbacks:[{
    type: Schema.Types.ObjectId,
  }],
  rating:{
    type: Schema.Types.Decimal128,
    default: 0,
  },
  usersrated:[{
    type: ratingSchema,
  }],
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

// Sets the created_at parameter equal to the current time
paperSchema.pre("save", function (next) {
  now = new Date();
  if (!this.creation_date) {
    this.creation_date = now;
  }
  next();
});

const Paper = mongoose.model("Paper", paperSchema);
module.exports = Paper;
