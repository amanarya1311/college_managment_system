const bcrypt =
require("bcryptjs");

const express =
require("express");

const router =
express.Router();

const Student =
require("../models/Student");

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");


// GET all students

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  async (req, res) => {

    try {

      const students =
        await Student.find();

      res.json(students);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// GET single student

router.get(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

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


// CREATE student

router.post(

  "/",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  async (req, res) => {

    try {

      const {

        name,

        rollNo,

        email,

        password,

        department,

        semester

      } = req.body;

      const existingStudent =
        await Student.findOne({

          rollNo

        });

      if (existingStudent) {

        return res.status(400).json({

          message:
            "Student already exists"

        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(

          password,

          10

        );

      const student =
        new Student({

          name,

          rollNo,

          email,

          password:
            hashedPassword,

          department,

          semester

        });

      const savedStudent =
        await student.save();

      res.status(201).json(
        savedStudent
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// UPDATE student

router.put(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  async (req, res) => {

    try {

      const updatedStudent =

        await Student.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.json(
        updatedStudent
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);


// DELETE student

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware(
    "admin",
    "faculty"
  ),

  async (req, res) => {

    try {

      await Student.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Student deleted successfully"

      });

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