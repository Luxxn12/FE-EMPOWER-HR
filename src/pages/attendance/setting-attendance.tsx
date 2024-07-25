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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingAttendance() {
  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Settings Attendance</h1>
      <div className="flex xl:flex-row xl:items-center  flex-col justify-between mt-8">
        <h1 className="text-xl font-medium">Schedule</h1>
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
        <div className="border rounded-lg w-full">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Schedule name</TableHead>
                  <TableHead className="text-black">Effective date</TableHead>
                  <TableHead className="text-black">Shift pattern</TableHead>
                  <TableHead className="text-black">Description</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Schedule 1</TableCell>
                  <TableCell>23 Juli 2024</TableCell>
                  <TableCell>29 day</TableCell>
                  <TableCell>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                        <DropdownMenuItem asChild>
                          <Link
                            to={
                              "/attendance/settings/schedule/1/edit"
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Schedule 1</TableCell>
                  <TableCell>23 Juli 2024</TableCell>
                  <TableCell>29 day</TableCell>
                  <TableCell>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                        <DropdownMenuItem asChild>
                          <Link
                            to={
                              "/attendance/settings/schedule/1/edit"
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Schedule 1</TableCell>
                  <TableCell>23 Juli 2024</TableCell>
                  <TableCell>29 day</TableCell>
                  <TableCell>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                        <DropdownMenuItem asChild>
                          <Link
                            to={
                              "/attendance/settings/schedule/1/edit"
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Schedule 1</TableCell>
                  <TableCell>23 Juli 2024</TableCell>
                  <TableCell>29 day</TableCell>
                  <TableCell>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                        <DropdownMenuItem asChild>
                          <Link
                            to={
                              "/attendance/settings/schedule/1/edit"
                            }
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
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
