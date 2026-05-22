const mongoose =
  require("mongoose");

const assignmentSchema =
  new mongoose.Schema(

    {

      title: {

        type: String,

        required: true

      },

      description: {

        type: String,

        required: true

      },

      subject: {

        type: String,

        required: true

      },

      deadline: {

        type: Date,

        required: true

      },

      fileUrl: {

        type: String

      },

      originalFileName: {

        type: String,

        default:
          "assignment.pdf"

      },

      postedBy: {

        type: String

      }

    },

    {

      timestamps: true

    }

  );

module.exports =
  mongoose.model(
    "Assignment",
    assignmentSchema
  );