const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const createPosition = require('../controllers/positionController/createPosition');
const deletePosition = require('../controllers/positionController/deletePosition');
const viewAllPositions = require('../controllers/positionController/viewAllPositions');

router.post('/create-position', verifyToken, createPosition)
router.get('/view-all-positions', verifyToken, viewAllPositions)
router.delete('/delete-position', verifyToken, deletePosition)

module.exports = router;