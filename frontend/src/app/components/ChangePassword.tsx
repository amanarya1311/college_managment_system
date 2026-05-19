import { useState } from "react";

import api from "../lib/axios";

export function ChangePassword() {

  const [formData, setFormData] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e: React.FormEvent) => {

      e.preventDefault();

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {

        setMessage(
          "Passwords do not match"
        );

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.put(

            "/api/auth/change-password",

            {

              currentPassword:
                formData.currentPassword,

              newPassword:
                formData.newPassword,

            },

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        setMessage(
          response.data.message
        );

        setFormData({

          currentPassword: "",

          newPassword: "",

          confirmPassword: "",

        });

      } catch (error: any) {

        setMessage(

          error.response?.data?.message ||

          "Something went wrong"

        );

      }

  };

  return (

    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">

        Change Password

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="password"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              currentPassword:
                e.target.value
            })
          }
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              newPassword:
                e.target.value
            })
          }
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword:
                e.target.value
            })
          }
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >

          Update Password

        </button>

      </form>

      {message && (

        <p className="mt-4 text-center text-sm">

          {message}

        </p>

      )}

    </div>

  );

}