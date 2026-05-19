const express = require("express");

const router = express.Router();

const {

  loginAdmin,

  changePassword,

  updateProfile,

} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/login",
  loginAdmin
);

router.put(

  "/change-password",

  authMiddleware,

  changePassword

);

router.put(

  "/update-profile",

  authMiddleware,

  updateProfile

);

module.exports = router;