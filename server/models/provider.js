const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    linkedIn: {type: String, required: true},
    verification: {type: String, enum:["verified", "nonVerified"]},
    additionalInfo: {type: String}
})

module.exports = mongoose.model('Provider', providerSchema);