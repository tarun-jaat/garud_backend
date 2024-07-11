const mongoose = require('mongoose');

// Define schema for the Question model
const questionSchema =  new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [{ type: String }],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 1,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },

});

// Compile schema into a model and export it
module.exports = mongoose.model('Question', questionSchema);

