const Faculty =
  require("../models/Faculty");

const bcrypt =
  require("bcryptjs");

// GET ALL FACULTY

const getFaculty =
  async (req, res) => {

    try {

      const faculty =
        await Faculty.find();

      console.log(faculty);

      res.json(faculty);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};
// ADD FACULTY

const addFaculty =
  async (req, res) => {

    try {

      const {

        name,

        email,

        password,

        department,

        designation,

        phone

      } = req.body;

      const existingFaculty =
        await Faculty.findOne({

          email

        });

      if (
        existingFaculty
      ) {

        return res.status(400).json({

          message:
            "Faculty already exists"

        });

      }

      const hashedPassword =

        await bcrypt.hash(
          password,
          10
        );

      const faculty =
        await Faculty.create({

          name,

          email,

          password:
            hashedPassword,

          department,

          designation,

          phone,

          role:
            "faculty"

        });

      res.status(201).json(
        faculty
      );

    } catch (error) {

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

      const updatedFaculty =

        await Faculty.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true

          }

        );

      if (
        !updatedFaculty
      ) {

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

// DELETE FACULTY

const deleteFaculty =
  async (req, res) => {

    try {

      const deletedFaculty =

        await Faculty.findByIdAndDelete(

          req.params.id

        );

      if (
        !deletedFaculty
      ) {

        return res.status(404).json({

          message:
            "Faculty not found"

        });

      }

      res.json({

        message:
          "Faculty deleted successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

module.exports = {

  getFaculty,

  addFaculty,

  updateFaculty,

  deleteFaculty

};