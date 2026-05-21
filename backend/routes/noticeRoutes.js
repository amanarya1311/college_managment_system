const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  getNotices,

  addNotice,

  deleteNotice

} = require(
  "../controllers/noticeController"
);


// GET ALL NOTICES

router.get(

  "/",

  authMiddleware,

  getNotices

);


// ADD NOTICE

router.post(

  "/",

  authMiddleware,

  addNotice

);


// DELETE NOTICE

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  deleteNotice

);


module.exports =
  router;