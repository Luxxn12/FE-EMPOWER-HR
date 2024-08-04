import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, BookUser, Ellipsis, FilePenIcon, Search, TrashIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IEmployeeGetAll } from "@/utils/apis/employee/type";
import { deleteEmployee, getAllEmployee } from "@/utils/apis/employee/api";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/utils/contexts/token";
import { Input } from "@/components/ui/input";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Employees = () => {
  const [searchEmp, setSearchEmp] = useState("")
  const [isData, setData] = useState<IEmployeeGetAll[]>([]);
  const [filterEmp, setFilterEmp] = useState<IEmployeeGetAll[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const { role } = useAuth()
  

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (searchEmp.trim() === "") {
      setFilterEmp(isData)
    } else {
      setFilterEmp(
        isData.filter((employee) =>
          employee.name
            .toLowerCase()
            .includes(searchEmp.toLowerCase())
        )
      )
    }
  }, [searchEmp, isData])


  async function fetchData() {
    try {
      const response = await getAllEmployee(currentPage);
      setData(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const generatePdf = () => {
    const doc = new jsPDF();
    const table: any = [];
    const margin = 14;

    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Empower HR", margin, 20);

    doc.setFontSize(12);
    doc.text("Pondok indah plaza II, Jakarta Selatan", margin, 30);
    doc.text("Telepon: +123456789", margin, 40);
    doc.text("Email: contact@empowerhr.com", margin, 50);
    doc.text("Tanggal: " + new Date().toLocaleDateString(), margin, 60);
    const yPosition: number = 80;

    filterEmp.forEach((employee) => {
      table.push([
        employee.name,
        employee.job_position,
        employee.employment_status,
        employee.job_level,
        new Date(employee.join_date).toLocaleDateString("en-US"),
      ]);
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['Employee Name', 'Date', 'Position', 'Payslip']],
      body: table,
    });

    const finalY = (doc as any).autoTable.previous.finalY;

    doc.text("Hormat kami,", margin, finalY + 20);
    doc.text("______________________", margin, finalY + 50);
    doc.text("Nama Penandatangan", margin, finalY + 60);
    doc.text("Jabatan", margin, finalY + 70);

    doc.save('Employees_data.pdf');
  };

  async function handleDeleteEmployee(employee_id: number) {
    try {
      await deleteEmployee(employee_id);
      fetchData()
      toast.success('Employee deleted successfully');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <div className="flex justify-between">
        <h5 className="text-2xl font-semibold">Employees</h5>
        {role == "admin" ? (
          <Link
            to="/employees/create"
            className="bg-skyBlue text-[#EEEEEE] hover:bg-skyBlue/90  h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Add Employee
          </Link>
        ) : null}
      </div>
      <div className="flex justify-end my-8">
        <div className="flex justify-between gap-5">
          <Button variant="outline" onClick={generatePdf}>
            <ArrowDownToLine className="text-gray-600" />
          </Button>
          <div className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-600" />
              </div>
              <Input
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchEmp(e.target.value)}
                value={searchEmp}
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
        "Job Position",
        "Employment Status",
        "Job Level",
        "Join Date",
        "Action",
      ].map((header, index) => (
        <TableHead key={index} className="text-gray-600">
          {header}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterEmp?.length > 0 ? (
      filterEmp.map((item, index) => (
        <TableRow key={index}>
          <TableCell className="text-gray-500 font-semibold">
            {item.name}
          </TableCell>
          <TableCell className="text-gray-500">{item.job_position}</TableCell>
          <TableCell className="text-gray-500">{item.employment_status}</TableCell>
          <TableCell className="text-gray-500">{item.job_level}</TableCell>
          <TableCell className="text-gray-500">{item.join_date}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <Ellipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to={`/employees/${item.id}`} className="flex items-center gap-2">
                    <BookUser className="h-4 w-4" />
                    <span>Detail</span>
                  </Link>
                </DropdownMenuItem>

                {role == "admin" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/employees/edit-employee/${item.id}`} className="flex items-center gap-2">
                        <FilePenIcon className="h-4 w-4" />
                        <span>Edit Personal</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/employees/edit-employment/${item.id}`} className="flex items-center gap-2">
                        <FilePenIcon className="h-4 w-4" />
                        <span>Edit Employment</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteEmployee(item.id)}>
                      <div className="flex items-center gap-2">
                        <TrashIcon className="h-4 w-4" />
                        <span>Delete</span>
                      </div>
                    </DropdownMenuItem>
                  </>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-red-400 py-4">
          No employee data available
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
      </div>

      <div className="flex justify-center mt-5">
        <Pagination>
          <PaginationContent className="flex justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-500 hover:text-gray-700"
              >
                Sebelumnya
              </PaginationPrevious>
            </PaginationItem>
            {Array.from({ length: 5 }, (_, i) => ( // assuming 5 pages
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(i + 1)}
                  aria-current={currentPage === i + 1 ? 'page' : undefined}
                  className={`text-gray-500 hover:text-gray-700 ${currentPage === i + 1 ? 'bg-gray-200' : ''}`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === 5} // assuming 5 pages
                className="text-gray-500 hover:text-gray-700"
              >
                Selanjutnya
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </MainLayout>
  );
};

export default Employees;
