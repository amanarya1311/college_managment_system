const Submission =
  require("../models/Submission");


// GET ALL SUBMISSIONS
// FOR ONE ASSIGNMENT

const getSubmissions =
  async (req, res) => {

    try {

      const submissions =

        await Submission.find({

          assignmentId:
            req.params.assignmentId

        }).sort({

          submittedAt: -1

        });

      res.json(
        submissions
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


// ADD SUBMISSION

const addSubmission =
  async (req, res) => {

    try {

      const submission =

        await Submission.create({

          assignmentId:
            req.body.assignmentId,

          studentId:
            req.user._id,

studentName:
  req.user.name ||
  "Student",

          fileUrl:
            req.file
              ? `/uploads/${req.file.filename}`
              : "",

          originalFileName:
            req.file?.originalname ||
            "submission.pdf",

        });

      res.status(201).json(
        submission
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

const checkSubmission =
  async (req, res) => {

    try {

      const submission =

        await Submission.findOne({

          assignmentId:
            req.params.assignmentId,

studentId:
  req.user._id,

        });

      res.json({

        submitted:
          !!submission

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

module.exports = {

  getSubmissions,

  addSubmission,

  checkSubmission

};