const BookDemo = require('../models/bookDemo');
exports.bookDemo = async (req, res) => {
    try{
        const {firstName, lastName, email, phone, companyName, jobtitle} = req.body;

        if( !firstName || !lastName || !email || !phone || !companyName || !jobtitle ){
            return res.status(400).json({error: 'Please fill out all the fields.'});
        }

        const newBooking = new BookDemo({ firstName, lastName, email, phone, companyName, jobtitle });
        await newBooking.save();

        res.status(201).json({success: true, data: newBooking, message: 'Demo booking request submitted successfully!'});
    }
    catch (error){
        res.status(500).json({success: false, message: 'Internal server error. Please try again later'});
        console.error('Error booking demo: ', error);
    }
}