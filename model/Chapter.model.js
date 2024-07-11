const mongoose = require("mongoose");


const ChapterSchema = new mongoose.Schema({
    chapterName: {
      type: String,
      required: true,
    },
    chapterDescription: {
      type: String,
      required: true,
    },
    // topics: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Topic"
    //     }
    // ],
    lectureContent:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
      }
    ],
    notes:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Notes"
      }
    ],
    Dpp:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Dpp"
      }
    ],
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Chapter", ChapterSchema );