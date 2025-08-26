


const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { package, cost, fullname, email, phone, linkedin, additionalNotes, paymentMethod, paymentStatus } = req.body;
 // Check if an order with this email already exists
    const existingOrder = await Order.findOne({ "customer.email": email });
    if (existingOrder) {
      return res.status(400).json({ 
        success: false,
        error: "An order with this email already exists." 
      });
    }

    const order = new Order({
      package,
      cost,
      customer: { fullname, email, phone },
      linkedin,
      additionalNotes,
      paymentMethod,
      paymentStatus: paymentStatus || 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: order._id,
      order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}


//delete order by ID
exports.deleteOrder = async (req, res) => { 
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
