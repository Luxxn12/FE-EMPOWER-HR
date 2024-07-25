import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CreateMessage = () => {
  return (
    <MainLayout
      title="Empower HR - Message"
      description="User Empower HR - Message"
    >
      <section className="lg:container py-8">
        <h5 className="text-lg text-gray-500 font-semibold">New messages</h5>
        <div className="px-8 py-6 mt-5 bg-white shadow border">
          <form className="space-y-4">
            <div>
              <Label htmlFor="recipient *">Recipient *</Label>
              <div className="mt-1">
                <Select>
                  <SelectTrigger className="w-">
                    <SelectValue placeholder="All employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-employee">All employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <div className="mt-1">
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  data-testid="subject"
                  defaultValue=""
                  placeholder="Subject"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message *</Label>
              <div className="mt-1">
                <Textarea id="message" name="message" placeholder="Download Attendance Record XLS" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">Cancel</Button>
                <Button size="sm">Submit</Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default CreateMessage;
