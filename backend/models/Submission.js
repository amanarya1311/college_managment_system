const mongoose =
  require("mongoose");

const submissionSchema =
  new mongoose.Schema(

    {

      assignmentId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Assignment",

        required:
          true

      },

      studentId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Student",

        required:
          true

      },

      studentName: {

        type: String,

        required:
          true

      },

      fileUrl: {

        type: String,

        required:
          true

      },

      originalFileName: {

        type: String,

        required:
          true

      },

      submittedAt: {

        type: Date,

        default:
          Date.now

      }

    }

  );

module.exports =
  mongoose.model(

    "Submission",

    submissionSchema

  );