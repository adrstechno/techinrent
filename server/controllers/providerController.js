const Provider = require('../models/provider');

exports.providerInfo = async (req, res) => {
    try {
        const {fullName, email, phone, linkedIn, verification, additionalInfo} = req.body;

        if(!fullName || !email|| !phone || !linkedIn || !verification) {
            return res.status(400).json({error: 'All fields are to be filled'})
        }

        const newProvider = new Provider({
            fullName,
            email,
            phone,
            linkedIn,
            verification,
            additinalInfo
        })
        await newProvider.save();

        res.status(201).json({success: true, data: newProvider, message: 'Data sent successfully'})

    }
    catch(error){
        res.status(500).json({success: false, message: 'failed to send Info', error: error.message})
    }
}