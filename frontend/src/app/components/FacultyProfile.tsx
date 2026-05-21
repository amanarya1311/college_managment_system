import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap
} from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import api from "../lib/axios";
import { useAuth } from "../contexts/AuthContext";

export function FacultyProfile() {

  const { user } = useAuth();

  const [faculty, setFaculty] =
    useState<any>(null);

  const [selectedImage,
    setSelectedImage] =
    useState<File | null>(null);

  const [editMode,
    setEditMode] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      phone: "",

      department: "",

      designation: "",

    });

  const loadFacultyData =
    async () => {

      try {

        const updatedUser =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"

          );

        setFaculty(
          updatedUser
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadFacultyData();

  }, []);

  if (!faculty) {

    return (

      <div className="p-8">

        <div className="text-center">

          <p className="text-gray-500">

            Faculty not found

          </p>

          {user?.role === "admin" && (

            <Link to="/faculties">

              <Button className="mt-4">

                Back to Faculties

              </Button>

            </Link>

          )}

        </div>

      </div>

    );

  }

  return (

    <div className="p-4 sm:p-6 lg:p-8">

      {user?.role === "admin" && (

        <Link

          to="/faculties"

          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"

        >

          <ArrowLeft className="w-4 h-4" />

          Back to Faculties

        </Link>

      )}

 <div className="w-full flex justify-center items-start py-8">

<Card className="p-6 w-full max-w-md shadow-lg rounded-2xl">

          <div className="text-center">

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-4">

              <img

src={

  faculty?.profileImage

    ? faculty.profileImage

    : "/logo.png"

}

                alt="Profile"

                className="w-full h-full object-cover"

              />

            </div>

            <h2 className="text-2xl font-bold text-gray-900">

              {faculty.name}

            </h2>

            <p className="text-gray-500 mt-1">

              {faculty.email}

            </p>

            <div className="mt-4">

              <Button

                className="w-full mt-3"

                variant="outline"

                onClick={() => {

                  setEditMode(true);

                  setFormData({

                    name:
                      faculty?.name || "",

                    phone:
                      faculty?.phone || "",

                    department:
                      faculty?.department || "",

                    designation:
                      faculty?.designation || "",

                  });

                }}

              >

                Edit Profile

              </Button>

            </div>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 text-sm">

                <Mail className="w-4 h-4 text-gray-400" />

                <span className="text-gray-700">

                  {faculty.email}

                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <Phone className="w-4 h-4 text-gray-400" />

                <span className="text-gray-700">

                  {faculty.phone || "-"}

                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <GraduationCap className="w-4 h-4 text-gray-400" />

                <span className="text-gray-700">

                  {faculty.department}

                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <GraduationCap className="w-4 h-4 text-gray-400" />

                <span className="text-gray-700">

                  {faculty.designation}

                </span>

              </div>

            </div>

          </div>

        </Card>

      </div>

      {editMode && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-2xl font-bold">

              Edit Profile

            </h2>

            <input

              type="text"

              placeholder="Name"

              value={formData.name}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  name: e.target.value

                })

              }

              className="w-full border p-3 rounded-lg"

            />

            <input

              type="text"

              placeholder="Phone"

              value={formData.phone}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  phone: e.target.value

                })

              }

              className="w-full border p-3 rounded-lg"

            />

            <input

              type="text"

              placeholder="Department"

              value={formData.department}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  department: e.target.value

                })

              }

              className="w-full border p-3 rounded-lg"

            />

            <input

              type="text"

              placeholder="Designation"

              value={formData.designation}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  designation: e.target.value

                })

              }

              className="w-full border p-3 rounded-lg"

            />

            <input

              type="file"

              accept="image/*"

              onChange={(e) => {

                if (
                  e.target.files?.[0]
                ) {

                  setSelectedImage(
                    e.target.files[0]
                  );

                }

              }}

              className="w-full border p-3 rounded-lg"

            />

            <div className="flex gap-3">

              <Button

                className="w-full"

                onClick={async () => {

                  try {

                    let imageUrl =
                      faculty?.profileImage || "";

                    if (selectedImage) {

                      const imageData =
                        new FormData();

                      imageData.append(
                        "profileImage",
                        selectedImage
                      );

                      const uploadResponse =
                        await api.post(

                          "/api/auth/upload-profile",

                          imageData,

                          {

                            headers: {

                              "Content-Type":
                                "multipart/form-data",

                            },

                          }

                        );

                      imageUrl =
                        uploadResponse.data.imageUrl;

                    }

const response =
  await api.put(

    `/api/faculty/${faculty._id}`,

    {

      ...formData,

      profileImage:
        imageUrl

    }

  );

                    const existingUser =
                      JSON.parse(

                        localStorage.getItem(
                          "user"
                        ) || "{}"

                      );

const updatedUser = {

  ...existingUser,

  ...response.data,

  profileImage:
    imageUrl

};

localStorage.setItem(

  "user",

  JSON.stringify(
    updatedUser
  )

);

setFaculty(
  updatedUser
);

                    setEditMode(false);

} catch (error) {

  console.log(error);

  setEditMode(false);

}

                }}

              >

                Save

              </Button>

              <Button

                variant="outline"

                className="w-full"

                onClick={() =>
                  setEditMode(false)
                }

              >

                Cancel

              </Button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}