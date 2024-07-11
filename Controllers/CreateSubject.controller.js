const Subject = require("../model/Subject.model");
const Chapter = require("../model/Chapter.model");
const Topic = require("../model/Topic.model");
const Batch = require("../model/Batches.model");
const Note = require("../model/Notes.model");
const Section = require("../model/Section.model");
const SubSection = require("../model/Subsection.model");
//create a new subject

exports.createSubject = async (req, res) => {
  try {
    const { subjectName, batchId } = req.body;

    if (!subjectName || !batchId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const subject = await Subject.create({ subjectName });
    const updatedbatch = await Batch.findByIdAndUpdate(
      batchId,
      { $push: { subjects: subject._id } },
      { new: true }
    )
      .populate({
        path: "subjects",
        populate: {
          path: "Chapter",
          populate: {
            path: "notes",
          },
          populate: {
            path: "lectureContent",
          },
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Subject created successfully",
      data: updatedbatch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to creating Subject please tryagain",
      error: error.message,
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { subjectName, batchId, subjectId } = req.body;
    if (!subjectName || !batchId || !subjectId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { subjectName },
      { new: true }
    );
    const updatedbatch2 = await Batch.findByIdAndUpdate(
      batchId,
      { $push: { subjects: subject._id } },
      { new: true }
    )
      .populate({
        path: "subjects",
        populate: {
          path: "Chapter",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: updatedbatch2,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to updating Subject please tryagain",
      error: error.message,
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { batchId, subjectId } = req.body;
    if (!batchId || !subjectId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    await Batch.findByIdAndUpdate(batchId, {
      $pull: { subjects: subjectId },
    });
    const subject = await Subject.findById(batchId);
    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject not found",
      });
    }
    await Chapter.deleteMany({ _id: { $in: subject.Chapter } });
    await Subject.findByIdAndDelete(subjectId);
    const batch = await Batch.findById(
      batchId.populate({
        path: "subjects",
        populate: { path: "Chapter" },
      })
    ).exec();
    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
      data: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to deleting Subject please tryagain",
      error: error.message,
    });
  }
}; 

// exports.addChapter = async (req, res) => {
//   try {
//     const { subjectId, chapterName, chapterDescription } = req.body;
//     if (!subjectId || !chapterName || !chapterDescription) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all the fields",
//       });
//     }
//     const subject = await Subject.findById(subjectId);
//     if (!subject) {
//       return res.status(400).json({
//         success: false,
//         message: "Subject not found",
//       });
//     }
//     const existingChapter = await Chapter.findOne({ subjectId,chapterName });
//     if (existingChapter) {
//       return res.status(400).json({
//         success: false,
//         message: "Chapter with the same name already exists",
//       });
//     }
//     const chapter = new Chapter({
//       subjectId: subjectId,
//       chapterName: chapterName,
//       chapterDescription: chapterDescription,
//     });
//     const updatedChapter=await Topic.findByIdAndUpdate(
//         chapter,
//         {
//           $push: { Chapter: chapter._id }
//         },
//         { new: true }
//       )
//       .populate({
//         path: "Chapter",
//         populate: { path: "Subject" },
//       })
//       .exec();
//       console.log(updatedChapter)

//     await chapter.save();
//     subject.Chapter.push(chapter._id);

//     await subject.save();
//     return res.status(200).json({
//       success: true,
//       message: "Chapter added successfully",
//       data: updatedChapter,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "There is some error to adding Chapter please tryagain",
//       error: error.message,
//     });
//   }
// };

exports.addChapter = async (req, res) => {
  try {
    const { subjectId, chapterName, chapterDescription } = req.body;
    if (!subjectId || !chapterName || !chapterDescription) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject not found",
      });
    }
    const existingChapter = await Chapter.findOne({ subjectId, chapterName });
    if (existingChapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter with the same name already exists",
      });
    }
    const chapter = new Chapter({
      subjectId: subjectId,
      chapterName: chapterName,
      chapterDescription: chapterDescription,
    });
    await chapter.save();
    subject.Chapter.push(chapter._id);
    await subject.save();
    return res.status(200).json({
      success: true,
      message: "Chapter added successfully",
      data: chapter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to adding Chapter please tryagain",
      error: error.message,
    });
  }
};

exports.addTopic = async (req, res) => {
  try {
    const { chapterId, topicName, topicDescription } = req.body;
    if (!chapterId || !topicName || !topicDescription) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter not found",
      });
    }
    const topic = new Topic({
      chapterId: chapterId,
      topicName: topicName,
      topicDescription: topicDescription,
    });
    await topic.save();
    chapter.topics.push(topic._id);
    await chapter.save();
    return res.status(200).json({
      success: true,
      message: "Topic added successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to adding Topic please tryagain",

      error: error.message,
    });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const batchId = req.params.batchId;
    if (!batchId) {
      return res.status(400).json({
        success: false,
        message: "Please provide batchId",
      });
    }
    const batch = await Batch.findById(batchId).populate({
      path: "subjects",
      populate: {
        path: "Chapter",
        model: "Chapter",
        populate:{
          path:"lectureContent",
          populate: {
            path: 'subSection',
            model: 'SubSection'
          },
        }
      },
    });
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "Batch not found",
      });
    }
    const subjects = batch.subjects;
    return res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is some error to retrieving subjects please tryagain",
      error: error.message,
    });
  }
};

exports.getAllSubjectsData = async (req, res) => {
  try {
    const subjects = await Subject.find().populate({
      path: "Chapter",
      populate: {
        path: "lectureContent",
        model: 'Section' ,// Model to populate from (assuming lectureContent references Section)
          populate: {
            path: "subSection",
            model: 'SubSection'
        },
      },
    });
    exec();
    return res.status(200).json({
      success: true,
      message: "All subjects retrieved successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "There is some error to retrieving all subjects please try again",
      error: error.message,
    });
  }
};
   
exports.addSectionIntoSubject = async (req, res) => {
  try {
    const { sectionName, chapterId } = req.body;

    if (!sectionName || !chapterId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      {
        $push: {
          lectureContent: newSection._id,
        },
      },
      { new: true }
    );

    const populatedSection = await Section.findById(newSection._id).populate({
      path: "subSection",
    });

    res.status(200).json({
      success: true,
      message: "Section created successfully",
      populatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getLectureContent = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;
    if (!chapterId) {
      return res.status(400).json({
        success: false,
        message: "Please provide chapterId",
      });
    }
    const chapter = await Chapter.findById(chapterId).populate({
      path: "lectureContent",
      populate: {
        path: "subSection",
      },
    });
    if (!chapter) {
      return res.status(400).json({
        success: false,
        message: "Chapter not found",
      });
    }
    const lectureContent = chapter.lectureContent;
    return res.status(200).json({
      success: true,
      message: "Lecture content retrieved successfully",
      data: lectureContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "There is some error to retrieving lecture content please tryagain",
      error: error.message,
    });
  }
};
