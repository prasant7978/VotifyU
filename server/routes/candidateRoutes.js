const express = require('express');

const router = express.Router();

const upload = require('../middlewares/uploadFile');
const verifyToken = require('../middlewares/verifyToken');
const applyForCandidate = require('../controllers/candidateController/applyForCandidate');
const checkIfAlreadyExist = require('../controllers/candidateController/checkIfAlreadyExist');

router.post('/apply-for-candidate', verifyToken, upload, applyForCandidate)
router.get('/check-if-exist', verifyToken, checkIfAlreadyExist)

module.exports = router;