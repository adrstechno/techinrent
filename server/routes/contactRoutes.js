const express = require('express');
const router = express.Router();
const {submitContact, deleteContact} = require('../controllers/contactController')

router.post('/', submitContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;