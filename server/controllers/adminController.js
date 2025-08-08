const Contact = require('../models/Contact');
const BookDemo = require('../models/bookDemo');
const GetInTouch = require('../models/getInTouch');
const Provider = require('../models/provider')
const formResponse = require('../models/Response');
const Order = require('../models/order');
const Response = require('../models/Response');
const Form = require('../models/Form');

// Fetch all contact form submissions
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({createdAt: -1});
        res.json({success: true, count: contacts.length, data: contacts});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failedd to fecth contacts', error: error.message});
    }
};

// Fetch all demo bookings
exports.getAllDemos = async (req, res) => {
    try {
        const Demos = await BookDemo.find().sort({createdAt: -1});
        res.json({success: true, count: Demos.length, data: Demos});
    }
    catch(error) {
        res.status(500).json({success: false, message:'Failed to fetch demo bookings', error: error.message});
    }
}

// Fetch all 'Get In Touch' inquiries
exports.getAllInquiries = async (req, res) => {
    try{
        const Inquiries = await GetInTouch.find().sort({createdAt: -1});
        res.json({success: true, count: Inquiries.length, data: Inquiries});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to fetch inquiries', error: error.message});
    }
}

exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find().sort({createdAt: -1});
        res.status(201).json({success: true, count: providers.length, data: providers});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to fetch providedrs', error: error.message});
    }
}

exports.getResponsesByFormId = async (req, res) => {
  try {
    const { formId } = req.params;
    console.log('Searching for formId:', formId);

    // Find the form by its UUID string to get the ObjectId
    const form = await Form.findOne({ formId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Find responses using the Form's ObjectId
    const responses = await formResponse.find({ formId: form._id });
    res.json(responses);
    console.log(responses);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching responses', error: err.message });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await formResponse.find().sort({createdAt: -1});
    res.status(200).json({success: true, count: responses.length, data: responses});
  }
  catch(error) {
    res.status(500).json({success: false, message: 'Failed to fetch responses', error: error.message})
  }
}

// controllers/responseController.js (add this too)
exports.deleteSingleResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Response.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Response not found' });
    }

    res.status(200).json({ success: true, message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count:orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch providedrs',error: err.message });
  }
};

exports.toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Response.findById(id);
    if (!response) return res.status(404).json({ message: 'Response not found' });

    response.read = !response.read; // toggle
    await response.save();

    res.status(200).json({ message: `Marked as ${response.read ? 'read' : 'unread'}`, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update read status' });
  }
};