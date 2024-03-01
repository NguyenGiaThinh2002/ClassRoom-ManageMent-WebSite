const mongoose = require('mongoose');
const Schema = require('mongoose')
const Assignment = new mongoose.Schema({
    classID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', maxLength: 255}],
    title: {type: 'string', maxLength: 255},
    content: {type: 'string', maxLength: 255},
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'files', maxLength: 255}],
    dueDay: {type: Date},

    createdAt: {type: Date, default: Date.now},
}, {collection: 'assignment'});

module.exports = mongoose.model('Assignment', Assignment);