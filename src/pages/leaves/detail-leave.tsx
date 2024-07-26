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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function DetailLeave() {
  const [date, setDate] = React.useState<Date>();
  return (
    <MainLayout title="" description="">
      <div className="flex  justify-between">
        <h1 className="text-2xl font-bold">Comfirmation</h1>
        <div>
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
                  Please selectdate to print leaves report
                </DialogDescription>
              </AlertDialogHeader>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Strat date *</Label>
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
                  <Label htmlFor="name">End date *</Label>
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
        <div className="py-6  px-6 border border-[#D5D5D5] bg-white rounded-md">
          <div className="flex md:flex-col xl:flex-row flex-col gap-8">
            <div className="flex  flex-col">
              <text className="text-gray-500 text-sm">Leaves request</text>
              <text className="text-2xl font-bold">Username</text>
            </div>
            <div className="grid w-full xl:container xl:grid-cols-3 lg::grid-cols-3 grid-cols-2 gap-8 ">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">Quota</text>
                  <text className="text-xl font-bold text-blue-400">0</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <text className="text-gray-500">Used</text>
                  <text className="text-xl font-bold text-blue-400">0</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
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
                    <text className="text-yellow-600">Waiting Approve</text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="pt-8 flex flex-col">
        <text className="text-xl font-bold">Approve</text>
        <text className="text-sm  text-gray-500 mt-1">
          submit to send a leave approval request
        </text>
        <div className="mt-3">
          <Button>Submit</Button>
        </div>
      </div>
      <Separator className="my-8 bg-gray-300" />
      <div className="flex flex-col">
        <text className="text-xl font-bold">Reject</text>
        <div className="grid xl:grid-cols-2 grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input type="text" id="reason" placeholder="reason" />
          </div>
        </div>
        <div className="mt-3">
          <Button className="bg-red-500">Reject</Button>
        </div>
      </div>
    </MainLayout>
  );
}
