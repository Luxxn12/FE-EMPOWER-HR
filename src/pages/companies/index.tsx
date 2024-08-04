import MainLayout from "@/components/layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCompanies } from "@/utils/apis/companies/api";
import { ICompaniesIndex } from "@/utils/apis/companies/type";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Companies() {
  const [isData, setData] = useState<ICompaniesIndex>();

  const fetchData = async () => {
    try {
      const response = await getCompanies();
      setData(response.data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout title="" description="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link to={"/companies/edit"}>
          <Button variant={"outline"}>Edit componies</Button>
        </Link>
      </div>
      <div className="flex justify-center mt-4 ">
        <Avatar style={{ width: 200, height: 200 }}>
          <AvatarImage src={isData?.company_picture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div
        className="mt-5
      "
      >
        <div className=" p-6 px-10 rounded-md bg-white">
          <div className="grid xl:grid-cols-2 grid-cols-1">
            <div className="flex flex-col xl:py-4 py-0">
              <div className="flex flex-col mb-4">
                <text className="font-bold">Company name</text>
                <text className="mt-1">{isData?.company_name}</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Email</text>
                <text className="mt-1">{isData?.email}</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Phone Number</text>
                <text className="mt-1">{isData?.phone}</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Signature</text>
                <img
                  className="mt-1"
                  src={isData?.signature}
                  alt={isData?.signature}
                  width={"50%"}
                  height={"auto"}
                />
              </div>
            </div>
            <div className="flex flex-col xl:py-4 py-0">
              <div className="flex flex-col mb-4">
                <text className="font-bold">Npwp</text>
                <text className="mt-1">{isData?.npwp}</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Company Address</text>
                <text className="mt-1">{isData?.company_address}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
