const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const orderController = require('../controllers/orderController');
const uploadController = require('../controllers/uploadController');

// ✅ Middleware to ensure uploads folder exists
const ensureUploadsFolder = (req, res, next) => {
  const uploadPath = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  next();
};

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);
router.post(
  '/:orderId/upload',
  ensureUploadsFolder,
  upload.single('screenshot'),
  uploadController.uploadScreenshot
);
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
