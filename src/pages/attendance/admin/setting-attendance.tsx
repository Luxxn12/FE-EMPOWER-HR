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
import { Ellipsis, SearchIcon } from "lucide-react";
import { useAuth } from "@/utils/contexts/token";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SettingAttendance() {
  const { schedules, error } = useAuth();
  const navigate = useNavigate();

  if (error) {
    toast.error(error);
  }

  return (
    <MainLayout
      title="Empower HR - Setting Attendance"
      description="Empower HR - Setting Attendance"
    >
      <h1 className="text-2xl font-bold">Settings Attendance</h1>

      <div className="flex xl:flex-row xl:items-center flex-col justify-between mt-8">
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
          <Link to="/attendance/settings/schedule">
            <Button>Create new schedule</Button>
          </Link>
        </div>
      </div>

      <div className="py-8">
        <div className="relative w-full overflow-auto bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "Schedule name",
                  "Effective date",
                  "Schedule in",
                  "Schedule out",
                  "Action",
                ].map((header, index) => (
                  <TableHead key={index} className="text-gray-600">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.length > 0 ? (
                schedules.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-gray-500 font-semibold">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.effective_date}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.schedule_in}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {item.schedule_out}
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
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() =>
                              navigate(
                                `/attendance/settings/schedule/${item.id}/edit`
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Dialog>
                            <DialogTrigger
                              asChild
                              className="w-full justify-start"
                            >
                              <Button variant="ghost">Details</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px] p-6 flex flex-col gap-4">
                              <DialogHeader>
                                <DialogTitle>Detail Schedule</DialogTitle>
                              </DialogHeader>
                              {Object.entries({
                                "Schedule name": item.name,
                                "Effective date": item.effective_date,
                                "Shift pattern": item.repeat_until,
                                "Schedule in": item.schedule_in,
                                "Schedule out": item.schedule_out,
                                "Break start": item.break_start,
                                "Break end": item.break_end,
                                Description: item.description,
                              }).map(([label, value]) => (
                                <div
                                  className="grid grid-cols-2 mt-4"
                                  key={label}
                                >
                                  <h5 className="font-medium">{label}</h5>
                                  <p>{value}</p>
                                </div>
                              ))}
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-red-400 py-4"
                  >
                    No schedule data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
