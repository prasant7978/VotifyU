const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const createPosition = require('../controllers/positionController/createPosition');
const deletePosition = require('../controllers/positionController/deletePosition');
const viewAllPositions = require('../controllers/positionController/viewAllPositions');
const addVoteToPosition = require('../controllers/positionController/addVoteToPosition');
const verifyIfStudent = require('../middlewares/verifyIfStudent');
const publishResult = require('../controllers/positionController/viewElectionResult');
const assignWinnerCandidate = require('../controllers/positionController/assignWinnerCandidate');
const updatePosition = require('../controllers/positionController/updatePosition');

router.post('/create-position', verifyToken, createPosition)
router.get('/view-all-positions', verifyToken, viewAllPositions)
router.delete('/delete-position', verifyToken, deletePosition)
router.post('/add-vote', verifyToken, verifyIfStudent, addVoteToPosition)
router.get('/view-election-result', verifyToken, publishResult)
router.put('/assign-winner-candidate', verifyToken, assignWinnerCandidate)
router.put('/update-position', verifyToken, updatePosition)

module.exports = router;