const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [{ type: String }],
  answer: String,
  marks: Number,
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
});

 module.exports = mongoose.model("Question",questionSchema);
