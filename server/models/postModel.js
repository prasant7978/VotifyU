const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    type: {type: String, required: true},
    image: {type: String},
    postedBy: {type: mongoose.Schema.ObjectId},
    userType: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);