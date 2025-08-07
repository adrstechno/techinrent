const formResponse = require('../models/formResponse');
const Form = require('../models/Form');

exports.submitResponse = async (req, res) => {
    const { formId } = req.params;
    const {name, email, phone, message} = req.body;

    try {
        const form = await Form.findOne({ formId });
        if(!form) { return res.status(404).json({success: false, message: 'Form not found'});}

        const newResponse = new formResponse({
            formId,
            name,
            email,
            phone,
            message
        })

        await newResponse.save();
        res.status(201).json({success: true, message: 'Response submitted successfully', responseId: newResponse._id});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Error submitting response', error: error.message})
    }
}