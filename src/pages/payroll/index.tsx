import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, DownloadIcon, Ellipsis, FilePenIcon, SearchIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/date-picker";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IPayroll } from "@/utils/apis/payroll/type";
import { getPayrolls } from "@/utils/apis/payroll/api";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAuth } from "@/utils/contexts/token";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Payroll = () => {
  const [date, setDate] = useState<Date>();
  const [searchPay, setSearchPay] = useState("")
  const [isPayroll, setPayroll] = useState<IPayroll[]>([])
  const [filterPayroll, setFilterPayroll] = useState<IPayroll[]>([])
  const { role } = useAuth()


  useEffect(() => {
    featchPayrolls()
  }, [])

  useEffect(() => {
    if (searchPay.trim() === "") {
      setFilterPayroll(isPayroll)
    } else {
      setFilterPayroll(
        isPayroll.filter((payroll) =>
          payroll.employee_name
            .toLowerCase()
            .includes(searchPay.toLowerCase())
        )
      )
    }
  }, [searchPay, isPayroll])



  const featchPayrolls = async () => {
    try {
      const resp = await getPayrolls()
      setPayroll(resp.data || [])
    } catch (error: any) {
      const { message } = error.respose.data
      throw new Error(message)
    }
  }

  const generatePdf = (payrollId: number) => {
    const payrollData = filterPayroll.find((payroll) => payroll.id === payrollId);
  
    if (!payrollData) return;
  
    const doc = new jsPDF();
    const table: any = [];
  
    table.push([
      payrollData.employee_name,
      new Date(payrollData.date).toLocaleDateString("en-US"),
      payrollData.position,
      payrollData.payslip,
    ]);
  
    autoTable(doc, {
      head: [['Employee Name', 'Date', 'Position', 'Payslip']],
      body: table,
    });
  
    doc.save(`payroll_${payrollData.employee_name}.pdf`);
  };

  return (
    <MainLayout title="Empower HR - Payroll" description="Empower HR - Payroll">
      <div className="flex justify-between">
        <h5 className="text-2xl font-semibold">Payroll</h5>
        {role !== "employees" && (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild className="w-full justify-start">
                <Button>Payroll report</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] p-6 flex flex-col gap-4">
                <AlertDialogHeader>
                  <DialogTitle className="items-start">
                    Print payroll report
                  </DialogTitle>
                  <DialogDescription>
                    Please selectdate to print payroll report
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
        )}
      </div>
      <div className="pt-8">
        <div className="py-6  px-6 border border-[#D5D5D5] bg-white rounded-md">
          <div className="flex md:flex-col xl:flex-row flex-col gap-8">
            <div className="flex  flex-col">
              <text className="text-gray-500 text-sm">salary report for</text>
              <text className="text-2xl font-bold">August 2024</text>
            </div>
            <div className="grid w-full xl:container xl:grid-cols-3 lg::grid-cols-3 grid-cols-2 gap-4 ">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">Employees</text>
                  <text className="text-xl font-bold text-blue-400">100</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <text className="text-gray-500">Paid</text>
                  <text className="text-xl font-bold text-blue-400">0</text>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col  h-full justify-center">
                  <text className="text-gray-500">Unpaid</text>
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
            {/* <Filter /> */}
          </div>
          <div className="flex gap-5 mt-5 xl:mt-0">
            <div className="relative">
              <SearchIcon
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search"
                value={searchPay}
                onChange={(e) => setSearchPay(e.target.value)}
                className="pl-9 pr-4 focus:ring-primary focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-gray-600 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Emplyee name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Payslip
              </th>
              {role == "admin" ? (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              ) : null
              }
            </tr>
          </thead>
          <tbody>
            {filterPayroll.map((payroll) => (
              <tr key={payroll.id} className="border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap"
                >
                  {payroll.employee_name}
                </th>
                <td className="px-6 py-4">
                  {new Date(payroll.date).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">
                  {payroll.position}
                </td>
                <td className="px-6 py-4">
                  <Button variant="outline" className="gap-3" onClick={() => generatePdf(payroll.id)}>
                    <DownloadIcon className="h-5 w-5" />
                    Download PDF
                  </Button>
                </td>
                {role == "admin" ? (
                  <td className="flex items-center px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/payroll/${payroll.id}`} className="flex">
                            <FilePenIcon className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                ) : null
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                <Button variant="outline">1</Button>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </MainLayout>
  );
};

export default Payroll;
