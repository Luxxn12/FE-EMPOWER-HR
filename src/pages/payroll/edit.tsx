import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditPayroll = () => {
  return (
    <MainLayout
      title="Empower HR - Payroll"
      description="Empower HR - Edit Payroll"
    >
      <form action="" className="lg:w-3/4">
        <div>
          <Label htmlFor="fullName">Fullname*</Label>
          <div className="mt-1">
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="mt-3">
            <Label htmlFor="bankName">Bank name*</Label>
            <div className="mt-1">
              <Input
                id="bankName"
                type="text"
                data-testid="bankName"
                defaultValue=""
                placeholder="BCA"
              />
            </div>
          </div>
          <div className="mt-3">
            <Label htmlFor="bankAccount">Bank Account*</Label>
            <div className="mt-1">
              <Input
                id="bankAccount"
                type="text"
                data-testid="bankAccount"
                defaultValue=""
                placeholder="1234xxxxxxxx"
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Label htmlFor="basicSalary">Basic salary*</Label>
          <div className="mt-1">
            <Input
              id="basicSalary"
              type="text"
              data-testid="basicSalary"
              defaultValue=""
              placeholder="1234xxxxxxxx"
            />
          </div>
        </div>
        <div className="flex justify-start gap-2 my-3">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default EditPayroll;
