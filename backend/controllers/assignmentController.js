const Assignment =
  require("../models/Assignment");


// GET ALL ASSIGNMENTS

const getAssignments =
  async (req, res) => {

    try {

      const assignments =

        await Assignment.find()
          .sort({

            createdAt: -1

          });

      res.json(
        assignments
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// ADD ASSIGNMENT

const addAssignment =
  async (req, res) => {

    try {

      const {

        title,

        description,

        subject,

        deadline

      } = req.body;

      const assignment =

        await Assignment.create({

          title,

          description,

          subject,

          deadline,

          fileUrl:
            req.file
              ? req.file.path
              : "",

          postedBy:
            req.user.role

        });

      res.status(201).json(
        assignment
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// DELETE ASSIGNMENT

const deleteAssignment =
  async (req, res) => {

    try {

      const deletedAssignment =

        await Assignment.findByIdAndDelete(

          req.params.id

        );

      if (!deletedAssignment) {

        return res.status(404).json({

          message:
            "Assignment not found"

        });

      }

      res.json({

        message:
          "Assignment deleted successfully"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


module.exports = {

  getAssignments,

  addAssignment,

  deleteAssignment

};