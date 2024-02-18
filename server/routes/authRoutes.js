const express = require('express');
const loginStudent = require('../controllers/authController/loginStudent');
const registerStudent = require('../controllers/authController/registerStudent');
const verifyIfExist = require('../middlewares/verifyIfExist');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/verifyToken', verifyToken);

router.post('/register/student', registerStudent);

router.post('/login/student', verifyIfExist, loginStudent);

module.exports = router;