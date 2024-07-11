const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    lectureName: {
      type: String,
      required: true,
    },
    lectureDescription: {
      type: String,
      required: true,
    },
    lectureDate: {
      type: Date,
      required: true,
    },
    lectureStartTime: {
      type: String,
      required: true,
    },
    lectureEndTime: {
      type: String,
      required: true,
    },
    lectureDuration: {
      type: Number,
      required: true,
    },
    lectureMaterials: [
      {
        type: String,
      },
    ],
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Batch",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    lectureContent:[
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Lecture", LectureSchema);