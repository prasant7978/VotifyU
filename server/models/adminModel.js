const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    employeeId: {type: String, required: [true, "Please Add Id"], trim: true},
    adminName: {type: String, required: [true, "Please Add Name"], trim: true},
    adminEmail: {type: String, required: [true, "Please Add Email"], unique: true, trim: true},
    adminPassword: {type: String, required: [true, "Please Add Password"], min: 6, max: 64},
    adminPhone: {type: String, required: [true, "Please Add Phone"], trim: true},
    adminProfileImage: {type: String, trim: true},
    userType: {type: String, default: 'admin'},
}, {timestamps: true});

module.exports = mongoose.model('Admin', adminSchema);