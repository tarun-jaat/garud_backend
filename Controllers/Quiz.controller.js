const Category =require('../model/Category.model')
const Question =require('../model/question.model')
const Quiz =require('../model/Test.modal')
const User =require('../model/User.model')
const {uploadImageToCloudinary}= require('../Utils/ImageUploder')
 
exports.createQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        let {
            testName,
            testDescription,
            noOfQuestion,
            duration,
            price, 
            category,
            totalMarks,
            tag: _tag,
            instructions: _instructions,
            status,
        } = req.body;
        
        const thumbnail = req.files.thumbnailImage;
  if (!thumbnail) {
    return res.status(400).json({
      success: false,
      message: "Thumbnail image is required",
    });
  }

        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        // Check for required fields
        if (!testName ||       
            !testDescription ||
            !noOfQuestion ||
            !duration ||
            !price ||
            !category ||
            !totalMarks ||
            !tag.length ||
            !instructions.length
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Set default status if not provided
        if (!status || status === undefined) {
            status = "Draft";
        }

        // Check if user is instructor
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
            return res.status(404).json({
                success: false,
                message: "Only instructors can create quizzes",
            });
        }

        // Find category details
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        // Upload thumbnail image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
        // Create new quiz
        const newQuiz = await Quiz.create({
            testName,
            testDescription,
            noOfQuestion,
            duration,
            price,
            category: categoryDetails._id,
            totalMarks,
            instructor: instructorDetails._id,
            tag,
            instructions,
            status,
            thumbnailImage: thumbnailImage.secure_url,
        });

        // Update user with new quiz
        await User.findByIdAndUpdate(instructorDetails._id, {
            $push: { quizzes: newQuiz._id }
        });

        // Update category with new quiz
        await Category.findByIdAndUpdate(category, {
            $push: { quizzes: newQuiz._id }
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: "Quiz created successfully",
            data: newQuiz,
        });

    } catch (error) {
        console.error("Error in createQuiz:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.addQuestion = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const {
        questionText,
        options,
        answer,
        marks,
      } = req.body;
  
      // Check for required fields
      if (!questionText || !options || !answer || !marks) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }
  
      // Find the quiz
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({
          success: false,
          message: "Quiz not found",
        });
      }
  
      // Create a new question
      const newQuestion = await Question.create({
        questionText,
        options,
        answer,
        marks,
        quiz: quizId,
      });
  
      // Add the question to the quiz
      await Quiz.findByIdAndUpdate(quizId, {
        $push: { questions: newQuestion._id },
      });
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "Question added successfully",
        data: newQuestion,
      });
    } catch (error) {
      console.error("Error in addQuestion:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  exports.getQuiz = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const quiz = await Quiz.findById(quizId)
        .populate({
          path: "instructor",
          model: User, // Use the User model
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .exec()
  
      if (!quiz) {
        return res.status(404).json({
          success: false,
          message: 'Quiz not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Quiz fetched successfully',
        data: quiz,
      });
    } catch (error) {
      console.error('Error in getQuiz:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };
 

  exports.getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await Quiz.find({ status: true })
      .select('testName testDescription price instructor duration thumbnailImage ratingAndReviews created_at')
      .populate("instructor", "", User) 
      .exec()
  
      res.status(200).json({
        success: true,
        message: 'Quizzes fetched successfully',
        data: quizzes,
      });
    } catch (error) {
      console.error('Error in getAllQuizzes:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      }); 
    }
};