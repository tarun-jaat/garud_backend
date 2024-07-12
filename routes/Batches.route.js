const express =require("express")
const router = express.Router()
const {createBatch, getInstructorBatches, editBatchDetails, getAllBatches, getBatchFullDetails} = require('../Controllers/Batch.controller')
const {createSubject,updateSubject,deleteSubject,addChapter,addTopic,getSubjects, getAllSubjectsData, addSectionIntoSubject, getLectureContent}=require('../Controllers/CreateSubject.controller')
const{createSubSection, createNote}=require('../Controllers/Lecture.controller')
const { 
    auth,
    isInstructor,
    isStudent,
    isAdmin,
  } = require("../Middleware/Auth.middleWare"); 

  router.post('/createBatch',auth,isInstructor,createBatch);
  router.post('/updateBatchDetails',auth,isInstructor,editBatchDetails)
  router.get('/getAllBatches',getAllBatches)
  // router.get("/getSectionDetails",get)



// ********************************************************************************************************
//                                      SujectRoutes
// ********************************************************************************************************'

router.post('/createSubject',auth,isInstructor,createSubject)
router.post('/deleteSubject',auth,isInstructor,deleteSubject)
router.post('/updateSubject',auth,isInstructor,updateSubject)
router.get('/getAllSubjectsData',auth,getAllSubjectsData)
router.post('/addSectionIntoSubject',auth,isInstructor,addSectionIntoSubject)

router.post('/subject/getSubject/:batchId',auth,isInstructor,getSubjects)
router.get('/getfullDetails/:batchId',auth,getBatchFullDetails)

// ********************************************************************************************************
//                                      ChapterRoutes
// ********************************************************************************************************'
router.post('/subject/addChapter',auth,isInstructor,addChapter)
router.post('/subject/getlectureContent',auth,isInstructor,getLectureContent)




// ********************************************************************************************************
//                                      TopicRoutes
// ********************************************************************************************************'
router.post('/subject/addTopic',auth,isInstructor,addTopic)




router.get("/getInstructorBatches", auth, isInstructor, getInstructorBatches)


router.post('/subject/addLecture',auth,isInstructor,createSubSection)
// router.post('/subject/addNotes',auth,isInstructor,createNote)

  module.exports = router;

