import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSchedule } from "@/utils/apis/schedule/api";
import { ISchedule } from "@/utils/apis/schedule/type";
import { CircleAlert, Ellipsis, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SettingAttendance() {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fetchSchedule = async () => {
    try {
      const resp = await getSchedule();

      setSchedule(resp.data);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Settings Attendance</h1>
      <div className="flex xl:flex-row xl:items-center  flex-col justify-between mt-8">
        <h1 className="text-xl font-medium text-gray-600">Schedule</h1>
        <div className="flex gap-5 mt-5 xl:mt-0">
          <div className="relative">
            <SearchIcon
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search by schedule name"
              className="pl-9 pr-4 focus:ring-primary focus:ring-offset-2"
            />
          </div>
          <Link to={"/attendance/settings/schedule"}>
            <Button>Create new schedule </Button>
          </Link>
        </div>
      </div>
      <div className="py-8">
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
          <Table className="border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Schedule name</TableHead>
                <TableHead className="text-gray-600">Effective date</TableHead>
                <TableHead className="text-gray-600">Schedule in</TableHead>
                <TableHead className="text-gray-600">Schedule out</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule && schedule.length > 0 ? (
                schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-500 font-semibold">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.affective_date}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.schedule_in}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.schedule_out}
                    </TableCell>
                    <TableCell className="text-gray-500">
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
                          <Link to={"/attendance/settings/schedule/1/edit"}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Dialog>
                            <DialogTrigger
                              asChild
                              className="w-full justify-start"
                            >
                              <Button variant="ghost">Details</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px] p-6 flex flex-col gap-4">
                              <DialogHeader>
                                <DialogTitle className="items-start">
                                  Detail Schedule
                                </DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 mt-4">
                                <h5 className="font-medium">Schedule name</h5>
                                <p>{item.name}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Effective date</h5>
                                <p>{item.affective_date}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Shift pattern</h5>
                                <p>{item.repeat_until}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Schedule in</h5>
                                <p>{item.schedule_in}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Schedule out</h5>
                                <p>{item.schedule_out}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Break start</h5>
                                <p>{item.break_start}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Break end</h5>
                                <p>{item.break_end}</p>
                              </div>
                              <div className="grid grid-cols-2">
                                <h5 className="font-medium">Description</h5>
                                <p>{item.description}</p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div>No attendance data available</div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
