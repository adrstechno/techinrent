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
            additionalInfo
        })
        await newProvider.save();

        res.status(201).json({success: true, data: newProvider, message: 'Data sent successfully'})

    }
    catch(error){
        res.status(500).json({success: false, message: 'failed to send Info', error: error.message})
    }
}


exports.deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findByIdAndDelete(id);

        if (!provider) {
            return res.status(404).json({ success: false, message: 'Provider not found' });
        }

        res.status(200).json({ success: true, message: 'Provider deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete provider', error: error.message });
    }
}