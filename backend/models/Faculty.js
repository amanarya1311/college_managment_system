const mongoose =
  require("mongoose");

const facultySchema =
  new mongoose.Schema({

    name: String,

    email: String,

    password: String,

    department: String,

    designation: String,

    phone: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    },

    subject: {
      type: String,
      default: ""
    }

  });

module.exports =
  mongoose.model(
    "Faculty",
    facultySchema
  );