const express = require("express");
const router = express.Router();
const {getAllContacts, getAllDemos, getAllInquiries} = require('../controllers/adminController');
const authMiddleware = require("../middleware/auth")

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);


router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the admin dashboard', user: req.user });
});

module.exports = router;