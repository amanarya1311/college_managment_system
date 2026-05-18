import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import {
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";

import { Card } from "./ui/card";
import { Student } from "../types";

export function Dashboard() {
  
  const [stats, setStats] = useState({
  totalStudents: 0,
  totalDepartments: 0,
  totalAttendance: 0,
  presentCount: 0,
  absentCount: 0,
  lateCount: 0,
});

const [deptStats, setDeptStats] = useState<
  Array<{ department: string; count: number }>
>([]);

  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  useEffect(() => {

  loadDashboardData();

}, []);

const loadDashboardData =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(

          "http://localhost:5000/api/dashboard/stats",

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      const data =
        response.data;

      setStats({

        totalStudents:
          data.totalStudents,

        totalDepartments:
          data.totalDepartments,

        totalAttendance:
          data.attendance.total,

        presentCount:
          data.attendance.present,

        absentCount:
          data.attendance.absent,

        lateCount:
          data.attendance.late,

      });

      const departments =
        data.recentStudents.reduce(

          (
            acc: any,

            student: Student

          ) => {

            const existing =
              acc.find(
                (d: any) =>

                  d.department ===
                  student.department
              );

            if (existing) {

              existing.count += 1;

            } else {

              acc.push({

                department:
                  student.department,

                count: 1,

              });

            }

            return acc;

          },

          []

        );

      setDeptStats(
        departments
      );

      setRecentStudents(
        data.recentStudents
      );

    } catch (error) {

      console.log(error);

    }

  };
  
const statCards = [

  {
    title: "Total Students",
    value: stats.totalStudents,
    icon: Users,
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },

  {
    title: "Departments",
    value: stats.totalDepartments,
    icon: UserCheck,
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },

  {
    title: "Present",
    value: stats.presentCount,
    icon: Calendar,
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },

  {
    title: "Absent",
    value: stats.absentCount,
    icon: Clock,
    textColor: "text-red-700",
    bgColor: "bg-red-50",
  },

];
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Welcome to Alta School of Technology Portal</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Department Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Department Distribution
          </h2>
          <div className="space-y-4">
            {deptStats.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                  <span className="text-sm text-gray-500">{dept.count} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(dept.count / stats.totalStudents) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">

  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

    <Calendar className="w-5 h-5" />

    Recent Students

  </h2>

  <div className="space-y-3">

    {recentStudents.length > 0 ? (

      recentStudents.map((student) => (

        <div
          key={student._id}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >

          <div>

            <p className="font-medium text-gray-900">

              {student.name}

            </p>

            <p className="text-sm text-gray-500">

              {student.rollNo}

            </p>

          </div>

          <span
            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
          >

            {student.department}

          </span>

        </div>

      ))

    ) : (

      <p className="text-gray-500 text-center py-4">

        No students found

      </p>

    )}

  </div>

</Card>
</div>
      
      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link to="/attendance" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Mark Attendance</h3>
                <p className="text-sm text-gray-500">Record today's attendance</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/students" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Manage Students</h3>
                <p className="text-sm text-gray-500">View and edit student records</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link to="/reports" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">View Reports</h3>
                <p className="text-sm text-gray-500">Analyze attendance data</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
