import { DatePicker } from "@/components/date-picker";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAttendance } from "@/utils/apis/attendance/api";
import { ISchedule } from "@/utils/apis/schedule/type";
import { DownloadIcon, Ellipsis, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IAttendance } from "@/utils/apis/attendance/type";
import { useAuth } from "@/utils/contexts/token";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Attendance() {
  const { schedules } = useAuth();
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const navigate = useNavigate();

  const fetchAttendance = async () => {
    try {
      const resp = await getAttendance();
      const attendanceData = resp.data || [];
      setAttendance(attendanceData);
      setCurrentPage(resp.meta?.[0]?.currentPage || 1);
      setTotalPages(resp.meta?.[0]?.totalPages || 1);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleDateChange = (date: Date | undefined) => setSelectedDate(date);
  const handlePageChange = (page: number) => setCurrentPage(page);

  const categorizeAttendance = (
    attendance: IAttendance[],
    schedule: ISchedule[]
  ) => {
    if (schedule.length === 0)
      return { onTime: 0, lateClockIn: 0, absent: 0, noClockOut: 0 };

    const scheduleInTime = parseTime(schedule[0].schedule_in);
    const scheduleOutTime = parseTime(schedule[0].schedule_out);

    return attendance.reduce(
      (acc, item) => {
        const clockInTime = parseTime(item.clock_in);
        const clockOutTime = parseTime(item.clock_out);

        if (!item.clock_in) {
          acc.absent += 1;
        } else if (
          scheduleInTime !== null &&
          clockInTime !== null &&
          clockInTime > scheduleInTime
        ) {
          acc.lateClockIn += 1;
        } else if (scheduleOutTime !== null && !clockOutTime) {
          acc.noClockOut += 1;
        } else if (
          clockOutTime !== null &&
          scheduleOutTime !== null &&
          clockOutTime < scheduleOutTime
        ) {
          acc.noClockOut += 1;
        } else {
          acc.onTime += 1;
        }

        return acc;
      },
      { onTime: 0, lateClockIn: 0, absent: 0, noClockOut: 0 }
    );
  };

  const parseTime = (time: string | null): Date | null => {
    if (!time) return null;
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  };

  const { onTime, lateClockIn, absent, noClockOut } = categorizeAttendance(
    attendance,
    schedules
  );

  const generateAllAttendancePdf = () => {
    const doc = new jsPDF();

    const tableBody = attendance.map((item) => [
      item.employementData && item.employementData[0]
        ? item.employementData[0].name
        : "N/A",
      item.employementData && item.employementData[0]
        ? item.employementData[0].id_personal
        : "N/A",
      item.date,
      item.clock_in || "N/A",
      item.clock_out || "N/A",
    ]);

    autoTable(doc, {
      head: [["Employee Name", "Employee ID", "Date", "Clock In", "Clock Out"]],
      body: tableBody,
    });

    doc.save("all_attendance_data.pdf");
  };

  return (
    <MainLayout
      title="Attendance Management"
      description="Manage and view attendance records."
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/attendance/settings")}
        >
          Settings
        </Button>
      </div>

      <div className="bg-white p-6 mt-3 border border-gray-200 rounded-md overflow-hidden">
        <div className="flex flex-wrap justify-between">
          <div className="w-3/10 p-4">
            <p className="text-gray-500 text-xs">
              This shows daily data in real-time.
            </p>
            <h5 className="font-semibold text-lg">
              {selectedDate ? format(selectedDate, "EEE, dd-MM-yyyy") : "None"}
            </h5>
          </div>
          <div className="w-7/10 p-4">
            <div className="grid w-full xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 gap-4">
              {[
                { label: "On time", count: onTime, color: "text-emerald-300" },
                {
                  label: "Late clock-in",
                  count: lateClockIn,
                  color: "text-rose-300",
                },
                { label: "Absent", count: absent, color: "text-gray-500" },
                {
                  label: "No clock-out",
                  count: noClockOut,
                  color: "text-gray-500",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <Separator orientation="vertical" />
                  <div className="flex flex-col h-full justify-center">
                    <h5 className="text-gray-500 text-sm">{item.label}</h5>
                    <p className={`text-lg font-bold ${item.color}`}>
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex xl:flex-row flex-col justify-between">
          <div className="flex gap-5">
            <DatePicker onDateChange={handleDateChange} />
            {/* <Filter /> */}
          </div>
          <div className="flex gap-5 mt-5 xl:mt-0">
            <Button variant="outline" onClick={generateAllAttendancePdf}>
              <DownloadIcon className="h-5 w-5" />
            </Button>
            <div className="relative">
              <SearchIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9 pr-4 focus:ring-primary focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-auto bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Employee Name",
                "Employee ID",
                "Date",
                "Clock In",
                "Clock Out",
                "Action",
              ].map((header, index) => (
                <TableHead key={index} className="text-gray-600">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.length > 0 ? (
              attendance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-500 font-semibold">
                    {item.employementData && item.employementData[0]
                      ? item.employementData[0].name
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.employementData && item.employementData[0]
                      ? item.employementData[0].id_personal
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-500">{item.date}</TableCell>
                  <TableCell className="text-gray-500">
                    {item.clock_in}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.clock_out}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <Ellipsis className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Button
                            variant="ghost"
                            onClick={() => navigate(`/attendance/${item.id}`)}
                          >
                            Detail
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-red-400 py-4"
                >
                  No attendance data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-start">
        <div className="text-xs text-gray-400 mb-2">
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
          <strong>{currentPage * itemsPerPage}</strong> of{" "}
          <strong>{totalPages * itemsPerPage}</strong> records
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink onClick={() => handlePageChange(pageIndex + 1)}>
                <Button variant="outline">{pageIndex + 1}</Button>
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MainLayout>
  );
}
