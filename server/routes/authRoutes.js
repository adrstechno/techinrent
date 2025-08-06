const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, verifyToken } = require('../controllers/authControler');

// Auth routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/verify', verifyToken); 

module.exports = router;
