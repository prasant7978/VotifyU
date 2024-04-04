const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const getStudentProfile = require('../controllers/profileController/viewProfile/getStudentProfile');
const getAllStudentsProfile = require('../controllers/profileController/viewProfile/getAllStudentsProfile');
const getAllCandidatesProfile = require('../controllers/profileController/viewProfile/getAllCandidatesProfile');
const deleteStudentProfile = require('../controllers/profileController/deleteStudentProfile');
const updateStudentProfile = require('../controllers/profileController/updateStudentProfile');

const uploadImage = require('../middlewares/uploadImage');

router.get('/student/get-profile', verifyToken, getStudentProfile);
router.get('/student/get-all-profile', verifyToken, getAllStudentsProfile);
router.get('/student/get-all-candidates-profile', verifyToken, getAllCandidatesProfile);
// router.put('/student/update-profile', verifyToken, uploadImage, updateStudentProfile);
router.put('/student/update-profile', verifyToken, updateStudentProfile);
router.delete('/student/delete-profile', verifyToken, deleteStudentProfile);

module.exports = router;