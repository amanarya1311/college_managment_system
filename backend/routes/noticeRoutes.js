const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {

  getNotices,

  addNotice

} = require(
  "../controllers/noticeController"
);


// GET ALL

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

module.exports =
  router;