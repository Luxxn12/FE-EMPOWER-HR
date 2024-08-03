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

const Employees = () => {
  const [searchEmp, setSearchEmp] = useState("")
  const [isData, setData] = useState<IEmployeeGetAll[]>([]);
  const [filterEmp, setFilterEmp] = useState<IEmployeeGetAll[]>([])
  const { role } = useAuth()

  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await getAllEmployee();
      setData(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const generatePdf = () => {
    const doc = new jsPDF();
    const table: any = [];

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
      head: [['Employee Name', 'Date', 'Position', 'Payslip']],
      body: table,
    });

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

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-gray-600 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Emplyee name
              </th>
              <th scope="col" className="px-6 py-3">
                Job position
              </th>
              <th scope="col" className="px-6 py-3">
                Employment status
              </th>
              <th scope="col" className="px-6 py-3">
                Job level
              </th>
              <th scope="col" className="px-6 py-3">
                Join date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filterEmp?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.job_position}</td>
                <td className="px-6 py-4">{item.employment_status}</td>
                <td className="px-6 py-4">{item.job_level}</td>
                <td className="px-6 py-4">{item.join_date}</td>
                <td className="flex items-center px-6 py-4">
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
                </td>
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

export default Employees;
