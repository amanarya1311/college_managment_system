const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/upload");

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

  "/profile",

  authMiddleware,

  updateProfile

);

router.post(

  "/upload-profile",

  authMiddleware,

  upload.single(
    "profileImage"
  ),

  (req, res) => {

    console.log(req.file);

    res.json({

imageUrl:
  req.file.path
  
    });

  }

);

module.exports = router;