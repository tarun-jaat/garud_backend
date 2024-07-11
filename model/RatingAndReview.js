const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    index: true,
  },
  test:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Test",
    index:true
    },
    batch:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Batch",
      index:true
    },
  
  createdAt: {
    type: Date,
    default: Date.now,
    },
    
});

const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);

module.exports = RatingAndReview;
