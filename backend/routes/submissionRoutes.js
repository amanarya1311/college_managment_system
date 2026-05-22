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

  getSubmissions,

  addSubmission,

  checkSubmission

} = require(
  "../controllers/submissionController"
);


// GET SUBMISSIONS
// FOR ASSIGNMENT

router.get(

  "/:assignmentId",

  authMiddleware,

  roleMiddleware(
    "faculty",
    "admin"
  ),

  getSubmissions

);


// ADD SUBMISSION

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "student"
  ),

  upload.single(
    "file"
  ),

  addSubmission

);

router.get(

  "/check/:assignmentId",

  authMiddleware,

  roleMiddleware(
    "student"
  ),

  checkSubmission

);

module.exports =
  router;