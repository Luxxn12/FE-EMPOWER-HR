import { DatePicker } from "@/components/date-picker";
import { Filter } from "@/components/filter";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  CircleAlert,
  CircleCheck,
  DownloadIcon,
  Ellipsis,
  SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Attendance() {
  return (
    <MainLayout title="" description="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button>Settings</Button>
      </div>
      <div className="py-4 mt-6">
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
      </div>
      <div className="py-4">
        <div className="py-6  px-6 border border-[#D5D5D5] bg-white rounded-md">
          <div className="flex md:flex-col lg:flex-row flex-col gap-8">
            <div className="flex flex-col">
              <text className="text-gray-500 text-sm">
                This shows daily data in real-time.
              </text>
              <text className="text-2xl font-bold">Agustus 2024</text>
            </div>
            <div className="grid w-full xl:grid-cols-5 lg::grid-cols-3 grid-cols-2 gap-4 ">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">On time</text>
                  <text className="text-xl font-bold text-blue-400">3</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <text className="text-gray-500">Late clock in</text>
                  <text className="text-xl font-bold text-blue-400">30</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">Absent</text>
                  <text className="text-xl font-bold text-blue-400">40</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">No clock</text>
                  <text className="text-xl font-bold text-blue-400">3</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">No clock out</text>
                  <text className="text-xl font-bold text-blue-400">3</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex xl:flex-row  flex-col justify-between">
          <div className="flex gap-5">
            <DatePicker />
            <Filter />
          </div>
          <div className="flex gap-5 mt-5 xl:mt-0">
            <Button variant="outline">
              <DownloadIcon className=" h-5 w-5" />
            </Button>
            <div className="relative">
              <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9 pr-4 focus:ring-primary focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead className="text-black">Employee Name</TableHead>
                  <TableHead className="text-black">Employee ID</TableHead>
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Clock In</TableHead>
                  <TableHead className="text-black">Clock Out</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>EMP001</TableCell>
                  <TableCell>2023-07-24</TableCell>
                  <TableCell>09:00 AM</TableCell>
                  <TableCell>05:30 PM</TableCell>
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
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-2" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>EMP002</TableCell>
                  <TableCell>2023-07-24</TableCell>
                  <TableCell>08:30 AM</TableCell>
                  <TableCell>06:00 PM</TableCell>
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
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-3" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>EMP003</TableCell>
                  <TableCell>2023-07-24</TableCell>
                  <TableCell>09:15 AM</TableCell>
                  <TableCell>05:45 PM</TableCell>
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
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-4" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>EMP004</TableCell>
                  <TableCell>2023-07-24</TableCell>
                  <TableCell>08:45 AM</TableCell>
                  <TableCell>06:15 PM</TableCell>
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
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-5" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>EMP005</TableCell>
                  <TableCell>2023-07-24</TableCell>
                  <TableCell>09:30 AM</TableCell>
                  <TableCell>05:00 PM</TableCell>
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
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-3">
        Showing <strong>1-5</strong> of <strong>20</strong> records
      </div>
    </MainLayout>
  );
}
