const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  getDashboardStats

} = require(

  "../controllers/dashboardController"

);

router.get(

  "/stats",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  getDashboardStats

);

module.exports =
  router;