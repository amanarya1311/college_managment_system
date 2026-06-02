import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  Calendar,
  Save,
  Check,
  X,
  Clock,
} from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Student } from "../types";
import { toast } from "sonner";

export function Attendance() {

  const { user } = useAuth();

  const [students, setStudents] =
    useState<Student[]>([]);

  const [filteredStudents, setFilteredStudents] =
    useState<Student[]>([]);

  const [selectedDepartment, setSelectedDepartment] =
    useState("all");

  const [selectedSemester, setSelectedSemester] =
    useState("all");

    const [selectedCourse, setSelectedCourse] =
  useState("all");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [subject, setSubject] =
    useState("");

  const [session, setSession] =
    useState("");

  const [attendanceStatus, setAttendanceStatus] =
    useState<
      Record<
        string,
        "present" | "absent" | "late"
      >
    >({});

  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents = async () => {

    try {

const token =
  localStorage.getItem(
    "token"
  );

const response =
  await api.get(

    "/api/students",

    {

      headers: {

        Authorization:
          `Bearer ${token}`

      }

    }

  );

      const allStudents =
        response.data;

      setStudents(allStudents);

      const initialStatus:
        Record<
          string,
          "present" | "absent" | "late"
        > = {};

      allStudents.forEach(
        (student: Student) => {

          if (student._id) {

            initialStatus[
              student._id
            ] = "present";

          }

        }
      );

      setAttendanceStatus(
        initialStatus
      );

    } catch (error) {

      console.log(error);

    }

  };

useEffect(() => {

  let filtered = students;

  if (
    selectedDepartment !== "all"
  ) {

    filtered = filtered.filter(
      (s) =>
        s.department ===
        selectedDepartment
    );

  }

  if (
    selectedSemester !== "all"
  ) {

    filtered = filtered.filter(
      (s) =>
        s.semester.toString() ===
        selectedSemester
    );

  }

  if (
    selectedCourse !== "all"
  ) {

    filtered = filtered.filter(
      (s) =>
        s.course ===
        selectedCourse
    );

  }

  // Faculty restriction

  if (
    user?.role ===
    "faculty"
  ) {

    filtered = filtered.filter(
      (s) =>
        s.department ===
        user.department
    );

  }

  setFilteredStudents(
    filtered
  );

}, [
  students,
  selectedDepartment,
  selectedSemester,
  selectedCourse,
  user
]);

  const departments =
    Array.from(
      new Set(
        students.map(
          (s) => s.department
        )
      )
    );

  const semesters =
    Array.from(
      new Set(
        students.map(
          (s) => s.semester
        )
      )
    ).sort();

    const courses =
  Array.from(
    new Set(
      students
        .map((s) => s.course)
        .filter(Boolean)
    )
  );

  const handleStatusChange = (
    studentId: string,
    status:
      | "present"
      | "absent"
      | "late"
  ) => {

    setAttendanceStatus(
      (prev) => ({

        ...prev,

        [studentId]:
          status,

      })
    );

  };

  const handleMarkAll = (
    status:
      | "present"
      | "absent"
      | "late"
  ) => {

    const newStatus:
      Record<
        string,
        "present" | "absent" | "late"
      > = {};

    filteredStudents.forEach(
      (student) => {

        if (student._id) {

          newStatus[
            student._id
          ] = status;

        }

      }
    );

    setAttendanceStatus(
      (prev) => ({

        ...prev,

        ...newStatus,

      })
    );

  };

  const handleSave = async () => {

    try {

      for (
        const student of
        filteredStudents
      ) {

        if (!student._id)
          continue;

const token =
  localStorage.getItem(
    "token"
  );

const data = {

  studentId:
    student._id,

  date,

  subject,

  session,

  status:
    attendanceStatus[
      student._id
    ],

};
await api.post(

  "/api/attendance",

  data,

  {

    headers: {

      Authorization:
        `Bearer ${token}`

    }

  }

);

      }

      toast.success(
        "Attendance saved successfully!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save attendance"
      );

    }

  };

  const presentCount =
    filteredStudents.filter(
      (s) =>
        s._id &&
        attendanceStatus[
          s._id
        ] === "present"
    ).length;

  const absentCount =
    filteredStudents.filter(
      (s) =>
        s._id &&
        attendanceStatus[
          s._id
        ] === "absent"
    ).length;

  const lateCount =
    filteredStudents.filter(
      (s) =>
        s._id &&
        attendanceStatus[
          s._id
        ] === "late"
    ).length;

 return (

  <div className="p-4 sm:p-6 lg:p-8">

    <div className="mb-6 sm:mb-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Mark Attendance
      </h1>

      <p className="text-sm sm:text-base text-gray-500 mt-1">
        Record student attendance for the session
      </p>

    </div>

    {/* Filters */}

    <Card className="p-6 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div>

          <Label>
            Department
          </Label>

          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >

            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Departments
              </SelectItem>

              {departments.map(
                (dept) => (

                  <SelectItem
                    key={dept}
                    value={dept}
                  >

                    {dept}

                  </SelectItem>

                )
              )}

            </SelectContent>

          </Select>

        </div>

        <div>

  <Label>
    Course
  </Label>

  <Select
    value={selectedCourse}
    onValueChange={setSelectedCourse}
  >

    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>

    <SelectContent>

      <SelectItem value="all">
        All Courses
      </SelectItem>

      {courses.map(
        (course) => (

          <SelectItem
            key={course}
            value={course}
          >

            {course}

          </SelectItem>

        )
      )}

    </SelectContent>

  </Select>

</div>

        <div>

          <Label>
            Semester
          </Label>

          <Select
            value={selectedSemester}
            onValueChange={setSelectedSemester}
          >

            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Semesters
              </SelectItem>

              {semesters.map(
                (sem) => (

                  <SelectItem
                    key={sem}
                    value={String(sem)}
                  >

                    Semester {sem}

                  </SelectItem>

                )
              )}

            </SelectContent>

          </Select>

        </div>

        <div>

          <Label>
            Subject
          </Label>

          <Input
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            placeholder="Enter subject"
          />

        </div>

        <div>

          <Label>
            Session
          </Label>

          <Input
            value={session}
            onChange={(e) =>
              setSession(
                e.target.value
              )
            }
            placeholder="Morning"
          />

        </div>

      </div>

    </Card>

    {/* Stats */}

    <div className="grid grid-cols-3 gap-4 mb-6">

      <Card className="p-4 text-center">

        <p className="text-green-600 font-bold text-2xl">
          {presentCount}
        </p>

        <p className="text-sm text-gray-500">
          Present
        </p>

      </Card>

      <Card className="p-4 text-center">

        <p className="text-red-600 font-bold text-2xl">
          {absentCount}
        </p>

        <p className="text-sm text-gray-500">
          Absent
        </p>

      </Card>

      <Card className="p-4 text-center">

        <p className="text-yellow-600 font-bold text-2xl">
          {lateCount}
        </p>

        <p className="text-sm text-gray-500">
          Late
        </p>

      </Card>

    </div>

    {/* Student List */}

    <Card className="p-6">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold">
          Students
        </h2>

        <Button
          onClick={handleSave}
        >

          <Save className="w-4 h-4 mr-2" />

          Save Attendance

        </Button>

      </div>

      <div className="space-y-4">

        {filteredStudents.map(
          (student) => (

            <div
              key={student._id}
              className="flex items-center justify-between border rounded-lg p-4"
            >

              <div>

                <p className="font-semibold">
                  {student.name}
                </p>

                <p className="text-sm text-gray-500">
                  {student.rollNo}
                </p>

              </div>

              <div className="flex gap-2 flex-wrap">

  <Button
    variant={
      attendanceStatus[
        student._id || ""
      ] === "present"
        ? "default"
        : "outline"
    }
    onClick={() =>
      handleStatusChange(
        student._id || "",
        "present"
      )
    }
    className="min-w-[90px]"
  >

    Present

  </Button>

  <Button
    variant={
      attendanceStatus[
        student._id || ""
      ] === "absent"
        ? "destructive"
        : "outline"
    }
    onClick={() =>
      handleStatusChange(
        student._id || "",
        "absent"
      )
    }
    className="min-w-[90px]"
  >

    Absent

  </Button>

<Button
  variant={
    attendanceStatus[
      student._id || ""
    ] === "late"
      ? "secondary"
      : "outline"
  }
  onClick={() =>
    handleStatusChange(
      student._id || "",
      "late"
    )
  }
  className="
    min-w-[90px]
    hover:bg-violet-100
    hover:text-violet-700
    hover:border-violet-300
  "
>

  Late

</Button>

</div>

            </div>

          )
        )}

      </div>

    </Card>

  </div>

);

}