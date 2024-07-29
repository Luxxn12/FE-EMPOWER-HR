import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/utils/contexts/token";
import useCurrentTime from "@/utils/hooks/useCurrentTime";
import { clockIn, clockOut } from "@/utils/apis/attendance/api";

export default function LiveAttendance() {
  const { formatTime, formatDate } = useCurrentTime();
  const { schedules } = useAuth();
  const [notes, setNotes] = useState("");
  const [coordinates, setCoordinates] = useState({ long: "", lat: "" });
  const schedule = schedules[0];

  useEffect(() => {
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
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClockIn = async () => {
    try {
      const resp = await clockIn({
        clock_in: formatTime(),
        date: formatDate(),
        long: coordinates.long,
        lat: coordinates.lat,
        notes,
      });
      console.log("Clock In response:", resp);
    } catch (error) {
      console.error("Error during clock-in:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      if (schedule) {
        const resp = await clockOut(schedule.id, {
          clock_out: formatTime(),
          status: "on-time",
          date: formatDate(),
          long: coordinates.long,
          lat: coordinates.lat,
        });
        console.log("Clock Out response:", resp);
      } else {
        console.error("No schedule available to clock out.");
      }
    } catch (error) {
      console.error("Error during clock-out:", error);
    }
  };

  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Live attendance</h1>
      <div className="py-8">
        <div className="py-6 border bg-white border-[#D5D5D5] rounded-sm">
          <div className="border-b border-[#D5D5D5]">
            <div className="flex flex-col text-center mb-6">
              <h5 className="text-3xl font-bold">{formatTime()}</h5>
              <time>{formatDate()}</time>
            </div>
          </div>
          <div className="border-[#D5D5D5]">
            <div className="flex flex-col text-center py-6">
              <h5>Schedule, {formatDate()}</h5>
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
            <Button onClick={handleClockIn}>Clock In</Button>
            <Button onClick={handleClockOut}>Clock Out</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
