// const Order = require("../models/order");

// // @desc Submit a new order
// // @route POST /api/orders
// // @access Public
// exports.submitOrder = async (req, res) => {
//     try {
//         const { package, cost, fullname, email, phone, linkedin, additionalNotes, paymentMethod } = req.body;

//         // Validate required fields
//         if (!package || !cost || !fullname || !email || !phone || !linkedin || !paymentMethod) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Create new order
//         const newOrder = new Order({
//             package,
//             cost,
//             fullname,
//             email,
//             phone,
//             linkedin,
//             additionalNotes,
//             paymentMethod
//         });

//         await newOrder.save();
//         res.status(201).json({ success: true, message: "Order submitted successfully." });
//     } catch (error) {
//         res.status(500).json({ error: "Server error: " + error.message });
//     }
// };

// // @desc Get all orders
// // @route GET /api/orders
// // @access Public/Admin
// exports.getOrder = async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ createdAt: -1 }); // latest first
//         res.status(200).json({ success: true, data: orders });
//     } catch (error) {
//         res.status(500).json({ error: "Server error: " + error.message });
//     }
// };




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