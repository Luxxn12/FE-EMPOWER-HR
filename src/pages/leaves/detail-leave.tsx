import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLeavesById, updateLeaveStatus } from "@/utils/apis/leaves/api";
import { ILeaves } from "@/utils/apis/leaves/type";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useAuth } from "@/utils/contexts/token";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DetailLeave() {
  const [leave, setLeave] = useState<ILeaves | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [rejectError, setRejectError] = useState<string | null>(null);
  const { leave_id } = useParams<{ leave_id: string }>();
  const numberId = leave_id ? parseInt(leave_id, 10) : null;
  const { role } = useAuth();

  const fetchLeave = async () => {
    try {
      const resp = await getLeavesById(numberId!);
      setLeave(resp.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [numberId]);

  const generateLeavePdf = () => {
    const doc = new jsPDF();
    const margin = 14;
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;

    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Empower HR", margin, 20);
    doc.setFontSize(12);
    doc.text("Pondok indah plaza II, Jakarta Selatan", margin, 30);
    doc.text("Telepon: +123456789", margin, 40);
    doc.text("Email: contact@empowerhr.com", margin, 50);
    doc.text("Tanggal: " + new Date().toLocaleDateString(), margin, 60);

    doc.setFontSize(16);
    doc.text("SURAT IZIN CUTI", margin, 80);

    doc.setFontSize(12);
    doc.text(`Kepada Yth: ${leave?.name}`, margin, 100);
    doc.text(`HR Department ${leave?.job_position}`, margin, 110);
    doc.text("PT. Empowe HR", margin, 120);

    doc.text(" ", margin, 140);

    doc.setFontSize(12);
    const longText = `Demikian surat izin cuti ini kami buat, mohon agar dapat dipertimbangkan dan diproses sesuai dengan ketentuan yang berlaku. Terima kasih atas perhatian dan kerja samanya.`;
    const textLines = doc.splitTextToSize(longText, pageWidth);

    let yPosition = 150;

    textLines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    doc.text(" ", 14, 40);

    const tableBody = [
      [
        leave?.name || "N/A",
        "AA-1",
        leave?.job_position || "N/A",
        leave?.reason || "N/A",
        leave?.start_date || "N/A",
        leave?.end_date || "N/A",
        leave?.status || "N/A",
      ],
    ];

    autoTable(doc, {
      startY: yPosition + 10,
      head: [
        [
          "Employee Name",
          "Employee ID",
          "Position",
          "Reason",
          "Start Date",
          "End Date",
          "Status",
        ],
      ],
      body: tableBody,
    });

    const finalY = (doc as any).autoTable.previous.finalY;

    doc.text("Hormat kami,", margin, finalY + 20);
    doc.text("______________________", margin, finalY + 50);
    doc.text("Nama Penandatangan", margin, finalY + 60);
    doc.text("Jabatan", margin, finalY + 70);

    doc.save("leave_data.pdf");
  };

  const handleApprove = async () => {
    try {
      await updateLeaveStatus(numberId!, "approved", "cuti diterima");
      setLeave({ ...leave!, status: "approved" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setRejectError("Please enter a reason for rejection.");
      return;
    }
    try {
      await updateLeaveStatus(numberId!, "rejected", rejectReason);
      setLeave({ ...leave!, status: "rejected" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading || error) {
    return (
      <MainLayout title="" description="">
        {loading ? <p>Please wait...</p> : <p>Something went wrong: {error}</p>}
      </MainLayout>
    );
  }

  return (
    <MainLayout title="" description="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Leave Details</h1>

        {(leave?.status === "approved" || leave?.status === "rejected") && (
          <Button onClick={generateLeavePdf} data-testid="generateLeaveButton">Leave report</Button>
        )}
      </div>

      <div className="relative mt-3 w-full overflow-auto bg-white rounded-md border">
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
            <TableRow>
              <TableCell className="font-medium">{leave?.name}</TableCell>
              <TableCell>EMPHR - {leave?.personal_id}</TableCell>
              <TableCell>{leave?.job_position}</TableCell>
              <TableCell>{leave?.reason}</TableCell>
              <TableCell>{leave?.start_date}</TableCell>
              <TableCell>{leave?.end_date}</TableCell>
              <TableCell>
                <p
                  className={
                    leave?.status === "approved"
                      ? "text-emerald-400"
                      : leave?.status === "pending"
                      ? "text-orange-400"
                      : leave?.status === "reject"
                      ? "text-rose-400"
                      : ""
                  }
                >
                  {leave?.status}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {role === "admin" && leave?.status === "pending" && (
        <>
          <div className="pt-8 flex flex-col">
            <p className="text-xl font-bold">Approve</p>
            <p className="text-sm text-gray-500 mt-1">
              Submit to send a leave approval request
            </p>
            <div className="mt-3">
              <Button size="sm" onClick={handleApprove} data-testid="approveLeaveButton">
                Submit
              </Button>
            </div>
          </div>
          <Separator className="my-8 bg-gray-300" />
          <div className="flex flex-col">
            <p className="text-xl font-bold">Reject</p>
            <div className="grid xl:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="rejectReason">Reject Reason</Label>
                <Input
                  id="rejectReason"
                  type="text"
                  placeholder="Enter reason for rejection"
                  className="border border-gray-300 p-2"
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    setRejectError(null);
                  }}
                  data-testid="rejectReason"
                />
                {rejectError && (
                  <p className="text-red-500 text-sm">{rejectError}</p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <Button
                variant={"destructive"}
                size="sm"
                className="pl-4 pr-4"
                onClick={handleReject}
                data-testid="rejectLeaveButton"
              >
                Reject
              </Button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
