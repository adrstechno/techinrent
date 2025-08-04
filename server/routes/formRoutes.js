const express = require("express");
const router = express.Router();
const { getFormByToken, submitForm } = require("../controllers/formController");

router.get("/form/:token", getFormByToken);
router.post("/form/:token", submitForm);

module.exports = router;
