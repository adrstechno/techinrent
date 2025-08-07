const express = require('express');
const router = express.Router();
const { bookDemo } = require('../controllers/bookDemoController');

router.post('/', bookDemo);

module.exports = router;