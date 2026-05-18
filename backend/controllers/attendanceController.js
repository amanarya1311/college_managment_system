const Attendance =
require("../models/Attendance");

const Student =
require("../models/Student");

const markAttendance = async (req, res) => {

  try {

    const attendance =
      await Attendance.create(
        req.body
      );

    // Total attendance count

    const totalAttendance =

      await Attendance.countDocuments({

        studentId:
          req.body.studentId

      });

    // Present attendance count

    const presentAttendance =

      await Attendance.countDocuments({

        studentId:
          req.body.studentId,

        status: "present"

      });

    // Attendance percentage calculation

    const attendancePercentage =

      totalAttendance > 0

        ? (
            presentAttendance /
            totalAttendance
          ) * 100

        : 0;

    // Update student attendance percentage

    await Student.findByIdAndUpdate(

      req.body.studentId,

      {

        attendancePercentage:
          attendancePercentage

      }

    );

    res.status(201).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const getAttendance = async (req, res) => {

  try {

    const records =
      await Attendance.find()
        .populate("studentId");

    res.json(records);

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const updateAttendance = async (req, res) => {

  try {

    const updatedAttendance =

      await Attendance.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(
      updatedAttendance
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

const deleteAttendance = async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "Attendance deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

module.exports = {

  markAttendance,

  getAttendance,

  updateAttendance,

  deleteAttendance,

};