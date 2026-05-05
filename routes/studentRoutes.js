const express = require("express");
const router = express.Router(); // ✅ IMPORTANT (you missed this)

const Student = require("../models/Student");

// ➤ ADD STUDENT
router.post("/", async (req, res) => {
  try {
    const { name, course } = req.body;

    const student = new Student({
      name,
      course,
      status: "pending",
    });

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ APPROVE STUDENT ✅
router.put("/approve/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ❌ Reject Student
router.put("/reject/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ DELETE STUDENT ❌
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;