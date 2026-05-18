const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  status: {
    type: String,
    enum: ["present", "absent", "late"],
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
  },

  session: {
    type: String,
  },

});

module.exports =

  mongoose.models.Attendance ||

  mongoose.model(

    "Attendance",

    attendanceSchema

  );
