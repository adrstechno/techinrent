const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        ref: 'form'
    },
    //static structure or form responses
    name: {
        type: String,
        required: true
    },
    emai: { type: String },
    phone: { type: String },
    message: { type: String },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('formResponse', formResponseSchema);