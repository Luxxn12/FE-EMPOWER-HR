import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserLeaves } from "@/utils/apis/leaves/api";
import { ILeaves } from "@/utils/apis/leaves/type";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LeavesUser() {
  const [leaves, setLeaves] = useState<ILeaves[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLeaves = async () => {
    try {
      const resp = await getUserLeaves();
      setLeaves(resp.data);
    } catch (error) {
      console.error("Error fetching leaves data:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  console.log(leaves)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLeaves = leaves.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.job_position.toLowerCase().includes(query) ||
      item.reason.toLowerCase().includes(query) ||
      item.start_date.toLowerCase().includes(query) ||
      item.end_date.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  const navigate = useNavigate();

  return (
    <MainLayout
      title="Empower HR - Leaves"
      description="Empower HR - Employee Leaves"
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Leaves user</h1>
        <div>
          <Button onClick={() => navigate("/leaves/request-leaves")}>
            Request leave
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 mt-3 border border-gray-200 rounded-md overflow-hidden">
        <div className="flex flex-wrap justify-between">
          <div className="w-3/10 p-4">
            <p className="text-gray-500 text-xs">This show leaves data for</p>
            <h5 className="font-semibold text-lg">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </h5>
          </div>
          <div className="w-7/10 p-4">
            <div className="grid w-full xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 gap-4">
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <h5 className="text-gray-500 text-sm">Quota</h5>
                  <p className="text-lg font-bold text-green-500">12 Days</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Separator orientation="vertical" />
                <div className="flex flex-col h-full justify-center">
                  <h5 className="text-gray-500 text-sm">Used</h5>
                  <p className="text-lg font-bold text-orange-400">0 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-4 lg:w-1/3 md:w-1/2">
        <SearchIcon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search leaves.."
          className="pl-12 pr-8 focus:ring-primary focus:ring-offset-2"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="relative w-full overflow-auto bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Employee Name",
                "Employee ID",
                "Position",
                "Reason",
                "Start date",
                "End date",
                "Status",
              ].map((header, index) => (
                <TableHead key={index} className="text-gray-600">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((item) => (
                <TableRow key={item.leave_id}>
                  <TableCell className="text-gray-500 font-semibold py-4">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.personal_id}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.job_position}
                  </TableCell>
                  <TableCell className="text-gray-500">{item.reason}</TableCell>
                  <TableCell className="text-gray-500">
                    {item.start_date}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {item.end_date}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    <Link to={`/leaves/${item.leave_id}`}>
                      <p
                        className={
                          item.status === "approved"
                            ? "text-emerald-400"
                            : item.status === "pending"
                            ? "text-orange-400"
                            : item.status === "rejected"
                            ? "text-rose-400"
                            : ""
                        }
                      >
                        {item.status}
                      </p>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-red-400 py-4"
                >
                  No Leave data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}
