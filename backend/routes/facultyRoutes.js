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

  addFaculty,

  updateFaculty

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


// UPDATE FACULTY

router.put(

  "/:id",

  authMiddleware,

  updateFaculty

);

module.exports =
  router;