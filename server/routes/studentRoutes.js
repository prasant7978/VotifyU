const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const viewAllStudents = require('../controllers/studentController/viewAllStudents');
const updateStudent = require('../controllers/studentController/updateStudent');
const deleteStudent = require('../controllers/studentController/deleteStudent');
const addStudent = require('../controllers/studentController/addStudent');

router.post('/add-student', verifyToken, addStudent)
router.get('/view-all-students', verifyToken, viewAllStudents)
router.put('/update-student', verifyToken, updateStudent)
router.delete('/delete-student', verifyToken, deleteStudent)

module.exports = router;