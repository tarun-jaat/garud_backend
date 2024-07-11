const express =require("express")
const router=express.Router();
const{createQuiz, editQuiz}=require('../Controllers/Quiz.controller')
const {addQuestion}=require('../Controllers/Quiz.controller')
const {getQuiz}=require('../Controllers/Quiz.controller') 
const {getAllQuizzes}=require('../Controllers/Quiz.controller')

const {startQuiz,submitAnswer,endQuiz,getConductQuiz}= require('../Controllers/ConductQuiz.controller');


const { 
    auth,
    isInstructor,
    isStudent,
    isAdmin,
  } = require("../Middleware/Auth.middleWare"); 

  router.post("/createQuiz", auth, isInstructor, createQuiz);
  router.post("/questions/:quizId",auth,isInstructor,addQuestion)
router.get('/find/:quizId',auth,getQuiz)
router.get('/getAllQuizzes', getAllQuizzes);
router.post('/updateQuiz/:quizId',auth,isInstructor,editQuiz)

 

router.post('/quizzes/:quizId/start',auth, startQuiz);
router.post('/conduct-quizzes/:conductQuizId/questions/:questionId/submit',auth,submitAnswer);
router.post('/conduct-quizzes/:conductQuizId/end',auth, endQuiz);
router.get('/conduct-quizzes/:conductQuizId', auth,getConductQuiz);

module.exports = router;   