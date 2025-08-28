const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getAllDemos,
  getAllInquiries,
  deleteSingleResponse,
  getResponsesByFormId,
  getAllProviders,
  getAllOrders,
  toggleReadStatus,
  getAllResponses,
  deleteSingleForm
} = require("../controllers/adminController");

const {getAllForms} = require("../controllers/formController");

// Admin endpoints
router.get("/contacts", getAllContacts);
router.get("/demos", getAllDemos);
router.get("/inquiries", getAllInquiries);
router.get("/providers", getAllProviders);
router.get("/responses/:formId", getResponsesByFormId);
router.delete("/responses/:responseId", deleteSingleResponse);
router.get("/orders", getAllOrders);
router.put("/responses/:responseId/read", toggleReadStatus);
router.get("/all-responses", getAllResponses);
router.delete("/forms/:formId", deleteSingleForm);
router.get("/forms", getAllForms);

module.exports = router;
