export interface Student {

  _id?: string;

  id?: string;

  name: string;

  lastName?: string;

  rollNo: string;

  email: string;

  phone: string;

  profileImage?: string;

  department: string;

  course: string;

  semester: number;

  enrollmentDate?: string;

  dateOfBirth?: string;

  attendancePercentage?: number;

  createdAt?: string;

  updatedAt?: string;

}

export interface AttendanceRecord {

  _id?: string;

  id?: string;

  studentId: any;

  date: string;

  status:
    | "present"
    | "absent"
    | "late";

  subject?: string;

  session?: string;

  remarks?: string;

}
export interface AttendanceSession {
  _id: string;
  date: string;
  subject: string;
  department?: string;
  semester?: number;
  createdAt: string;
}

export type UserRole = "admin" | "faculty" | "student";

export interface User {

  id?: string;

  email: string;

  name: string;

  role: UserRole;

  department?: string;

  studentId?: string;

  facultyId?: string;

}

export interface Faculty {

  _id?: string;

  id?: string;

  name: string;

  lastName: string;

  email: string;

  phone: string;

  department: string;

  designation: string;

  subject: string;

  dateOfJoining: string;

  password?: string;

}
