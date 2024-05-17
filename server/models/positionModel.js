const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    positionCode: {type: String},
    description: {type: String, required: true},
    responsibilities: [String],
    status: {type: String, required: true},
    electedCandidate: {type: mongoose.Schema.ObjectId},
    appliedCandidates: [mongoose.Schema.ObjectId],
    studentVoted: [mongoose.Schema.ObjectId],
    voteCount: [{
        candidateId: { type: String, required: true },
        count: { type: Number, required: true },
    }]
}, {timestamps: true});

module.exports = mongoose.model('Position', positionSchema);