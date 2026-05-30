const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* =======================
   MONGODB CONNECTION
======================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/admissionDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* =======================
   SCHEMA + MODEL
======================= */
const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    course: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);

/* =======================
   GET ALL STUDENTS
======================= */
app.get("/students", async (req, res) => {
  try {
    const data = await Student.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =======================
   ADD STUDENT
======================= */
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added ✅" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =======================
   DELETE STUDENT
======================= */
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ✅" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =======================
   APPROVE STUDENT
======================= */
app.put("/students/:id/approve", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      status: "Approved",
    });
    res.json({ message: "Approved ✅" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =======================
   REJECT STUDENT
======================= */
app.put("/students/:id/reject", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      status: "Rejected",
    });
    res.json({ message: "Rejected ❌" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =======================
   DASHBOARD STATS (🔥 NEW)
======================= */
app.get("/dashboard", async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const approved = await Student.countDocuments({ status: "Approved" });
    const pending = await Student.countDocuments({ status: "Pending" });
    const rejected = await Student.countDocuments({ status: "Rejected" });

    res.json({
      total,
      approved,
      pending,
      rejected,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// server.js or routes/admin.js

let admin = {
  name: "Admin",
  password: "1234",
};

// GET admin
app.get("/admin", (req, res) => {
  res.json(admin);
});

// UPDATE admin
app.put("/admin", (req, res) => {
  const { name, password } = req.body;

  admin.name = name;
  admin.password = password;

  res.json({ message: "Admin updated" });
});
/* =======================
   SERVER
======================= */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});