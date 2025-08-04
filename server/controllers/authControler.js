const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        console.log(req.body); // Debugging line to check the request body
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existingAdmin = await Admin.findOne({ userName });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            userName, // fix: using userName instead of undefined 'email'
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ success: true, message: 'Admin registered successfully' });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existingAdmin = await Admin.findOne({ userName });
        if (!existingAdmin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: existingAdmin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: existingAdmin._id,
                userName: existingAdmin.userName,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
