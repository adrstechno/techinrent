const express = require('express');
const router = express.Router();
const { bookDemo , deleteDemo} = require('../controllers/bookDemoController');

router.post('/', bookDemo);
router.delete('/delete/:id', deleteDemo);


module.exports = router;