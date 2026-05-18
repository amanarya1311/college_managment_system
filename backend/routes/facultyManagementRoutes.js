const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  getFaculty,

  addFaculty,

  updateFaculty,

  deleteFaculty

} = require(

  "../controllers/facultyManagementController"

);

// GET ALL FACULTY

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin"
  ),

  getFaculty

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

  roleMiddleware(
    "admin"
  ),

  updateFaculty

);

// DELETE FACULTY

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin"
  ),

  deleteFaculty

);

module.exports =
  router;