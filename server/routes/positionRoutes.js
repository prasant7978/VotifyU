const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const createPosition = require('../controllers/positionController/createPosition');
const deletePosition = require('../controllers/positionController/deletePosition');

router.post('/create-position', verifyToken, createPosition)
router.delete('/delete-position', verifyToken, deletePosition)

module.exports = router;