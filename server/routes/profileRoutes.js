const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const getStudentProfile = require('../controllers/profileController/viewProfile/getStudentProfile');
const getAllStudentsProfile = require('../controllers/profileController/viewProfile/getAllStudentsProfile');
const getAllCandidatesProfile = require('../controllers/profileController/viewProfile/getAllCandidatesProfile');
const updateStudentProfile = require('../controllers/profileController/updateStudentProfile');
const updatePassword = require('../controllers/profileController/updatePassword');
const updateAdminProfile = require('../controllers/profileController/updateAdminProfile');

const uploadImage = require('../middlewares/uploadImage');

router.get('/student/get-profile', verifyToken, getStudentProfile);
router.get('/student/get-all-profile', verifyToken, getAllStudentsProfile);

router.get('/student/get-all-candidates-profile', verifyToken, getAllCandidatesProfile);

router.put('/student/update-profile', verifyToken, updateStudentProfile);
router.put('/admin/update-profile', verifyToken, updateAdminProfile);

router.put('/student/upload-profile-image', verifyToken, uploadImage, updateStudentProfile);
router.put('/admin/upload-profile-image', verifyToken, uploadImage, updateAdminProfile);

router.put('/update-password', verifyToken, updatePassword);

module.exports = router;