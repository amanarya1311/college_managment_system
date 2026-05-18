const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const express =
  require("express");

const router =
  express.Router();

const {

  markAttendance,

  getAttendance,

  updateAttendance,

  deleteAttendance,

} = require(
  "../controllers/attendanceController"
);

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  getAttendance

);

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  markAttendance

);

router.put(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  updateAttendance

);

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin"
  ),

  deleteAttendance

);

module.exports =
  router;