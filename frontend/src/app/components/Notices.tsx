import {
  useEffect,
  useState
} from "react";

import api from "../lib/axios";

import { Card } from "./ui/card";
import { Button } from "./ui/button";

import { Trash2 } from "lucide-react";

import { useAuth }
from "../contexts/AuthContext";

export function Notices() {

  const { user } =
    useAuth();

  const [notices,
    setNotices] =
    useState<any[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const loadNotices =
    async () => {

      try {

        const response =
          await api.get(
            "/api/notices"
          );

        setNotices(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    loadNotices();

  }, []);

  const handleAddNotice =
    async () => {

      try {

        await api.post(

          "/api/notices",

          {
            title,
            message
          }

        );

        setTitle("");
        setMessage("");

        loadNotices();

      } catch (error) {

        console.log(error);

      }

    };

  const handleDeleteNotice =
    async (id: string) => {

      try {

        await api.delete(
          `/api/notices/${id}`
        );

        loadNotices();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">

        Notices

      </h1>

      {(user?.role === "admin" ||
        user?.role === "faculty") && (

        <Card className="p-6 space-y-4">

          <input

            type="text"

            placeholder="Notice Title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="w-full border p-3 rounded-lg"

          />

          <textarea

            placeholder="Notice Message"

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            className="w-full border p-3 rounded-lg h-32"

          />

          <Button
            onClick={
              handleAddNotice
            }
          >

            Post Notice

          </Button>

        </Card>

      )}

      <div className="space-y-4">

        {notices.map(
          (notice) => (

            <Card
              key={notice._id}
              className="p-5 space-y-3"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-xl font-bold">

                    {notice.title}

                  </h2>

                  <p className="text-xs text-gray-400 mt-1">

                    {new Date(
                      notice.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

{(user?.role ===
  "admin" ||

  user?.role ===
  "faculty") && (

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleDeleteNotice(
                        notice._id
                      )
                    }
                  >

                    <Trash2 className="w-4 h-4" />

                  </Button>

                )}

              </div>

              <p className="text-gray-600">

                {notice.message}

              </p>

              <p className="text-sm text-gray-400">

                Posted by:
                {" "}
                {notice.postedBy}

              </p>

            </Card>

          )

        )}

      </div>

    </div>

  );

}