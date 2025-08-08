const express = require('express');
const router = express.Router();
const { providerInfo,deleteProvider } = require('../controllers/providerController');

router.post('/', providerInfo);
router.delete('/delete/:id', deleteProvider); 


module.exports = router;