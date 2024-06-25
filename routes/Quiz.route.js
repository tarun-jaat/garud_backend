const express =require("express")
const router=express.Router();
const{createQuiz}=require('../Controllers/Quiz.controller')
const {addQuestion}=require('../Controllers/Quiz.controller')
const {getQuiz}=require('../Controllers/Quiz.controller')
const {getAllQuizzes}=require('../Controllers/Quiz.controller')
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin,
  } = require("../Middleware/Auth.middleWare");

  router.post("/createQuiz", auth, isInstructor, createQuiz);
  router.post("/:quizId/questions",auth,isInstructor,addQuestion)
router.get('/find/:quizId',getQuiz)
router.get('/getAllQuizzes', getAllQuizzes);

  module.exports = router; 