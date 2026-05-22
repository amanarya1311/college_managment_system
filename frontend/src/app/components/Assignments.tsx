import {
  useEffect,
  useState
} from "react";

import api from "../lib/axios";

import { Card } from "./ui/card";
import { Button } from "./ui/button";

import {
  Trash2
} from "lucide-react";

import { useAuth }
from "../contexts/AuthContext";

export function Assignments() {

  const { user } =
    useAuth();

  const [assignments,
    setAssignments] =
    useState<any[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [deadline,
    setDeadline] =
    useState("");

    const [file,
  setFile] =
  useState<File | null>(
    null
  );

  const loadAssignments =
    async () => {

      try {

        const response =
          await api.get(
            "/api/assignments"
          );

        setAssignments(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadAssignments();

  }, []);

const handleAddAssignment =
  async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "subject",
        subject
      );

      formData.append(
        "deadline",
        deadline
      );

      if (file) {

        formData.append(
          "file",
          file
        );

      }

      await api.post(

        "/api/assignments",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

      setTitle("");
      setDescription("");
      setSubject("");
      setDeadline("");
      setFile(null);

      loadAssignments();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDeleteAssignment =
    async (id: string) => {

      try {

        await api.delete(
          `/api/assignments/${id}`
        );

        loadAssignments();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">

        Assignments

      </h1>

      {(user?.role === "faculty" ||
        user?.role === "admin") && (

        <Card className="p-6 space-y-4">

          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg h-32"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

<input
  type="file"

  accept=".pdf,.doc,.docx"

  onChange={(e) =>

    setFile(

      e.target.files?.[0] || null

    )

  }

  className="w-full border p-3 rounded-lg"
/>

          <Button
            onClick={
              handleAddAssignment
            }
          >

            Upload Assignment

          </Button>

        </Card>

      )}

      <div className="space-y-4">

        {assignments.map(
          (assignment) => (

            <Card
              key={assignment._id}
              className="p-5 space-y-3"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-xl font-bold">

                    {assignment.title}

                  </h2>

                  <p className="text-sm text-blue-600 mt-1">

                    Subject:
                    {" "}
                    {assignment.subject}

                  </p>

                  <p className="text-xs text-gray-400 mt-1">

                    Deadline:
                    {" "}

                    {new Date(
                      assignment.deadline
                    ).toLocaleDateString()}

                  </p>

                </div>

                {(user?.role ===
                  "faculty" ||

                  user?.role ===
                  "admin") && (

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleDeleteAssignment(
                        assignment._id
                      )
                    }
                  >

                    <Trash2 className="w-4 h-4" />

                  </Button>

                )}

              </div>

              <p className="text-gray-600">

                {assignment.description}
 {assignment.fileUrl && (

  <a

    href={assignment.fileUrl}

    download={
      assignment.originalFileName
    }

    target="_blank"

    rel="noopener noreferrer"

    className="inline-block mt-3 text-blue-600 font-medium hover:underline"

  >

    📄 Download Assignment

  </a>

)}

              </p>

              <p className="text-sm text-gray-400">

                Posted by:
                {" "}
                {assignment.postedBy}

              </p>

            </Card>

          )

        )}

      </div>

    </div>

  );

}