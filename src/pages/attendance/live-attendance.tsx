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
  const [attendanceIdToUse, setAttendanceIdToUse] = useState<number | null>(
    null
  );

  const formattedDate = new Date()
    .toLocaleDateString("en-GB")
    .split("/")
    .join("-");

  const formattedTime = new Date()
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(":")
    .join(":");

  const fetchUserAttendance = async () => {
    try {
      const resp = await getUserAttendance();

      const today = new Date()
        .toLocaleDateString("en-GB", {
          timeZone: "Asia/Jakarta",
        })
        .split("/")
        .reverse()
        .join("-");

      const lastTodayRecord = resp.data
        .filter((record: any) => {
          return record.date.startsWith(today) && !record.clock_out;
        })
        .slice(-1)[0];

      if (lastTodayRecord) {
        setAttendanceIdToUse(lastTodayRecord.id);
      } else {
        setAttendanceIdToUse(null);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          toast.error(error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchUserAttendance();
    getLocation();
  }, []);

  const handleClockIn = async () => {
    if (attendanceIdToUse !== null) {
      toast.error("Already clocked in.");
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
      fetchUserAttendance();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClockOut = async () => {
    if (attendanceIdToUse === null) {
      toast.error("You need to clock in first.");
      return;
    }

    try {
      if (schedule) {
        const resp = await clockOut(attendanceIdToUse!, {
          clock_out: formattedTime,
          status: "success",
          date: formattedDate,
          long: coordinates.long,
          lat: coordinates.lat,
        });
        toast.success(resp.message);
        setAttendanceIdToUse(null);
      } else {
        toast.error("No schedule available to clock out.");
      }
    } catch (error: any) {
      toast.error(error.message);
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
            <h5 className="font-medium">Notes (optional)</h5>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              data-testid="notes"
            />
          </div>
          <div className="lg:px-8 px-4 py-5 grid grid-cols-2 gap-5">
            <Button
              onClick={handleClockIn}
              disabled={attendanceIdToUse !== null}
              data-testid="clockInButton"
            >
              Clock In
            </Button>
            <Button
              onClick={handleClockOut}
              disabled={attendanceIdToUse === null}
              data-testid="clockOutButton"
            >
              Clock Out
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
