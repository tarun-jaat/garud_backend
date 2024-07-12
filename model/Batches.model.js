const mongoose = require("mongoose");

const BatchesSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  batchDescription: {
    type: String,
    required: true,
  },
  batchStartDate: {
    type: Date,
    required: true,
  },
  batchEndDate: {
    type: Date,
    required: true,
  },
  batchDuration: {
    type: Number,
    // required: true,
  },
  batchMode:{
    type: String,
    enum: ["Online", "Offline"],
  },
  batchFees: {
		type: Number,
    required: true,
  },
  batchMaxStudents: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  thumbnail: {
    type: String,
  },
  tag: {
    type: [String],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  quizzes: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Quiz",
    },
  ],
  lecture: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  instructions: {
    type: [String],
  },
  subjects:[ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
  ],
  status: {
    type: String,
    enum: ["Ended", "Started", "Upcoming"],
  },
  publishedStatus: {
		type: String,
		enum: ["Draft", "Published"],
	},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


 module.exports =mongoose.model("Batch",BatchesSchema)