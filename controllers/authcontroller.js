const mongoose = require("mongoose"); // ✅ ADD THIS

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  contact: String,
  education: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Student", studentSchema);