const Order = require('../models/order');

// Upload payment screenshot
exports.uploadScreenshot = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    order.paymentScreenshot = `/uploads/${req.file.filename}`;
    order.paymentStatus = 'verified';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Screenshot uploaded successfully',
      screenshotPath: order.paymentScreenshot
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};