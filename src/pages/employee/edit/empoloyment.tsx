import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";

const EditEmployment = () => {
  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Edit Employement</h5>
      <p className="text-gray-500">
        Fill all employee data information related to company
      </p>
      <form className="space-y-3 my-4 lg:w-3/4">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label htmlFor="emplymentStatus">Employment status *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Permanent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="schedule">Schedule *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Office Schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="joinDate">Join date *</Label>
            <Input id="joinDate" type="date" />
          </div>
          <div>
            <Label htmlFor="jobLevel">Job level *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departement">Departement *</Label>
            <Input id="departement" type="text" placeholder="IT Division" />
          </div>
          <div>
            <Label htmlFor="approvalLine">Approval line *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="empower hr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="approvalLine">Job position *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="empower hr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Manager HRD & GA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-start gap-2">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default EditEmployment;
