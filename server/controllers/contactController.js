const Contact = require('../models/Contact');

// @desc   Handle new contact form submission
// @route  POST /api/contact
// @access Public

exports.submitContact = async (req, res) => {
    try{
        const { fullname, email, phone, message } = req.body;

        if( !fullname || !email || !message || !phone ){
            return res.status(400).json({message: 'Please fill out all the fields.'})
        }

        const newContact = new Contact({
            fullname,
            email,
            phone,
            message
        });
        await newContact.save();

        res.status(201).json({ success: true, data: newContact, message: 'Contact form submitted successfully!'});
    }
    catch(error) {
        console.error('Error submitting contact form: ', error);
        res.status(500).json({success: false, message: 'Internal server error. Please try again later'})
    }
}