import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

import { GraduationCap, LogIn } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] =
  useState("admin");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError("");

    try {

let apiUrl =
  "/api/auth/login";

let requestBody: any = {

  email,

  password

};

// Faculty login

if (
  role ===
  "faculty"
) {

  apiUrl =
    "/api/faculty/login";

}

// Student login

// Student login

if (
  role ===
  "student"
) {

  apiUrl =
    "/api/student/login";

  requestBody = {

    rollNo: email,

    password

  };

}

const response =
  await api.post(

    apiUrl,

    requestBody

  );

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(

  "user",

  JSON.stringify(

    response.data.user ||
    response.data.admin

  )

);

login(
  response.data.user ||
  response.data.admin
);
      navigate("/");

    } catch (error: any) {

      setError(
        error.response?.data?.message || "Login Failed"
      );

    }

  };

  const quickLogin = (role: "admin" | "faculty" | "student") => {

    let email = "";
    let password = "";

    switch (role) {

      case "admin":
        email = "buddy@gmail.com";
        password = "123456";
        break;

      case "faculty":
        email = "faculty@gmail.com";
        password = "123456";
        break;

      case "student":
        email = "250509020014";
        password = "";
        break;

    }

setEmail(email);

setPassword(password);

setRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <Card className="w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-8">

<div className="w-24 h-24 mb-3 flex items-center justify-center">

  <img
    src="/logo.png"
    alt="CSIT Logo"
    className="max-w-full max-h-full object-contain"
  />

</div>

          <h1 className="text-3xl font-bold text-gray-900">
            MJPRU Campus
          </h1>

          <p className="text-gray-600">
            Smart Academic Management System
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

<Label htmlFor="email">

  {
    role === "student"
      ? "Roll Number"
      : "Email"
  }

</Label>

           <Input

  type={
    role === "student"
      ? "text"
      : "email"
  }

  placeholder={
    role === "student"
      ? "Enter Roll Number"
      : "Enter Email"
  }

  value={email}

  onChange={(e) =>
    setEmail(e.target.value)
  }

/>

          </div>

          <div>

            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />

          </div>
          <div>

  <Label>
    Login As
  </Label>

  <select

    value={role}

    onChange={(e) =>
      setRole(e.target.value)
    }

    className="w-full mt-1 border rounded-lg p-2"

  >

    <option value="admin">
      Admin
    </option>

    <option value="faculty">
      Faculty
    </option>

    <option value="student">
      Student
    </option>

  </select>

</div>

          {error && (

            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>

          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
          >

            <LogIn className="w-4 h-4 mr-2" />

            Sign In

          </Button>

        </form>

      </Card>

    </div>
  );

}