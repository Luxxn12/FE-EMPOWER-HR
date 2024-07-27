import MainLayout from "@/components/layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const DetailEmployee = () => {
  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Detail Employee</h5>
      <div className="flex flex-col items-center my-5">
        <Avatar className="w-28 h-28">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center">
            CN
          </AvatarFallback>
        </Avatar>
        <h5 className="font-semibold text-lg my-3">Employee name</h5>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="grid w-1/2 grid-cols-2">
          <TabsTrigger value="account">Personal</TabsTrigger>
          <TabsTrigger value="password">Employement</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="">
            <div className="flex justify-between">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Data
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your email address is your identity on Talenta is used to log
                  in.
                </p>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <Link
                  to="/employees/edit/personal"
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Edit
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    John Doe
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    johndoe@example.com
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Place of birt
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    bali, indonesia
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Birtdate
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    01-01-2001
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    male
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Religion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    secret
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Nik</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    secret
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St
                    <br />
                    Anytown, USA 12345
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="">
            <div className="flex justify-between">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Employment Data
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your data information related to company.
                </p>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <Link
                  to="/employees/edit/employment"
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Edit
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Company name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Alterra Academy
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Employee ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    EMP12ID
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Employment status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Permanent
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Join date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    24 Juli 2024
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Accounting
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Schedule
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Office Schedule
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Job position
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Manager HRG & GA
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Job Level
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Manager
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Approval line
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Moh Alif Al Lukman
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DetailEmployee;
