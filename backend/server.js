require("dotenv").config();

const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const noticeRoutes = require("./routes/noticeRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const studentManagementRoutes = require("./routes/studentManagementRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyManagementRoutes = require(
  "./routes/facultyManagementRoutes"
);

connectDB();

const app = express();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Uploads folder created");
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(uploadDir)
);

app.use("/api/notices", noticeRoutes);

app.use("/api/assignments", assignmentRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/faculty", facultyRoutes);

app.use(
  "/api/faculty-management",
  facultyManagementRoutes
);

app.use(
  "/api/students",
  studentManagementRoutes
);

app.use(
  "/api/student",
  studentRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Test route for debugging uploaded files
app.get("/test-upload/:file", (req, res) => {
  const filePath = path.join(
    uploadDir,
    req.params.file
  );

  if (fs.existsSync(filePath)) {
    return res.send("File Exists");
  }

  return res.status(404).send("File Not Found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});