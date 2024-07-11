const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    topicName: {
      type: String,
      required: true,
    },
    topicDescription: {
      type: String,
      required: true,
    },
    lecturesVideos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ]
  });

  module.exports = mongoose.model("Topic", TopicSchema);