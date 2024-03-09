const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Please Add Name"], trim: true},
    roll: {type: String, required: [true, "Please Add Roll No."], trim: true},
    email: {type: String, required: [true, "Please Add Email"], unique: true, trim: true},
    password: {type: String, required: [true, "Please Add Password"], min: 6, max: 64},
    phone: {type: String, required: [true, "Please Add Phone"], trim: true},
    parentPhone: {type: String, trim: true},
    course: {type: String, trim: true},
    department: {type: String, trim: true},
    dob: {type: String, trim: true},
    gender: {type: String, trim: true},
    profileImage: {type: String, trim: true},
    role: {type: String, default: 'Student'},
    userType: {type: String, default: 'student'},
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);