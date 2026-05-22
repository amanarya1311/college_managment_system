const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/upload");

const {

  getAssignments,

  addAssignment,

  deleteAssignment

} = require(
  "../controllers/assignmentController"
);


// GET ALL ASSIGNMENTS

router.get(

  "/",

  authMiddleware,

  getAssignments

);


// ADD ASSIGNMENT

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "faculty",
    "admin"
  ),

  addAssignment

);


// DELETE ASSIGNMENT

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "faculty",
    "admin"
  ),

  deleteAssignment

);


module.exports =
  router;