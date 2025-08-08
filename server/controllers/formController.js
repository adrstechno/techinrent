const form = require('../models/Form');
const{ v4: uuidv4 } = require('uuid');

exports.createForm = async (req, res) => {
  try{
    const formId = uuidv4();
    const newForm = new form({ formId });

    await newForm.save();
    res.status(201).json({success: true, message: 'Form created successfully', formLink: `http://localhost:3000/form/${formId}`, formId });
  }
  catch(error) {
    res.status(500).json({success: false, message: 'Error creating form', error: error.message});
  }
}

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await form.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: forms.length, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching forms', error: error.message });
  }
}
