const mongoose = require("mongoose"); 

const SubjectSchema = new mongoose.Schema({

    subjectName: {
      type: String,
      required: true,
    },
    Chapter:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Chapter'
      }
    ],
    


    createdAt: {
      type: Date,
      default: Date.now,
    },
  });


  module.exports = mongoose.model("Subject", SubjectSchema);