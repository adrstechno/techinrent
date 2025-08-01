const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        }

        const existingAdmin = await Admin.findOne({email});
        if(existiingAdmin) {
            return res.status(400).json({message: 'Admin already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        })
        await newAdmin.save();
        res.status(201).json({success: true, message: 'Admin registered seccessfully'})
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Server error'});
    }

}

exports.loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        }

        const existingAdmin = await Admin.findOne({email});
        if(!existingAdmin) {
            return res.status(400).json({message: 'Admin does not exist'})
        }

        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Invalid credentials'})
        }
        const token = jwt.sign({id: existingAdmin._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    }
    catch(error) {

    }
}