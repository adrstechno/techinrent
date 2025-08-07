const express = require('express');
const router = express.Router();
const {
  submitResponse,
} = require('../controllers/responseController');


router.post('/:formId/responses', submitResponse);        // POST /api/forms/:formId/responses

module.exports = router;
