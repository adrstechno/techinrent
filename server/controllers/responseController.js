const Response = require('../models/Response');

// Submit form response
exports.submitResponse = async (req, res) => {
  try {
    const {
      formId,
      fullName,
      phoneNumber,
      email,
      linkedinEmail,
      linkedinPassword,
      paymentInfo
    } = req.body;

    const response = new Response({
      formId,
      fullName,
      phoneNumber,
      email,
      linkedinEmail,
      linkedinPassword,
      paymentInfo
    });

    await response.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Submission failed', error: err.message });
  }
};