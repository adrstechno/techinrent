const mongoose = require('mongoose');

const bookDemoSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    companyName: {type: String, required: true},
    jobtitle: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('BookDemo', bookDemoSchema);
