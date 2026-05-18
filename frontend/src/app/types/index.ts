export interface Student {

  _id?: string;

  id?: string;

  name: string;

  rollNo: string;

  email: string;

  department: string;

  semester: number;

  attendancePercentage?: number;

  createdAt?: string;

  updatedAt?: string;

}

export interface AttendanceRecord {

  _id?: string;

  id?: string;

  studentId: Student | string;

  date: string;

  status: "present" | "absent" | "late";

  subject?: string;

  session?: string;

  remarks?: string;

}

export interface AttendanceSession {

  _id?: string;

  id?: string;

  date: string;

  subject: string;

  sessionName: string;

  department: string;

  semester: number;

}