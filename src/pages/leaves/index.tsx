import { DatePicker } from "@/components/date-picker";
import { Filter } from "@/components/filter";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DownloadIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Leaves() {
  return (
    <MainLayout title="" description="">
      <div className="flex  justify-between">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="flex gap-5">
          <Link to={""}>
            <Button variant={"outline"}>Settings</Button>
          </Link>
          <Link to={""}>
            <Button>Leaves report</Button>
          </Link>
        </div>
      </div>
      <div className="pt-8">
        <div className="py-6  px-6 border border-[#D5D5D5] bg-white rounded-md">
          <div className="flex md:flex-col xl:flex-row flex-col gap-8">
            <div className="flex  flex-col">
              <text className="text-gray-500 text-sm">
                Employees
              </text>
              <text className="text-2xl font-bold">Time off</text>
            </div>
            <div className="grid w-full xl:container xl:grid-cols-3 lg::grid-cols-3 grid-cols-2 gap-4 ">
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
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
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
                  <TableHead className="w-[32px]">
                    <Checkbox id="select-all" />
                  </TableHead>
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
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>A-3</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>Leave</TableCell>
                  <TableCell>1 Aug 2024</TableCell>
                  <TableCell>14 Aug 2024</TableCell>
                  <TableCell>
                    <text className="text-green-600">Approved</text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>A-3</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>Leave</TableCell>
                  <TableCell>1 Aug 2024</TableCell>
                  <TableCell>14 Aug 2024</TableCell>
                  <TableCell>
                    <text className="text-red-600">Approved</text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>A-3</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>Leave</TableCell>
                  <TableCell>1 Aug 2024</TableCell>
                  <TableCell>14 Aug 2024</TableCell>
                  <TableCell>
                    <text className="text-yellow-600">Approved</text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox id="select-1" />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>A-3</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>Leave</TableCell>
                  <TableCell>1 Aug 2024</TableCell>
                  <TableCell>14 Aug 2024</TableCell>
                  <TableCell>
                    <text className="text-green-600">Approved</text>
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
