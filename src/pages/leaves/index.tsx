import { DatePicker } from "@/components/date-picker";
import { Filter } from "@/components/filter";
import MainLayout from "@/components/layouts/main-layout";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getLeaves } from "@/utils/apis/leaves/api";
import { ILeaves } from "@/utils/apis/leaves/type";
import { format } from "date-fns";
import { CalendarIcon, DownloadIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getLeaves } from "@/api"; // Import your API function

export default function Leaves() {
  const [date, setDate] = useState<Date | undefined>();
  const [leaves, setLeaves] = useState<ILeaves[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await getLeaves();
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leaves data:", error);
      }
    };

    fetchLeaves();
  }, []);

  console.log(leaves);

  return (
    <MainLayout title="" description="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Leaves</h1>
        <div className="flex gap-5">
          <Link to={""}>
            <Button variant={"outline"}>Settings</Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild className="w-full justify-start">
              <Button>Leaves report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-6 flex flex-col gap-4">
              <AlertDialogHeader>
                <DialogTitle className="items-start">
                  Print leaves report
                </DialogTitle>
                <DialogDescription>
                  Please select date to print leaves report
                </DialogDescription>
              </AlertDialogHeader>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end gap-5">
                <Button variant={"outline"}>Cancel</Button>
                <Button className="pl-4 pr-4">Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="pt-8">
        <div className="py-6 px-6 border border-[#D5D5D5] bg-white rounded-md">
          <div className="flex md:flex-col xl:flex-row flex-col gap-8">
            <div className="flex flex-col">
              <text className="text-gray-500 text-sm">Employees</text>
              <text className="text-2xl font-bold">Time off</text>
            </div>
            <div className="grid w-full xl:container xl:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-4">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
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
                <div className="flex flex-col h-full justify-center">
                  <text className="text-gray-500">Absent</text>
                  <text className="text-xl font-bold text-blue-400">40</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="flex xl:flex-row flex-col justify-between">
          <div className="flex gap-5">
            <DatePicker />
            <Filter />
          </div>
          <div className="flex gap-5 mt-5 xl:mt-0">
            <Button variant="outline">
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
      <div className="py-4">
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Employee Name</TableHead>
                  <TableHead className="text-black">Employee ID</TableHead>
                  <TableHead className="text-black">Position</TableHead>
                  <TableHead className="text-black">Reason</TableHead>
                  <TableHead className="text-black">Start date</TableHead>
                  <TableHead className="text-black">End date</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.leave_id}>
                    <TableCell className="font-medium">{leave.name}</TableCell>
                    <TableCell>{leave.personal_id}</TableCell>
                    <TableCell>{leave.job_position}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>{leave.start_date}</TableCell>
                    <TableCell>{leave.end_date}</TableCell>
                    <TableCell>
                      <Link to={`/leaves/${leave.leave_id}`}>
                        <label className="text-yellow-600">{leave.status}</label>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
