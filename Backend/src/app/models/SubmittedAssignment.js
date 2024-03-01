const mongoose = require('mongoose');
const Schema = require('mongoose')
const SubmittedAssignment = new mongoose.Schema({
    assignmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', maxLength: 255},
    studentID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', maxLength: 255}],
    submissionDate: {type: Date, default: Date.now},
    Answer: {type: 'string', maxLength: 255},
}, {collection: 'submittedAssignment'});

module.exports = mongoose.model('SubmittedAssignment', SubmittedAssignment);