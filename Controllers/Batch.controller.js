const User = require("../model/User.model");
const Batch = require("../model/Batches.model");
const { uploadImageToCloudinary } = require("../Utils/ImageUploder");
const { convertSecondsToDuration } = require("../Utils/DateTimeFormate");
const Category = require("../model/Category.model");
const SubSection = require("../model/Subsection.model");
const Lecture = require("../model/Lecture.model");
const Subject = require("../model/Subject.model");
const Section =require("../model/Section.model")

exports.createBatch = async (req, res) => {
  try { 
    //get user id
    const userId = req.user.id; 

    let {
      batchName,
      batchDescription,
      batchStartDate,
      batchEndDate,
      batchFees,
      batchMaxStudents,
      tag: _tag,
      category,
      instructions: _instructions,
      status,
      batchMode,
      publishedStatus,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    const missingFields = []; 

    if (!batchName) missingFields.push("batchName");
    if (!batchDescription) missingFields.push("batchDescription");
    if (!batchStartDate) missingFields.push("batchStartDate");
    if (!batchEndDate) missingFields.push("batchEndDate");
    if (!batchFees) missingFields.push("batchFees");
    if (!batchMaxStudents) missingFields.push("batchMaxStudents");
    if (!tag.length) missingFields.push("tag");
    if (!category) missingFields.push("category");
    if (!instructions.length) missingFields.push("instructions");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }
 
    if (!status || status === undefined) {
      status = "Upcoming";
    }

    if (!batchMode || batchMode === undefined) {
      status = "Offline";
    }
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    const defaultThumbnail =
      "https://th.bing.com/th/id/OIP.6vFv2rzPppwRzwabTlithgHaE7?rs=1&pid=ImgDetMain";
    if (!thumbnail) {
      thumbnailImage = defaultThumbnail;
    } else {
      thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
    }
    if (!publishedStatus || publishedStatus === undefined) {
      publishedStatus = "Draft";
    }

    const newBatch = await Batch.create({
      batchName,
      batchDescription,
      batchStartDate,
      batchEndDate,
      batchFees,
      batchMaxStudents,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      tag,
      category: categoryDetails._id,
      instructor: instructorDetails._id,
      batchMode,
      publishedStatus,
    });

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      { $push: { batch: [newBatch._id] } },
      { new: true }
    );

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newBatch._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newBatch,
      message: "Batch Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the Batch
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Batch",
    });
  }
};

exports.getInstructorBatches = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorBatches = await Batch.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: instructorBatches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to fetch instructor Batches",
      error: error.message,
    });
  }
};

// exports.getSubjectData=async(req,res)=>{
//   try {
//     subjectId =req.params.subjectId
//     const subjectData=await Subject.findById(ssubjectId)
//     .populate



//   }catch(error){
//     console.error(error);
//     res.status(500).json({
//       success:false,
//       message:"failed to fetch subject data",
//       error:error.message,
//       });
  
//   }


exports.editBatchDetails = async (req, res) => {
  try {
    const batchId = req.body.batchId;
    const updates = req.body;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          batch[key] = JSON.parse(updates[key]);
        } else {
          batch[key] = updates[key];
        }
      }
    }
    await batch.save();
    res.status(200).json({
      success: true,
      message: "Batch details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to update Batch details",
      error: error.message,
    });
  }
};

exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find({ publishedStatus: "Published" })
      .populate("instructor")
      .populate("subjects")
      .populate('category')
      .exec();
 
    res.status(200).json({
      success: true,
      message: "Batches fetched successfully",
      batches: batches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to fetch Batches",
      error: error.message, 
    });
  } 
}; 

exports.getBatchFullDetails = async (req, res) => {
  try {
    const batchId = req.params.batchId;
    // console.log(batchId)
    
    const batch = await Batch.findById(batchId)
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      }, 
    }) 
     .populate({
      path: "subjects",
      populate: {
        path: "Chapter", 
        populate: {
          path: "notes",
        },
        populate:{
          path: "qizzes",
        },
        populate:{
          path: "DPP",
        },
        populate:{
          path:"lectureContent",
          populate: {
            path: 'subSection',
            model: 'SubSection'
          },
        }
      },
    })
     .populate("category")
     .exec();
     if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

   
    res.status(200).json({
      success: true,
      data: batch,
      message: "Batch details fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch batch details",
      error: error.message,
    });
  }
};

exports.getSectionDetails = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;

    const section = await Section.findById(sectionId)
     .populate({
          path: "lectureContent",
          populate: {
            path: "subSection",
            model: "SubSection",
        
        },
      })
     .exec();

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: section,
      message: "Section details fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch section details",
      error: error.message,
    });
  }
};