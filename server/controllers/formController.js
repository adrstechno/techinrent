const FormLink = require("../models/FormLink");

exports.getFormByToken = async (req, res) => {
  const { token } = req.params;
  try {
    const formLink = await FormLink.findOne({ token });

    if (!formLink) return res.status(404).json({ message: "Invalid link" });
    if (formLink.isUsed) return res.status(403).json({ message: "Form already submitted" });

    res.json({ message: "Form valid" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.submitForm = async (req, res) => {
  const { token } = req.params;
  const formData = req.body;

  try {
    const formLink = await FormLink.findOne({ token });

    if (!formLink) return res.status(404).json({ message: "Invalid link" });
    if (formLink.isUsed) return res.status(403).json({ message: "Form already submitted" });

    formLink.isUsed = true;
    formLink.submittedData = formData;

    await formLink.save();

    res.json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFormSubmission = async (req, res) => {
  const { token } = req.params;

  try {
    const formLink = await FormLink.findOne({ token });
    if (!formLink) return res.status(404).json({ message: "Invalid link" });
    if (!formLink.isUsed) return res.status(403).json({ message: "Form not submitted yet" });

    res.json({ submittedData: formLink.submittedData });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}