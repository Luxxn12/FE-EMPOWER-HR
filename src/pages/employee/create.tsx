import { useState } from "react";
import MainLayout from "@/components/layouts/main-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleCheck } from "lucide-react";

const steps = [
  "Personal Data",
  "Employment Data",
  "Payroll",
  "Invite Employee",
];

const CreateEmployee = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Employee invited!");
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Add Employees</h5>

      <div className="flex flex-wrap items-center mt-6 w-full text-sm font-medium text-center text-gray-500">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-4 sm:mb-0 sm:mr-4">
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                activeStep === index
                  ? "bg-skyBlue text-white border-bg-skyBlue"
                  : "bg-gray-200 text-gray-500 border-gray-300"
              }`}
            >
              {index + 1}
            </span>
            <span className="mx-2 sm:mx-4 text-gray-500">{step}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {activeStep === 0 && (
          <>
            <h5 className="text-md font-semibold">Personal data</h5>
            <p className="text-gray-500">
              Fill all employee personal basic information data
            </p>
            <form className="space-y-3 my-4 lg:w-3/4">
              <div>
                <Label htmlFor="fullName">Fullname*</Label>
                <div className="mt-1">
                  <Input
                    id="fullName"
                    type="text"
                    data-testid="fullName"
                    defaultValue=""
                    placeholder="John doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">email*</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    data-testid="email"
                    defaultValue=""
                    placeholder="employee@company.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone number*</Label>
                <div className="mt-1">
                  <Input
                    id="phoneNumber"
                    type="text"
                    data-testid="username"
                    defaultValue=""
                    placeholder="+628xxxxxxxx"
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="placeOfBirth">Place of birth*</Label>
                  <div className="mt-1">
                    <Input
                      id="placeOfBirth"
                      name="placeOfBirth"
                      type="text"
                      data-testid="placeOfBirth"
                      defaultValue=""
                      placeholder="Jakarta"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of birth*</Label>
                  <div className="mt-1">
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      data-testid="dateOfBirth"
                      defaultValue=""
                      placeholder="01-01-2010"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gender">Gender*</Label>
                  <div className="mt-1">
                    <Input
                      id="gender"
                      name="gender"
                      type="text"
                      data-testid="gender"
                      defaultValue=""
                      placeholder="Male"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status*</Label>
                  <div className="mt-1">
                    <Input
                      id="status"
                      name="status"
                      type="text"
                      data-testid="status"
                      defaultValue=""
                      placeholder="Single"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="religion">Religion*</Label>
                <div className="mt-1">
                  <Input
                    id="religion"
                    name="religion"
                    type="text"
                    data-testid="religion"
                    defaultValue=""
                    placeholder="secret"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nik">Nik *</Label>
                <div className="mt-1">
                  <Input
                    id="nik"
                    name="nik"
                    type="text"
                    data-testid="nik"
                    defaultValue=""
                    placeholder="313122311"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adress *</Label>
                <Textarea
                  id="address"
                  placeholder="Jalan Gunung Antena 1 No 11A, Denpasar Barat, Bali."
                />
              </div>
            </form>
          </>
        )}
        {activeStep === 1 && (
          <>
            <h5 className="text-md font-semibold">Employment data</h5>
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
                  <Input
                    id="departement"
                    type="text"
                    placeholder="IT Division"
                  />
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
            </form>
          </>
        )}
        {activeStep === 2 && (
          <>
            <h5 className="text-md font-semibold">Salary</h5>
            <p className="text-gray-500">Input employee salary info</p>
            <form className="my-4 lg:w-3/4">
              <div className="my-3">
                <Label htmlFor="departement">Basic salary *</Label>
                <Input
                  id="departement"
                  type="text"
                  placeholder="Rp. 5.000.000"
                />
              </div>
              <h5 className="text-md font-semibold">Bank account</h5>
              <p className="text-gray-500">
                The employee’s bank account is used for payroll
              </p>
              <div className="grid gap-6 mb-6 md:grid-cols-2 my-3">
                <div>
                  <Label htmlFor="bankName">Bank name *</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="BCA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accountNumber">Acount number *</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="123xxxxxxxxx"
                  />
                </div>
              </div>
            </form>
          </>
        )}
        {activeStep === 3 && (
          <div>
            <div className="mt-4">
              <div
                className="flex p-4 mb-4 lg:w-3/4 text-sm text-green-800 rounded-lg bg-green-50"
                role="alert"
              >
                <CircleCheck className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" />
                <div>
                  <span className="font-medium">
                    Invite the employee to access Empower HR:
                  </span>
                  <div className="mt-1.5">
                    You have successfully added employee data. To continue the
                    process, you can invite employees to access Empower.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 mb-4 lg:w-3/4 text-sm rounded-lg bg-white">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Invite to Empower
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Invite to give them access to platform using Employee Self
                    Service feature. You can do this later at settings page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-start gap-2">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateEmployee;
