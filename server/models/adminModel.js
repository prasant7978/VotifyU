const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    employeeId: {type: String, required: [true, "Please Add Id"], trim: true},
    name: {type: String, required: [true, "Please Add Name"], trim: true},
    email: {type: String, required: [true, "Please Add Email"], unique: true, trim: true},
    password: {type: String, required: [true, "Please Add Password"], min: 6, max: 64},
    phone: {type: String, required: [true, "Please Add Phone"], trim: true},
    profileImage: {type: String, trim: true},
    role: {type: String, default: 'Admin'},
    userType: {type: String, default: 'admin'},
}, {timestamps: true});

module.exports = mongoose.model('Admin', adminSchema);