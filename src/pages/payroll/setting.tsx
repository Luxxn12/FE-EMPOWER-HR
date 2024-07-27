import { DatePicker } from "@/components/date-picker";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SettingPayroll = () => {
  return (
    <MainLayout
      title="Empower HR - Payroll"
      description="Empower HR - Setting Payroll"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Setting payroll</h5>
      <h5 className="my-2 text-gray-700">Schedule</h5>
      <form action="" className="mt-2">
        <div className="flex flex-col">
          <Label className="mb-2">Date</Label>
          <DatePicker />
          <span className="text-xs text-gray-400">Payroll will be scheduled on this date</span>
        </div>
        <div className="flex gap-2 my-2">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>

        </div>
      </form>
    </MainLayout>
  );
};

export default SettingPayroll;
