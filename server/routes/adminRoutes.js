const express = require("express");
const router = express.Router();
const {getAllContacts, getAllDemos, getAllInquiries, deleteResponsesByForm, getResponsesByForm , getAllProviders, getAllOrders} = require('../controllers/adminController');

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);

module.exports = router;