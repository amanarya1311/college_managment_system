const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  loginFaculty,

  addFaculty

} = require(
  "../controllers/facultyController"
);


// LOGIN FACULTY

router.post(

  "/login",

  loginFaculty

);


// ADD FACULTY

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin"
  ),

  addFaculty

);

module.exports =
  router;