import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownToLine, Ellipsis, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Employees = () => {
  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <div className="flex justify-between">
        <h5 className="text-xl text-gray-500 font-semibold">Employees</h5>
        <Button>Add Employee</Button>
      </div>
      <div className="flex justify-between my-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between gap-2">
          <Button variant="outline">
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
              <input
                type="text"
                id="simple-search"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 placeholder:text-gray-500"
                placeholder="Search branch name..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-gray-600 border-b border-gray-300">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Emplyee name
              </th>
              <th scope="col" className="px-6 py-3">
                Job position
              </th>
              <th scope="col" className="px-6 py-3">
                Job level
              </th>
              <th scope="col" className="px-6 py-3">
                Employment status
              </th>
              <th scope="col" className="px-6 py-3">
                Job date
              </th>
              <th scope="col" className="px-6 py-3">
                End date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap"
              >
                Empower employee
              </th>
              <td className="px-6 py-4">Software Engineer</td>
              <td className="px-6 py-4">Junior</td>
              <td className="px-6 py-4">Probation</td>
              <td className="px-6 py-4">01 Jan 2010</td>
              <td className="px-6 py-4">-</td>
              <td className="flex items-center px-6 py-4">
                <Ellipsis />
              </td>
            </tr>
            <tr className="border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap"
              >
                Empower employee
              </th>
              <td className="px-6 py-4">Software Engineer</td>
              <td className="px-6 py-4">Junior</td>
              <td className="px-6 py-4">Probation</td>
              <td className="px-6 py-4">01 Jan 2010</td>
              <td className="px-6 py-4">-</td>
              <td className="flex items-center px-6 py-4">
                <Ellipsis />
              </td>
            </tr>
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
