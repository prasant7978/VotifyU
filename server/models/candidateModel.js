const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    aadharCard: {type: String, required: true},
    collegeIdCard: {type: String, required: true},
    hostelIdCard: {type: String, required: true},
    marksheet: {type: String, required: true},
    slogan: {type: String},
    position: {type: mongoose.Schema.ObjectId, required: true},
    student: {type: mongoose.Schema.ObjectId},
    socialLinks: [String],
    status: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('Candidate', candidateSchema);