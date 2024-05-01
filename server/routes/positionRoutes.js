const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const createPosition = require('../controllers/positionController/createPosition');

router.post('/create-position', verifyToken, createPosition)

module.exports = router;