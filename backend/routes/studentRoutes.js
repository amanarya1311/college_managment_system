const express =
  require("express");

const router =
  express.Router();

const Student =
  require("../models/Student");

const Attendance =
  require("../models/Attendance");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  loginStudent,

  getStudents,

  addStudent,

  updateStudent,

  deleteStudent,

  updateStudentProfile

} = require(
  "../controllers/studentController"
);


// STUDENT LOGIN

router.post(

  "/login",

  loginStudent

);

// GET STUDENT ATTENDANCE

router.get(

  "/attendance/:studentId",

  authMiddleware,

  roleMiddleware(
    "student",
    "admin",
    "faculty"
  ),

  async (req, res) => {

    try {

      const records =
        await Attendance.find({

          studentId:
            req.params.studentId

        });

      res.json(
        records
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// GET STUDENT ATTENDANCE

// GET SINGLE STUDENT

router.get(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const student =

        await Student.findById(
          req.params.id
        );

      if (!student) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }

      res.json(student);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// GET ALL STUDENTS

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  getStudents

);


// ADD STUDENT

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  addStudent

);


// UPDATE STUDENT

router.put(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  updateStudent

);


// DELETE STUDENT

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  deleteStudent

);

// UPDATE STUDENT PROFILE

router.put(

  "/profile",

  async (req, res) => {

    try {

      const updatedStudent =

        await Student.findByIdAndUpdate(

          req.body.studentId,

          req.body,

          {

            new: true

          }

        );

      res.json(updatedStudent);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

module.exports =
  router;