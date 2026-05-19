const Admin = require("../models/Admin");

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

    console.log("Change password API hit");

    try {

      const {

        currentPassword,

        newPassword,

      } = req.body;

      const admin =
        await Admin.findById(
          req.user.id
        );

      if (!admin) {

        return res.status(404).json({

          message:
            "User not found",

        });

      }

      const isMatch =
        await bcrypt.compare(

          currentPassword,

          admin.password

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

      admin.password =
        hashedPassword;

      await admin.save();

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