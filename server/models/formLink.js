const mongoose = require('mongoose');

const formLinkSchema = new mongoose.Schema({
    token: {type: String, required: true, unique: true},
    isUsed: {type: Boolean, default: false},
    submittedData: {type: Object, default: null},
    createdAt: {type: Date, default: Date.now, expires: '1d'} // Link expires after 1 day
})

module.exports = mongoose.model('FormLink', formLinkSchema);