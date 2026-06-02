const Student =
  require("../models/Student");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");


// GET ALL STUDENTS

const getStudents =
  async (req, res) => {

    try {

      const students =
        await Student.find();

      res.json(
        students
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// ADD STUDENT

const addStudent =
  async (req, res) => {

    console.log(
      "HASH CONTROLLER ACTIVE"
    );

    try {

const {

  name,

  rollNo,

  email,

  password,

  department,

  course,

  semester

} = req.body;

      const existingStudent =
        await Student.findOne({

          rollNo

        });

      if (
        existingStudent
      ) {

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
        await Student.create({

          name,

          rollNo,

          email,

          password:
            hashedPassword,

          department,

          course,

          semester

        });

      res.status(201).json(
        student
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// UPDATE STUDENT

const updateStudent =
  async (req, res) => {

    try {

      const updatedStudent =

        await Student.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true

          }

        );

      if (
        !updatedStudent
      ) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }

      res.json(
        updatedStudent
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// DELETE STUDENT

const deleteStudent =
  async (req, res) => {

    try {

      const deletedStudent =

        await Student.findByIdAndDelete(

          req.params.id

        );

      if (!deletedStudent) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }

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

  };

// UPDATE STUDENT PROFILE

const updateStudentProfile =
  async (req, res) => {

    try {

      const student =
        await Student.findByIdAndUpdate(

          req.user.id,

          req.body,

          {

            new: true

          }

        );

      res.json({

        user: student

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

// LOGIN STUDENT

const loginStudent =
  async (req, res) => {

    try {

      const {

        rollNo,

        password

      } = req.body;

      const student =
        await Student.findOne({

          rollNo

        });

      if (!student) {

        return res.status(400).json({

          message:
            "Student not found"

        });

      }

      // COMPARE HASHED PASSWORD

      const isMatch =
        await bcrypt.compare(

          password,

          student.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid password"

        });

      }

      const token =
        jwt.sign(

          {

            id: student._id,

            role: "student",

            studentId:
              student._id

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d"

          }

        );

      res.json({

        token,

user: {

  _id:
    student._id,

  name:
    student.name,

  rollNo:
    student.rollNo,

  email:
    student.email,

  role:
    "student",

  studentId:
    student._id,

department:
  student.department,

course:
  student.course,

semester:
  student.semester,

  phone:
    student.phone,

  profileImage:
    student.profileImage

}

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


module.exports = {

  getStudents,

  addStudent,

  updateStudent,

  deleteStudent,

  loginStudent,

  updateStudentProfile

};