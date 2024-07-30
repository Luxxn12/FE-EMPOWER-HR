import { Employment } from "@/utils/apis/employee/type";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type EmploymentDataProps = Employment & {
  updateFields: (fields: Partial<Employment>) => void;
};

function FormEmployment({
  employment_status,
  schedule,
  join_date,
  job_level,
  department,
  approval_line,
  job_position,
  updateFields,
}: EmploymentDataProps) {
  return (
    <>
      <h5 className="text-md font-semibold">Employment data</h5>
      <p className="text-gray-500">
        Fill all employee data information related to company
      </p>
      <form className="space-y-3 my-4 lg:w-3/4">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label htmlFor="emplymentStatus">Employment status *</Label>
            <Select
              onValueChange={(value) =>
                updateFields({ employment_status: value })
              }
              value={employment_status}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanen">permanent</SelectItem>
                <SelectItem value="contract">contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="schedule">Schedule *</Label>
            <Select
              onValueChange={(value) => updateFields({ schedule: value })}
              value={schedule}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Office Schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Office Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="joinDate">Join date *</Label>
            <Input
              id="joinDate"
              type="date"
              onChange={(e) => updateFields({ join_date: e.target.value })}
              value={join_date}
            />
          </div>
          <div>
            <Label htmlFor="jobLevel">Job level *</Label>
            <Select
              onValueChange={(value) => updateFields({ job_level: value })}
              value={job_level}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departement">Departement *</Label>
            <Input
              id="departement"
              type="text"
              placeholder="IT Division"
              onChange={(e) => updateFields({ department: e.target.value })}
              value={department}
            />
          </div>
          <div>
            <Label htmlFor="approvalLine">Approval line *</Label>
            <Select
              onValueChange={(value) => updateFields({ approval_line: value })}
              value={approval_line}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="empower hr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Bambang</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="approvalLine">Job position *</Label>
            <Select
              onValueChange={(value) => updateFields({ job_position: value })}
              value={job_position}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="empower hr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Engineer">Software Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormEmployment;
