const express = require("express");
const router = express.Router();
const {getAllContacts, getAllDemos, getAllInquiries, deleteResponsesByForm, getResponsesByFormId , getAllProviders, getAllOrders} = require('../controllers/adminController');

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);
router.get("/providers", getAllProviders);
router.get("/responses/:formId", getResponsesByFormId);
router.delete("/responses/:formId", deleteResponsesByForm);
router.get("/orders", getAllOrders);

module.exports = router;