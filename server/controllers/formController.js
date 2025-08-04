const FormLink = require('../models/formLink');

exports.getFormByToken = async (req, res) => {
    const { token } = req.params;

    try {
        const formLink = await FormLink.findOne({ token });
        if(!formLink) {
            return res.status(404).json({messaage: 'Form link not found'})
        }
        if(formLink.isUsed) {
            return res.status(400).json({message: 'Form link has laready been used'})
        }

        res.json({success: true, formLink, message: 'Form link retrieved successfully'});

    }
    catch(error) {
        
    }
}