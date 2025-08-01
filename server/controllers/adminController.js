const Contact = require('../models/Contact');
const BookDemo = require('../models/bookDemo');
const GetInTouch = require('../models/getInTouch');

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