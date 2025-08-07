const express = require("express");
const router = express.Router();
const {getAllContacts, getAllDemos, getAllInquiries, deleteResponsesByForm, getResponsesByForm } = require('../controllers/adminController');

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);
router.delete("/responses/:formId", deleteResponsesByForm); // DELETE /api/admin/responses/:formId
router.get("/providers", getAllProviders); // GET /api/admin/providers
router.get("/responses/:formId", getResponsesByForm); // GET /api/admin/responses/:formId

module.exports = router;