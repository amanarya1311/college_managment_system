import { useState, useEffect } from "react";
import api from "../lib/axios";

import {
  AttendanceRecord,
  Student,
} from "../types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { toast } from "sonner";

interface EditAttendanceDialogProps {

  record:
    | AttendanceRecord
    | null;

  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  onUpdate: () => void;

}

export function EditAttendanceDialog({

  record,

  open,

  onOpenChange,

  onUpdate,

}: EditAttendanceDialogProps) {

  const [student, setStudent] =
    useState<Student | null>(
      null
    );

  const [formData, setFormData] =
    useState({

      date: "",

      status: "present" as
        | "present"
        | "absent"
        | "late",

      subject: "",

      session: "",

      remarks: "",

    });

  useEffect(() => {

    if (record) {

      if (
        record.studentId &&
        typeof record.studentId ===
          "object"
      ) {

        setStudent(
          record.studentId as unknown as Student
        );

      }

      setFormData({

        date:
          record.date || "",

        status:
          (record.status as
            | "present"
            | "absent"
            | "late") ||
          "present",

        subject:
          record.subject || "",

        session:
          record.session || "",

        remarks:
          record.remarks || "",

      });

    }

  }, [record]);

  const handleSave =
    async () => {

      if (!record?._id)
        return;

      try {

await api.put(

  `/api/attendance/${record._id}`,

  {

    date:
      formData.date,

    status:
      formData.status,

    subject:
      formData.subject,

    session:
      formData.session,

    remarks:
      formData.remarks,

  }

);

        toast.success(
          "Attendance updated successfully"
        );

        onUpdate();

        onOpenChange(
          false
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update attendance"
        );

      }

    };

  const handleDelete =
    async () => {

      if (!record?._id)
        return;

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this attendance record?"
        );

      if (!confirmDelete)
        return;

      try {

await api.delete(

  `/api/attendance/${record._id}`

);

        toast.success(
          "Attendance deleted successfully"
        );

        onUpdate();

        onOpenChange(
          false
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete attendance"
        );

      }

    };

  if (!record)
    return null;

  return (

    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>

          <DialogTitle>
            Edit Attendance Record
          </DialogTitle>

          <DialogDescription>

            {student
              ? `${student.name || "Student"} - ${student.rollNo || "-"}`
              : "Student Details"}

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4 py-4">

          <div className="space-y-2">

            <Label htmlFor="date">
              Date
            </Label>

            <Input
              id="date"
              type="date"
              value={
                formData.date
              }
              onChange={(e) =>
                setFormData({

                  ...formData,

                  date:
                    e.target.value,

                })
              }
            />

          </div>

          <div className="space-y-2">

            <Label htmlFor="status">
              Status
            </Label>

            <Select
              value={
                formData.status
              }
              onValueChange={(
                value
              ) =>
                setFormData({

                  ...formData,

                  status:
                    value as
                      | "present"
                      | "absent"
                      | "late",

                })
              }
            >

              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="present">
                  Present
                </SelectItem>

                <SelectItem value="absent">
                  Absent
                </SelectItem>

                <SelectItem value="late">
                  Late
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="space-y-2">

            <Label htmlFor="subject">
              Subject
            </Label>

            <Input
              id="subject"
              placeholder="e.g., Mathematics"
              value={
                formData.subject
              }
              onChange={(e) =>
                setFormData({

                  ...formData,

                  subject:
                    e.target.value,

                })
              }
            />

          </div>

          <div className="space-y-2">

            <Label htmlFor="session">
              Session
            </Label>

            <Input
              id="session"
              placeholder="e.g., Morning"
              value={
                formData.session
              }
              onChange={(e) =>
                setFormData({

                  ...formData,

                  session:
                    e.target.value,

                })
              }
            />

          </div>

          <div className="space-y-2">

            <Label htmlFor="remarks">
              Remarks
            </Label>

            <Textarea
              id="remarks"
              placeholder="Optional notes"
              value={
                formData.remarks
              }
              onChange={(e) =>
                setFormData({

                  ...formData,

                  remarks:
                    e.target.value,

                })
              }
              rows={3}
            />

          </div>

        </div>

        <DialogFooter className="gap-2">

          <Button
            variant="destructive"
            onClick={
              handleDelete
            }
          >
            Delete
          </Button>

          <div className="flex-1" />

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(
                false
              )
            }
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleSave
            }
          >
            Save Changes
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}