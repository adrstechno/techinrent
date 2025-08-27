const express = require("express");
const router = express.Router();
const { createForm, } = require("../controllers/formController");

router.post("/create", createForm); // POST /api/forms/create

module.exports = router;
