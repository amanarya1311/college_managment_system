const mongoose =
  require("mongoose");

const facultySchema =
  new mongoose.Schema({

    name: String,

    email: String,

    password: String,

    department: String,

    designation: String,

    phone: String

  });

module.exports =
  mongoose.model(
    "Faculty",
    facultySchema
  );