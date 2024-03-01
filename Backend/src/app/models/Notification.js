const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
    classID: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', maxLength: 255},
    content: {type: 'string', maxLength: 255},
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'files', maxLength: 255}],
    createdAt: {type: Date, default: Date.now},
    // filename: String,
    // publicUrl: String,
}, {collection: 'notification'})

module.exports = mongoose.model('Notification', Notification);