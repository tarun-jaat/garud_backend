
const express = require("express")
const router = express.Router()
const { getAllUserData,addUserData,updateUserData,deleteUserData,studentdata } = require("../Controllers/userData.controller");



router.get("/student-fee-info", getAllUserData);


router.post('/add-data',addUserData);

router.put('/update-data/:id',updateUserData);

router.delete('/delete-user/:id',deleteUserData);

router.get('/student-data/:id',studentdata);

module.exports = router;
