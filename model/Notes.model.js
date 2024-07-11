const mongoose = require("mongoose");
const Notes = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
  pdf: {
    type: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model("notes", Notes);