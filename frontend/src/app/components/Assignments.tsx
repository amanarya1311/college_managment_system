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

  const [submissionFile,
  setSubmissionFile] =
  useState<File | null>(
    null
  );

  const [submissions,
  setSubmissions] =
  useState<any>({});

  const [submissionStatus,
  setSubmissionStatus] =
  useState<any>({});

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


useEffect(() => {

  if (

    user?.role ===
    "student"

  ) {

    assignments.forEach(

      (assignment) => {

        checkSubmissionStatus(

          assignment._id

        );

      }

    );

  }

}, [

  assignments,

  user

]);

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

  const handleSubmission =
  async (
    assignmentId: string
  ) => {

    try {

      if (!submissionFile) {

        alert(
          "Please select a file"
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "assignmentId",
        assignmentId
      );

      formData.append(
        "file",
        submissionFile
      );

      await api.post(

        "/api/submissions",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data"

          }

        }

      );

      alert(
        "Assignment submitted successfully"
      );

      setSubmissionFile(
        null
      );

    } catch (error) {

      console.log(error);

    }

  };

const checkSubmissionStatus =
  async (
    assignmentId: string
  ) => {

    try {

      const response =
        await api.get(

          `/api/submissions/check/${assignmentId}`

        );

      setSubmissionStatus(

        (prev: any) => ({

          ...prev,

          [assignmentId]:
            response.data.submitted

        })

      );

    } catch (error) {

      console.log(error);

    }

  };

  const loadSubmissions =
  async (
    assignmentId: string
  ) => {

    try {

      const response =
        await api.get(

          `/api/submissions/${assignmentId}`

        );

      setSubmissions(

        (prev: any) => ({

          ...prev,

          [assignmentId]:
            response.data

        })

      );

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

</p>

{assignment.fileUrl && (

  <a

    href={`https://college-managment-system-l5bx.onrender.com${assignment.fileUrl}`}

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

{user?.role ===
  "student" && (

  <div className="pt-3">

    {submissionStatus[
      assignment._id
    ] ? (

      <span className="text-green-600 font-medium">

        ✅ Submitted

      </span>

    ) : (

      <span className="text-red-500 font-medium">

        ❌ Not Submitted

      </span>

    )}

  </div>

)}
              
{user?.role ===
  "student" && (

  <div className="space-y-3 pt-3">

    <input

      type="file"

      accept=".pdf,.doc,.docx"

      onChange={(e) =>

        setSubmissionFile(

          e.target.files?.[0] || null

        )

      }

      className="w-full border p-2 rounded-lg"

    />

    <Button

      onClick={() =>

        handleSubmission(
          assignment._id
        )

      }

    >

      Submit Assignment

    </Button>

  </div>

)}
{(user?.role ===
  "faculty" ||

  user?.role ===
  "admin") && (

  <div className="pt-4">

    <Button

      variant="outline"

      onClick={() =>

        loadSubmissions(
          assignment._id
        )

      }

    >

      View Submissions

    </Button>

    {submissions[
      assignment._id
    ] && (

      <div className="mt-4 space-y-3">

        {submissions[
          assignment._id
        ].map(
          (
            submission: any
          ) => (

            <div

              key={
                submission._id
              }

              className="border rounded-lg p-3"

            >

              <p className="font-medium">

                {
                  submission.studentName
                }

              </p>

              <a

                href={`https://college-managment-system-l5bx.onrender.com${submission.fileUrl}`}

                download={
                  submission.originalFileName
                }

                target="_blank"

                rel="noopener noreferrer"

                className="text-blue-600 hover:underline text-sm"

              >

                📄 Download Submission

              </a>

            </div>

          )

        )}

      </div>

    )}

  </div>

)}

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