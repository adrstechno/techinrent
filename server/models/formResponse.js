const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedinEmail: {
    type: String,
    required: true,
  },
  linkedinPassword: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'bank', 'crypto'],
    required: true,
  },
  paymentDetails: {
    upi: {
      type: String,
    },
    bank: {
      accountNumber: String,
      ifscCode: String,
    },
    crypto: {
      walletId: String,
      network: String,
    }
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

// Add conditional validation
responseSchema.pre('validate', function (next) {
  if (this.paymentMethod === 'upi' && !this.paymentDetails.upi) {
    return next(new Error('UPI is required'));
  }
  if (this.paymentMethod === 'bank') {
    if (!this.paymentDetails.bank?.accountNumber || !this.paymentDetails.bank?.ifscCode) {
      return next(new Error('Bank accountNumber and ifscCode are required'));
    }
  }
  if (this.paymentMethod === 'crypto') {
    if (!this.paymentDetails.crypto?.walletId || !this.paymentDetails.crypto?.network) {
      return next(new Error('Crypto walletId and network are required'));
    }
  }
  next();
});

module.exports = mongoose.model('Response', responseSchema);
