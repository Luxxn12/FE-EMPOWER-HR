import { DatePicker } from "@/components/date-picker";
// import { Filter } from "@/components/filter";
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
import { getAttendance } from "@/utils/apis/attendance/api";
import { IAttendance } from "@/utils/apis/attendance/type";
import {
  CircleAlert,
  CircleCheck,
  // CircleCheck,
  DownloadIcon,
  Ellipsis,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Attendance() {
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const fetchAttendance = async () => {
    try {
      const resp = await getAttendance();

      setAttendance(resp.data);
      setCurrentPage(resp.meta[0].currentPage);
      setTotalPages(resp.meta[0].totalPages);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(attendance)

  return (
    <MainLayout title="" description="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/attendance/settings")}
        >
          Settings
        </Button>
      </div>
      {/* <div className="my-2">
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-5">
          <Link to={"/attendance/live-attendance"}>
            <div className="p-5 border border-[#D5D5D5] bg-white rounded-md cursor-pointer">
              <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col">
                  <text className="text-2xl">Clock in</text>
                  <text className="text-sm text-gray-400">
                    1 Juni 2024 - 09.14
                  </text>
                </div>
                <div className="flex flex-col">
                  <CircleCheck size={50} className="text-green-600" />
                </div>
              </div>
            </div>
          </Link>
          <Link to={"/attendance/live-attendance"}>
            <div className="p-5 border border-[#D5D5D5] bg-white rounded-md cursor-pointer">
              <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col">
                  <text className="text-2xl">Clock out</text>
                  <text className="text-sm text-gray-400">
                    1 Juni 2024 - 09.14
                  </text>
                </div>
                <div className="flex flex-col">
                  <CircleAlert size={50} className="text-[#F59E0B]" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div> */}
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
            <div className="grid w-full xl:grid-cols-5 lg::grid-cols-3 grid-cols-2 gap-4 ">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <h5 className="text-gray-500 text-sm">On time</h5>
                  <p className="text-lg font-bold text-emerald-300">3</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <h5 className="text-gray-500 text-sm">Late clock-in</h5>
                  <p className="text-lg font-bold text-rose-300">3</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <h5 className="text-gray-500 text-sm">Absent</h5>
                  <p className="text-lg font-bold text-gray-500">0</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <h5 className="text-gray-500 text-sm">No clock-out</h5>
                  <p className="text-lg font-bold text-gray-500">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex xl:flex-row  flex-col justify-between">
          <div className="flex gap-5">
            <DatePicker onDateChange={handleDateChange} />
            {/* <Filter /> */}
          </div>
          <div className="flex gap-5 mt-5 xl:mt-0">
            <Button variant="outline">
              <DownloadIcon className=" h-5 w-5" />
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
      <div className="mb-4">
        {error && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <CircleAlert className="flex-shrink-0 inline w-4 h-4 me-3" />
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Warning!</span> {error}
            </div>
          </div>
        )}

        <div className="relative w-full overflow-auto bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Employee Name</TableHead>
                <TableHead className="text-gray-600">Employee ID</TableHead>
                <TableHead className="text-gray-600">Date</TableHead>
                <TableHead className="text-gray-600">Clock In</TableHead>
                <TableHead className="text-gray-600">Clock Out</TableHead>
                <TableHead className="text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance && attendance.length > 0 ? (
                attendance.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-500 font-semibold">
                      {item.employementData[0].name}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.employementData[0].id_personal}
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
                          <DropdownMenuItem>Detail</DropdownMenuItem>
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
