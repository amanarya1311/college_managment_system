import { FacultyDashboard }
from "./components/FacultyDashboard";
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { FacultyLayout } from "./components/FacultyLayout";
import { StudentLayout } from "./components/StudentLayout";

import { Login } from "./components/Login";

import { Dashboard } from "./components/Dashboard";
import { StudentDashboard } from "./components/StudentDashboard";

import { Students } from "./components/Students";
import { FacultyManagement } from "./components/FacultyManagement";
import { StudentProfile } from "./components/StudentProfile";
import { Attendance } from "./components/Attendance";
import { Reports } from "./components/Reports";

import { ProtectedRoute } from "./components/ProtectedRoute";

function getCurrentUser() {

  const user =
    localStorage.getItem(
      "user"
    );

  if (
    !user ||
    user === "undefined"
  ) {

    return null;

  }

  try {

    return JSON.parse(
      user
    );

  } catch {

    return null;

  }

}

function RoleBasedLayout() {

  const user =
    getCurrentUser();

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  switch (user.role) {

    case "admin":
      return <Layout />;

    case "faculty":
      return (
        <FacultyLayout />
      );

    case "student":
      return (
        <StudentLayout />
      );

    default:
      return (
        <Navigate
          to="/login"
          replace
        />
      );

  }

}

function RoleBasedDashboard() {

  const user =
    getCurrentUser();

  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }

  if (
    user.role ===
    "student"
  ) {

    return (
      <StudentDashboard />
    );

  }

  if (
    user.role ===
    "faculty"
  ) {

    return (
      <FacultyDashboard />
    );

  }

  return (
    <Dashboard />
  );

}

export const router =
  createBrowserRouter([

    {

      path: "/login",

      element: <Login />,

    },

    {

      path: "/",

      element:
        <RoleBasedLayout />,

      children: [

        {

          index: true,

          element:
            <RoleBasedDashboard />,

        },

        {
  path: "students",

  element: (

    <ProtectedRoute
      allowedRoles={[
        "admin",
        "faculty",
      ]}
    >

      <Students />

    </ProtectedRoute>

  ),

},

       {
  path:
    "students/:id",

  element: (

    <ProtectedRoute
      allowedRoles={[
        "admin",
        "faculty",
      ]}
    >

      <StudentProfile />

    </ProtectedRoute>

  ),

},

        {

          path: "faculty",

          element: (

            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >

              <FacultyManagement />

            </ProtectedRoute>

          ),

        },

        {

          path:
            "attendance",

          element: (

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "faculty",
              ]}
            >

              <Attendance />

            </ProtectedRoute>

          ),

        },

        {

          path:
            "reports",

          element: (

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "faculty",
              ]}
            >

              <Reports />

            </ProtectedRoute>

          ),

        },

        {

          path: "profile",

          element: (

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "faculty",
                "student",
              ]}
            >

              <StudentProfile />

            </ProtectedRoute>

          ),

        },

      ],

    },

    {

      path: "*",

      element: (

        <Navigate
          to="/"
          replace
        />

      ),

    },

  ]);