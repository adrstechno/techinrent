const express = require("express");
const router = express.Router();
const {getAllContacts, getAllDemos, getAllInquiries, getAllProviders, getAllOrders} = require('../controllers/adminController');

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);
router.get("/allproviders", getAllProviders);   
router.get("/allorders", getAllOrders);

module.exports = router;