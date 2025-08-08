const Response = require('../models/Response');
const Form = require('../models/Form');

// Submit form response
exports.submitResponse = async (req, res) => {
  try {
    const { formId } = req.params; // Get formId from URL parameter
    const {
      fullName,
      phoneNumber,
      email,
      linkedinEmail,
      linkedinPassword,
      paymentInfo
    } = req.body;

    // Find the form by its UUID string to get the ObjectId
    const form = await Form.findOne({ formId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const response = new Response({
      formId: form._id, // Use the Form's ObjectId as reference
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
    console.error('Response submission error:', err);
    res.status(400).json({ message: 'Submission failed', error: err.message });
  }
};