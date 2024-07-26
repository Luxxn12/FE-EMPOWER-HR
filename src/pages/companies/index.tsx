import MainLayout from "@/components/layouts/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Companies() {
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
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQprurNAQRxVr4U41l33XS3epf10AWgUU3UwWdbVsxn3lPn08KGauhaW_viFWJ4JVxnms4&usqp=CAU" />
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
                <text className="mt-1">Name Perusahaan</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Email</text>
                <text className="mt-1">expemple@gmail.com</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Phone Number</text>
                <text className="mt-1">0289182091</text>
              </div>
            </div>
            <div className="flex flex-col xl:py-4 py-0">
              <div className="flex flex-col mb-4">
                <text className="font-bold">Npwp</text>
                <text className="mt-1">128182012001</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Address</text>
                <text className="mt-1">Jalan Batu Bara</text>
              </div>
              <div className="flex flex-col mb-4">
                <text className="font-bold">Signature</text>
                <text className="mt-1">Signature</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
