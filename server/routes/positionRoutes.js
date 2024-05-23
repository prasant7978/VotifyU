const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const createPosition = require('../controllers/positionController/createPosition');
const deletePosition = require('../controllers/positionController/deletePosition');
const viewAllPositions = require('../controllers/positionController/viewAllPositions');
const addVoteToPosition = require('../controllers/positionController/addVoteToPosition');
const verifyIfStudent = require('../middlewares/verifyIfStudent');
const updatePosition = require('../controllers/positionController/updatePosition');
const publishResult = require('../controllers/positionController/publishResult');
const viewElectionResults = require('../controllers/positionController/viewElectionResult');
const viewAllOpenPositions = require('../controllers/positionController/viewAllOpenPositions');

router.post('/create-position', verifyToken, createPosition)
router.get('/view-all-positions', verifyToken, viewAllPositions)
router.delete('/delete-position', verifyToken, deletePosition)
router.post('/add-vote', verifyToken, verifyIfStudent, addVoteToPosition)
router.get('/view-election-results', verifyToken, viewElectionResults)
router.get('/view-all-open-positions', verifyToken, viewAllOpenPositions)
router.put('/update-position', verifyToken, updatePosition)
router.put('/publish-result', verifyToken, publishResult)

module.exports = router;