const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  testDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  noOfQuestion: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price:{
    type:Number,
    required:true

  },
  thumbnailImage:{
    type:String,
  },
  instructions:{
    type:[String],
    required:true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
  totalMarks:
   { type: Number, required: true },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  Tag:{
    type:[String],
    required:true
  },
  status:{
    type: String,
    default:"Draft",
    enum:["Draft","Published"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
   
  

});

module.exports = mongoose.model("Quiz", testSchema);  