import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getEmployeeById } from "@/utils/apis/employee/api";
import { updatePersonalSchema, UpdatePersonalSchema } from "@/utils/apis/employee/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditPersonal = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdatePersonalSchema>({
    resolver: zodResolver(updatePersonalSchema),
  })

  useEffect(() => {
    
  }, [])


  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Edit Personal</h5>
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
        <div className="flex justify-start gap-2">
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default EditPersonal;
