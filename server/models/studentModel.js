const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    studentName: {type: String, required: [true, "Please Add Name"], trim: true},
    studentRoll: {type: String, required: [true, "Please Add Roll No."], trim: true},
    studentEmail: {type: String, required: [true, "Please Add Email"], unique: true, trim: true},
    studentPassword: {type: String, required: [true, "Please Add Password"], min: 6, max: 64},
    studentPhone: {type: String, required: [true, "Please Add Phone"], trim: true},
    studentParentPhone: {type: String, trim: true},
    studentCourse: {type: String, trim: true},
    studentDepartment: {type: String, trim: true},
    studentDOB: {type: String, trim: true},
    studentGender: {type: String, trim: true},
    studentProfileImage: {type: String, trim: true},
    userType: {type: String, default: 'student'},
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);