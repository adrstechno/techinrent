const BookDemo = require("../models/bookDemo");
exports.bookDemo = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, companyName, jobtitle } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !companyName ||
      !jobtitle
    ) {
      return res.status(400).json({ error: "Please fill out all the fields." });
    }

    const newBooking = new BookDemo({
      firstName,
      lastName,
      email,
      phone,
      companyName,
      jobtitle,
    });
    await newBooking.save();

    res.status(201).json({
      success: true,
      data: newBooking,
      message: "Demo booking request submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later",
    });
    console.error("Error booking demo: ", error);
  }
};

// Delete a demo booking
exports.deleteDemo = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deleted = await BookDemo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Demo request not found" });
    }

    res.status(200).json({ message: "Demo request deleted successfully" });
  } catch (error) {
    console.error("Error deleting demo request:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
