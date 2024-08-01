import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/utils/contexts/token";
import {
  clockIn,
  clockOut,
  getUserAttendance,
} from "@/utils/apis/attendance/api";
import { toast } from "sonner";

export default function LiveAttendance() {
  const { schedules } = useAuth();
  const [notes, setNotes] = useState("");
  const [coordinates, setCoordinates] = useState({ long: "", lat: "" });
  const schedule = schedules[0];
  const [isActive, setIsActive] = useState(() => {
    const savedValue = localStorage.getItem("isActive");
    return savedValue !== null ? JSON.parse(savedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [isActive]);

  const handleActivate = () => {
    setIsActive(true);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  const now = new Date();
  const formattedDate = [
    now.getFullYear(),
    (now.getMonth() + 1).toString().padStart(2, "0"),
    now.getDate().toString().padStart(2, "0"),
  ].join("-");
  const formattedTime = [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
  ].join(":");

  const [attendanceIdToUse, setAttendanceIdToUse] = useState<number | null>(
    null
  );

  const fetchUserAttendance = async () => {
    try {
      const resp = await getUserAttendance();
      const lastIndex = resp.data.length - 1;
      if (lastIndex >= 0) {
        const lastItemId = resp.data[lastIndex].id;
        setAttendanceIdToUse(lastItemId);
      } else {
        setAttendanceIdToUse(null);
        toast.error("Empty id to use");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserAttendance();
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            long: position.coords.longitude.toFixed(6),
            lat: position.coords.latitude.toFixed(6),
          });
        },
        (error: any) => {
          toast.error(error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClockIn = async () => {
    if (!isActive) {
      toast.error("Already clocked in or inactive.");
      return;
    }

    try {
      const resp = await clockIn({
        clock_in: formattedTime,
        date: formattedDate,
        long: coordinates.long,
        lat: coordinates.lat,
        notes,
      });
      toast.success(resp.message);
      handleDeactivate();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleClockOut = async () => {
    if (isActive) {
      toast.error("You need to clock in first.");
      return;
    }

    try {
      if (schedule) {
        const resp = await clockOut(attendanceIdToUse!, {
          clock_out: formattedTime,
          status: "on-time",
          date: formattedDate,
          long: coordinates.long,
          lat: coordinates.lat,
        });
        toast.success(resp.message);
        handleActivate();
      } else {
        toast.error("No schedule available to clock out.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <MainLayout
      title="Empower HR - Attendance"
      description="Empower HR - Live Attendance"
    >
      <h1 className="text-2xl font-bold">Live attendance</h1>
      <div className="py-8">
        <div className="py-6 border bg-white border-[#D5D5D5] rounded-sm">
          <div className="border-b border-[#D5D5D5]">
            <div className="flex flex-col text-center mb-6">
              <h5 className="text-lg font-semibold">Live Attendance</h5>
            </div>
          </div>
          <div className="border-[#D5D5D5]">
            <div className="flex flex-col text-center py-6">
              <h5>Schedule, {formattedDate}</h5>
              <p className="text-3xl font-bold mt-2">
                {schedule
                  ? `${schedule.schedule_in} - ${schedule.schedule_out}`
                  : "No schedule available"}
              </p>
            </div>
          </div>
          <div className="lg:px-8 py-2 px-4">
            <text className="font-medium">Notes (optional)</text>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="lg:px-8 px-4 py-5 grid grid-cols-2 gap-5">
            <Button
              onClick={handleClockIn}
              disabled={!isActive}
            >
              Clock In
            </Button>
            <Button
              onClick={handleClockOut}
              disabled={isActive}
            >
              Clock Out
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
