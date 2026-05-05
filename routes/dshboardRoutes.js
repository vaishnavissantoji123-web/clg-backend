const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Course = require("../models/Course");

// 📊 Dashboard Stats
router.get("/", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const approved = await Student.countDocuments({ status: "approved" });
    const pending = await Student.countDocuments({ status: "pending" });
    const rejected = await Student.countDocuments({ status: "rejected" });

    // recent students
    const recentStudents = await Student.find().sort({ _id: -1 }).limit(5);

    res.json({
      totalStudents,
      totalCourses,
      approved,
      pending,
      rejected,
      recentStudents,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;