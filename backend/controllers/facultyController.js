const bcrypt =
  require("bcryptjs");

const Faculty =
  require("../models/Faculty");

const jwt =
  require("jsonwebtoken");


// LOGIN FACULTY

const loginFaculty =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const faculty =
        await Faculty.findOne({
          email
        });

      if (!faculty) {

        return res.status(400).json({

          message:
            "Faculty not found",

        });

      }

      // Compare hashed password

      const isMatch =
        await bcrypt.compare(

          password,

          faculty.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid password",

        });

      }

      const token =
        jwt.sign(

          {
            id: faculty._id,

            role: "faculty"
          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d",

          }

        );

      res.json({

        token,

user: {

  _id:
    faculty._id,

  name:
    faculty.name,

  email:
    faculty.email,

  role:
    "faculty",

  department:
    faculty.department,

  designation:
    faculty.designation,

  phone:
    faculty.phone,

profileImage:
  faculty.profileImage,

subject:
  faculty.subject,

},

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

};


// ADD FACULTY

const addFaculty =
  async (req, res) => {

    try {

const {
  name,
  lastName,
  email,
  password,
  department,
  designation,
  subject,
  phone
} = req.body;

      const existingFaculty =
        await Faculty.findOne({

          email

        });

      if (existingFaculty) {

        return res.status(400).json({

          message:
            "Faculty already exists"

        });

      }

      // Hash password

      const hashedPassword =
        await bcrypt.hash(

          password,

          10

        );

const faculty =
  await Faculty.create({

    name:
      `${name} ${lastName}`,

    email,

    password:
      hashedPassword,

    department,

    designation,

    subject,

    phone

  });

      res.status(201).json(
        faculty
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  };

  // UPDATE FACULTY

const updateFaculty =
  async (req, res) => {

    try {

const {

  name,
  phone,
  department,
  designation,
  subject,
  profileImage

} = req.body;

      const updatedFaculty =
        await Faculty.findByIdAndUpdate(

          req.params.id,

          {

            name,
            phone,
            department,
            designation,
            subject,
            profileImage

          },

          {
            new: true
          }

        );

      if (!updatedFaculty) {

        return res.status(404).json({

          message:
            "Faculty not found"

        });

      }

      res.json(
        updatedFaculty
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

module.exports = {

  loginFaculty,

  addFaculty,

  updateFaculty

};