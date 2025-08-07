const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  fullName: String,
  phoneNumber: String,
  email: String,
  linkedinEmail: String,
  linkedinPassword: String,
  paymentInfo: {
    method: { type: String, enum: ['upi', 'bank', 'crypto'], required: true },
    upi: String,
    bank: {
      accountNumber: String,
      ifsc: String,
    },
    crypto: {
      walletId: String,
      network: String,
    }
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Response', responseSchema);
