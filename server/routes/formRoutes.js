const express = require("express");
const router = express.Router();
const { createForm, getAllForms } = require("../controllers/formController");

router.post("/create", createForm); // POST /api/forms/create
router.get("/", getAllForms); // GET /api/forms

module.exports = router;
