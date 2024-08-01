import MainLayout from "@/components/layouts/main-layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { getAttendanceById } from "@/utils/apis/attendance/api";
import { useParams } from "react-router-dom";
import { IAttendance } from "@/utils/apis/attendance/type";
import { useAuth } from "@/utils/contexts/token";
import { toast } from "sonner";

export default function DetailAttendance() {
  const [attendance, setAttendance] = useState<IAttendance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);

  const { schedules } = useAuth();
  const { id } = useParams();

  const attendanceToUse =
    Array.isArray(attendance) && attendance.length > 0 ? attendance[0] : null;

  const center: LatLngTuple = [
    -6.2690335997433655 ?? 0,
    106.80731123390241 ?? 0,
  ];
  const zoom = 13;

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const resp = await getAttendanceById(Number(id!));
      setAttendance(resp.data);
      const updatedAttendanceToUse =
        Array.isArray(resp.data) && resp.data.length > 0 ? resp.data[0] : null;

      console.log(updatedAttendanceToUse);

      await fetchAddress(-6.2690335997433655, 106.80731123390241);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAddress(data.display_name);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold mb-4">Detail Attendance</h1>
      {loading && <>Loading</>}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>{address ? address : "Fetching address..."}</Popup>
        </Marker>
      </MapContainer>

      <div className="flex flex-col xl:py-4 py-2">
        {attendance ? (
          <>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Clock in time</p>
              <p className="mt-1">{attendanceToUse.clock_in}</p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Clock out time</p>
              <p className="mt-1">{attendanceToUse.clock_out}</p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Shift</p>
              <p className="mt-1">
                {schedules[0]?.schedule_in} - {schedules[0]?.schedule_out}
              </p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Address</p>
              <p className="mt-1">{address || "Fetching address..."}</p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Location GPS name</p>
              <p className="mt-1">PT Mekar Sentosa</p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="font-bold">Note</p>
              <p className="mt-1 xl:w-7/12">{attendanceToUse.notes}</p>
            </div>
          </>
        ) : (
          <>Not found data</>
        )}
      </div>
    </MainLayout>
  );
}
