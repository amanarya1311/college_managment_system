const Admin = require("../models/Admin");

const Faculty =
  require("../models/Faculty");

const Student =
  require("../models/Student");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const loginAdmin =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const admin =
        await Admin.findOne({
          email
        });

      if (!admin) {

        return res.status(400).json({

          message:
            "Admin not found",

        });

      }

      const isMatch =
        await bcrypt.compare(

          password,

          admin.password

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

            id:
              admin._id,

            role:
              "admin"

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "7d",

          }

        );

      res.json({

        token,

        admin: {

          _id:
            admin._id,

          email:
            admin.email,

          role:
            "admin",

          name:
            "Buddy"

        },

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

};

const changePassword =
  async (req, res) => {

    try {

      const {

        currentPassword,

        newPassword,

      } = req.body;

      let user;

      // ADMIN

      if (
        req.user.role ===
        "admin"
      ) {

        user =
          await Admin.findById(
            req.user.id
          );

      }

      // FACULTY

      else if (
        req.user.role ===
        "faculty"
      ) {

        user =
          await Faculty.findById(
            req.user.id
          );

      }

      // STUDENT

      else if (
        req.user.role ===
        "student"
      ) {

        user =
          await Student.findById(
            req.user.id
          );

      }

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",

        });

      }

      const isMatch =
        await bcrypt.compare(

          currentPassword,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Current password is incorrect",

        });

      }

      const hashedPassword =
        await bcrypt.hash(

          newPassword,

          10

        );

      user.password =
        hashedPassword;

      await user.save();

      res.json({

        message:
          "Password updated successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

};

module.exports = {

  loginAdmin,

  changePassword,

};