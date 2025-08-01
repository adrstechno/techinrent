const express = require('express');
const router = express.Router();
const { providerInfo } = require('../controllers/providerController');

router.post('/', providerInfo);

module.exports = router;