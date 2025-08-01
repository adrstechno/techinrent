const express = require("express");
const router = express.Router();
const { submitInquiry } = require("../controllers/getInTouchController");

router.post("/", submitInquiry);

module.exports = router;
