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
} = require("../controllers/adminController");

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

module.exports = router;
