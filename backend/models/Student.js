const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

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

  department: {
    type: String,
    required: true
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

module.exports = mongoose.model(
  "Student",
  studentSchema
);