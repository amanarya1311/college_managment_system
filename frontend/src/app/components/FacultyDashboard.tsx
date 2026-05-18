import {
  Users,
  CheckCircle,
  XCircle,
  BookOpen
} from "lucide-react";

import { Card } from "./ui/card";

import { useAuth }
from "../contexts/AuthContext";

export function FacultyDashboard() {

  const { user } =
    useAuth();

  return (

    <div className="p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">

          Faculty Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome back,
          {user?.name}

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">

                Department

              </p>

              <h2 className="text-2xl font-bold mt-1">

                {user?.department}

              </h2>

            </div>

            <Users className="w-10 h-10 text-blue-600" />

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">

                Subject

              </p>

              <h2 className="text-2xl font-bold mt-1">

                {user?.subject}

              </h2>

            </div>

            <BookOpen className="w-10 h-10 text-green-600" />

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">

                Present Today

              </p>

              <h2 className="text-2xl font-bold mt-1">

                42

              </h2>

            </div>

            <CheckCircle className="w-10 h-10 text-emerald-600" />

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">

                Absent Today

              </p>

              <h2 className="text-2xl font-bold mt-1">

                5

              </h2>

            </div>

            <XCircle className="w-10 h-10 text-red-600" />

          </div>

        </Card>

      </div>

    </div>

  );

}