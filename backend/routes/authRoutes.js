const express = require("express");

const router = express.Router();

const {

  loginAdmin,

  changePassword,

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

module.exports = router;