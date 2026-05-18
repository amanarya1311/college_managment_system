const Student =
  require("../models/Student");

const Faculty =
  require("../models/Faculty");

const Attendance =
  require("../models/Attendance");

const getDashboardStats =
  async (req, res) => {

    try {

      // STUDENTS

      const totalStudents =
        await Student.countDocuments();

      // FACULTY

      const totalFaculty =
        await Faculty.countDocuments();

      // DEPARTMENTS

      const departments =
        await Student.distinct(
          "department"
        );

      // RECENT STUDENTS

      const recentStudents =
        await Student.find()

          .sort({
            createdAt: -1
          })

          .limit(5);

      // ATTENDANCE

      const attendanceRecords =
        await Attendance.find();

      const presentCount =
        attendanceRecords.filter(

          (r) =>
            r.status ===
            "present"

        ).length;

      const absentCount =
        attendanceRecords.filter(

          (r) =>
            r.status ===
            "absent"

        ).length;

      const lateCount =
        attendanceRecords.filter(

          (r) =>
            r.status ===
            "late"

        ).length;

      const attendancePercentage =

        attendanceRecords.length > 0

          ? Math.round(

              (
                presentCount /

                attendanceRecords.length

              ) * 100

            )

          : 0;

      res.json({

        totalStudents,

        totalFaculty,

        totalDepartments:
          departments.length,

        recentStudents,

        attendance: {

          total:
            attendanceRecords.length,

          present:
            presentCount,

          absent:
            absentCount,

          late:
            lateCount,

          percentage:
            attendancePercentage

        }

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

module.exports = {

  getDashboardStats

};