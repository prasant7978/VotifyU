const express = require('express');

const router = express.Router();

const upload = require('../middlewares/uploadFile');
const verifyToken = require('../middlewares/verifyToken');
const applyForCandidate = require('../controllers/candidateController/applyForCandidate');
const checkIfAlreadyExist = require('../controllers/candidateController/checkIfAlreadyExist');
const viewAllPendingApplications = require('../controllers/candidateController/viewAllPendingApplications');
const viewSingleCandidateApplication = require('../controllers/candidateController/viewSingleCandidateApplication');
const updateApplicationStatus = require('../controllers/candidateController/updateApplicationStatus');
const viewAllAcceptedCandidates = require('../controllers/candidateController/viewAllAcceptedCandidates');
const deleteCandidate = require('../controllers/candidateController/deleteCandidate');

router.post('/apply-for-candidate', verifyToken, upload, applyForCandidate)
// can be converted to middleware
router.get('/check-if-exist', verifyToken, checkIfAlreadyExist)
router.get('/view-pending-candidate-applications', verifyToken, viewAllPendingApplications)
router.get('/view-all-accepted-candidates', verifyToken, viewAllAcceptedCandidates)
router.get('/view-single-candidate-application', verifyToken, viewSingleCandidateApplication)
router.put('/update-application-status', verifyToken, updateApplicationStatus);
router.delete('/delete-candidate', verifyToken, deleteCandidate)

module.exports = router;