// const express = require("express");
// const router = express.Router();
// const { submitOrder, getOrder  } = require("../controllers/orderController");

// router.post("/",submitOrder );
// router.get("/getorder", getOrder);

// module.exports = router;



const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Order routes
router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);
router.post('/:orderId/upload', upload.single('screenshot'), uploadController.uploadScreenshot);
router.delete('delete/:orderId', orderController.deleteOrder);

module.exports = router;