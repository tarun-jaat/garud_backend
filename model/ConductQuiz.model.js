const mongoose = require('mongoose');

const conductQuizSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  score: {
    type: Number,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      answer: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('ConductQuiz', conductQuizSchema);