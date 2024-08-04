import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Ellipsis, FilePenIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuth } from "@/utils/contexts/token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Payroll = () => {
  const [searchPay, setSearchPay] = useState("");
  const [isPayroll, setPayroll] = useState<IPayroll[]>([]);
  const [filterPayroll, setFilterPayroll] = useState<IPayroll[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const { role } = useAuth();

  useEffect(() => {
    featchPayrolls();
  }, []);

  useEffect(() => {
    if (searchPay.trim() === "") {
      setFilterPayroll(isPayroll);
    } else {
      setFilterPayroll(
        isPayroll.filter((payroll) =>
          payroll.employee_name.toLowerCase().includes(searchPay.toLowerCase())
        )
      );
    }
  }, [searchPay, isPayroll]);

  const featchPayrolls = async () => {
    try {
      const resp = await getPayrolls();
      setPayroll(resp.data || []);
    } catch (error: any) {
      const { message } = error.respose.data;
      throw new Error(message);
    }
  };

  const generatePdf = (payrollId: number) => {
    const payrollData = filterPayroll.find(
      (payroll) => payroll.id === payrollId
    );

    if (!payrollData) return;

    const doc = new jsPDF();
    const margin = 14;

    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Empower HR", margin, 20);

    doc.setFontSize(12);
    doc.text("Pondok indah plaza II, Jakarta Selatan", margin, 30);
    doc.text("Telepon: +123456789", margin, 40);
    doc.text("Email: contact@empowerhr.com", margin, 50);
    doc.text("Tanggal: " + new Date().toLocaleDateString(), margin, 60);

    const table: any = [];
    const yPosition: number = 80;

    table.push([
      payrollData.employee_name,
      new Date(payrollData.date).toLocaleDateString("en-US"),
      payrollData.position,
      payrollData.payslip,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Employee Name", "Date", "Position", "Payslip"]],
      body: table,
    });

    const finalY = (doc as any).autoTable.previous.finalY;

    doc.text("Hormat kami,", margin, finalY + 20);
    doc.text("______________________", margin, finalY + 50);
    doc.text("Nama Penandatangan", margin, finalY + 60);
    doc.text("Jabatan", margin, finalY + 70);

    doc.save(`payroll_${payrollData.employee_name}.pdf`);
  };

  const currentDate: Date = new Date();

  const formattedDate = currentDate.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPayroll = filterPayroll.slice(startIndex, endIndex);

  return (
    <MainLayout title="Empower HR - Payroll" description="Empower HR - Payroll">
      <div className="flex justify-between">
        <h5 className="text-2xl font-semibold">Payroll</h5>
      </div>
      <div className="pt-8 flex justify-between">
        <div className="flex  flex-col">
          <text className="text-gray-500 text-sm">salary report for</text>
          <text className="text-2xl font-bold">{formattedDate}</text>
        </div>
        <div className="flex gap-5 mt-5 xl:mt-0">
          <div className="relative">
            <SearchIcon
              size={20}
              className="absolute left-3 top-1/3 -translate-y-1/3 text-muted-foreground"
            />
            <Input
              type="search"
              data-testid="search"
              placeholder="Search"
              value={searchPay}
              onChange={(e) => setSearchPay(e.target.value)}
              className="pl-9 pr-4 focus:ring-primary focus:ring-offset-2"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-auto bg-white rounded-md border mt-10">
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
              ) : null}
            </tr>
          </thead>
          <tbody>
            {paginatedPayroll.map((payroll) => (
              <tr
                key={payroll.id}
                className="border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap"
                >
                  {payroll.employee_name}
                </th>
                <td className="px-6 py-4">
                  {new Date(payroll.date).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">{payroll.position}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="outline"
                    className="gap-3"
                    data-testid="download-pdf"
                    onClick={() => generatePdf(payroll.id)}
                  >
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
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
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
            {Array.from(
              { length: 5 },
              (
                _,
                i // assuming 5 pages
              ) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(i + 1)}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                    className={`text-gray-500 hover:text-gray-700 ${
                      currentPage === i + 1 ? "bg-gray-200" : ""
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
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

export default Payroll;
