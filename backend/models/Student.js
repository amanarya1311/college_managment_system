const mongoose = require("mongoose");

const studentSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true
    },

    rollNo: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    profileImage: {
  type: String,
  default: ""
},

department: {
  type: String,
  required: true
},

course: {
  type: String,
  required: true,
  enum: [
    "PGDCA",
    "MCA",
    "B.Tech",
    "M.Tech",
    "PhD",
    "M.Tech + PhD"
  ]
},

semester: {
  type: Number,
  required: true
},
    attendancePercentage: {
      type: Number,
      default: 0
    }

  }, {
    timestamps: true
  });

module.exports =
  mongoose.model(
    "Student",
    studentSchema
  );