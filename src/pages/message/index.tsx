import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Message = () => {
  return (
    <MainLayout
      title="Empower HR - Message"
      description="User Empower HR - Message"
    >
      <section className="lg:container py-8">
        <div className="flex justify-between">
          <h5 className="text-lg text-gray-500 font-semibold">Messages</h5>
          <div className="flex gap-2">
            <Button>Approval list</Button>
            <Button>New message</Button>
          </div>
        </div>
        <div className="bg-white border-gray-900 my-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 p-4 flex items-center justify-center">
              <Mail
                className="text-gray-500"
                style={{ width: 50, height: 50 }}
              />
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-2">Message title</h2>
              <p className="text-gray-600 text-sm">
                Download Attendance Record XLS.
              </p>
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-end">
              <h3 className="mb-2 text-sm">2024-07-25</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  Delete
                </Button>
                <Button size="sm" variant="outline">
                  Read
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-gray-900 my-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 p-4 flex items-center justify-center">
              <Mail
                className="text-gray-500"
                style={{ width: 50, height: 50 }}
              />
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-2">Message title</h2>
              <p className="text-gray-600 text-sm">
                Download Attendance Record XLS.
              </p>
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-end">
              <h3 className="mb-2 text-sm">2024-07-25</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  Delete
                </Button>
                <Button size="sm" variant="outline">
                  Read
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Message;
