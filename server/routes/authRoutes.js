const express = require('express');
const loginStudent = require('../controllers/authController/studentLogin');
const verifyIfExist = require('../middlewares/verifyIfExist');
const verifyToken = require('../middlewares/verifyToken');
const loginAdmin = require('../controllers/authController/Admin/loginAdmin');
const registerAdmin = require('../controllers/authController/Admin/registerAdmin');
const candidateLogin = require('../controllers/authController/candidateLogin');

const router = express.Router();

router.get('/verifyToken', verifyToken);

// Register
router.post('/register/admin', registerAdmin);

// Login
router.post('/login/admin', verifyIfExist, loginAdmin);
router.post('/login/student', verifyIfExist, loginStudent);
router.post('/login/candidate', verifyIfExist, candidateLogin);

module.exports = router;