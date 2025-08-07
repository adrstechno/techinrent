const Contact = require('../models/Contact');

// @desc   Handle new contact form submission
// @route  POST /api/contact
// @access Public

exports.submitContact = async (req, res) => {
    try{
        const { fullname, email, phone, company, message } = req.body;

        if( !fullname || !email || !message || !phone || !company ) {
            return res.status(400).json({message: 'Please fill out all the fields.'})
        }

        const newContact = new Contact({
            fullname,
            email,
            phone,
            company,
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


exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Contact ID is required' });
  }

  try {
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}