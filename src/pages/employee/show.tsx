import MainLayout from "@/components/layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmployeeById } from "@/utils/apis/employee/api";
import { IEmployeeById } from "@/utils/apis/employee/type";
import { useAuth } from "@/utils/contexts/token";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const DetailEmployee = () => {
  const [isDataDetail, setDataDetail] = useState<IEmployeeById[]>([]);
  const {role} = useAuth()
  const { employee_id } = useParams();

  async function fetchEmployee() {
    try {
      const response = await getEmployeeById(employee_id);
      setDataDetail(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-2xl  font-semibold">Detail Employee</h5>

      {isDataDetail.map((item) => {
        return (
          <div key={item.id}>
            <div className="flex flex-col items-center my-5">
              <Avatar className="w-28 h-28">
                <AvatarImage
                  src={item.profile_picture}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="w-full h-full flex items-center justify-center">
                  CN
                </AvatarFallback>
              </Avatar>
              <h5 className="font-semibold text-lg my-3">{item.name}</h5>
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
                        Your email address is your identity on Talenta is used
                        to log in.
                      </p>
                    </div>
                    {role == "admin" ? (
                    <div className="px-4 py-5 sm:px-6">
                      <Link
                        to={`/employees/personal/${item.id}`}
                        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Edit
                      </Link>
                    </div>
                    ) : null}
                  </div>

                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.name}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.phone_number}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.email}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Place of birt
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.place_birth}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Birtdate
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.birth_date}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.gender}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Religion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.religion}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Nik
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.nik}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {item.address}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="password">
                {item.EmploymentData.map((employment) => {
                  return (
                    <div className="" key={employment.join_date}>
                      <div className="flex justify-between">
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Employment Data
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Your data information related to company.
                          </p>
                        </div>
                        {role == "admin" ? (

                          <div className="px-4 py-5 sm:px-6">
                            <Link
                              to={`/employees/employment/${item.id}`}
                              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                              Edit
                            </Link>
                          </div>
                        ) : null}
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Join date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {employment.join_date}
                            </dd>
                          </div>
                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Department
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {employment.department}
                            </dd>
                          </div>
                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Schedule
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {employment.schedule}
                            </dd>
                          </div>
                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Job position
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {employment.job_position}
                            </dd>
                          </div>
                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Job Level
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {employment.job_level}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>
            </Tabs>
          </div>
        );
      })}
    </MainLayout>
  );
};

export default DetailEmployee;
