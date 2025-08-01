const GetInTouch = require("../models/getInTouch");

const submitInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newInquiry = new GetInTouch({ name, email, subject, message });
    await newInquiry.save();

    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = { submitInquiry };
