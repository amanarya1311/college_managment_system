require("dotenv").config();

const noticeRoutes =
  require("./routes/noticeRoutes");

const studentManagementRoutes =
require("./routes/studentManagementRoutes");

const express =
  require("express");

const cors =
  require("cors");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const facultyRoutes =
  require("./routes/facultyRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

const facultyManagementRoutes =
  require(
    "./routes/facultyManagementRoutes"
  );

connectDB();

const app = express();

app.use(

  cors({

    origin: true,

    credentials: true

  })

);

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    "uploads"
  )
);

app.use(

  "/api/notices",

  noticeRoutes

);

// AUTH

app.use(
  "/api/auth",
  authRoutes
);

// FACULTY LOGIN

app.use(
  "/api/faculty",
  facultyRoutes
);

// FACULTY MANAGEMENT

app.use(

  "/api/faculty-management",

  facultyManagementRoutes

);

app.use(
  "/api/students",
  studentManagementRoutes
);

// STUDENT ROUTES

app.use(

  "/api/student",

  studentRoutes

);

// ATTENDANCE

app.use(

  "/api/attendance",

  attendanceRoutes

);

// DASHBOARD

app.use(

  "/api/dashboard",

  dashboardRoutes

);

app.get("/", (req, res) => {

  res.send(
    "Backend Running"
  );

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server running on ${PORT}`

  );

});