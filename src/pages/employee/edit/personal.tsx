import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-form-field";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getEmploymentById,
  updatePersonalEmployee,
} from "@/utils/apis/employee/api";
import {
  PersonalID,
  updatePersonalSchema,
  UpdatePersonalSchema,
} from "@/utils/apis/employee/type";
import { categoriesGender, categoriesReligion } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditPersonal = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();
  const [dataEdit, setDataEdit] = useState<PersonalID | null>(null);

  const form = useForm<UpdatePersonalSchema>({
    resolver: zodResolver(updatePersonalSchema),
    defaultValues: {
      profile_picture: new File([], ""),
      name: "",
      email: "",
      phone_number: "",
      place_birth: "",
      birth_date: "",
      gender: "",
      religion: "",
      nik: "",
      address: "",
    },
  });

  useEffect(() => {
    fetchEmployeeData();
  }, [employee_id]);

  const fetchEmployeeData = async () => {
    try {
      const response = await getEmploymentById(Number(employee_id));
      setDataEdit(response.data);
      form.reset({
        profile_picture: new File([], ""),
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        place_birth: response.data.place_birth,
        birth_date: response.data.birth_date,
        gender: response.data.gender,
        religion: response.data.religion,
        nik: response.data.nik,
        address: response.data.address,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function onSubmit() {
    const formData = new FormData();
    formData.append("profile_picture", form.watch("profile_picture"));
    formData.append("name", form.watch("name"));
    formData.append("email", form.watch("email"));
    formData.append("phone_number", form.watch("phone_number"));
    formData.append("place_birth", form.watch("place_birth"));
    formData.append("birth_date", form.watch("birth_date"));
    formData.append("gender", form.watch("gender"));
    formData.append("religion", form.watch("religion"));
    formData.append("nik", form.watch("nik"));
    formData.append("address", form.watch("address"));
    try {
      await updatePersonalEmployee(Number(employee_id), formData);
      toast.success("Employment data updated successfully");
      navigate("/employees");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating employment data");
    }
  }

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Edit Personal</h5>
      <p className="text-gray-500">
        Fill all employee personal basic information data
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 my-4 lg:w-3/4"
        >
          <div>
            <CustomFormField
              control={form.control}
              name="profile_picture"
              data-testid="profile_picture"
              label="Profile picture"
            >
              {(field) => (
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple={false}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              )}
            </CustomFormField>
          </div>
          <div>
            <CustomFormField
              control={form.control}
              name="name"
              data-testid="name"
              label="Fullname"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="John doe"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div>
            <CustomFormField
              control={form.control}
              name="email"
              data-testid="email"
              label="Email"
            >
              {(field) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="exmple@gmail.com"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div>
            <CustomFormField
              control={form.control}
              name="phone_number"
              data-testid="phone_number"
              label="Phone"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="08838028382"
                  type="tel"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <CustomFormField
                control={form.control}
                name="place_birth"
                data-testid="place_birth"
                label="Place birth"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="place birth"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
            </div>
            <div>
              <CustomFormField
                control={form.control}
                name="birth_date"
                data-testid="birth_date"
                label="Birth date"
              >
                {(field) => (
                  <Input
                    {...field}
                    type="date"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
            </div>
          </div>
          <div>
            <CustomFormSelect
              control={form.control}
              name="gender"
              data-testid="gender"
              label="Gender"
              placeholder={dataEdit?.gender ? dataEdit.gender : ""}
              options={categoriesGender}
            />
          </div>
          <div>
            <CustomFormSelect
              control={form.control}
              name="religion"
              data-testid="religion"
              label="Religion"
              placeholder={dataEdit?.religion ? dataEdit.religion : ""}
              options={categoriesReligion}
            />
          </div>
          <div>
            <CustomFormField
              control={form.control}
              name="nik"
              data-testid="nik"
              label="Nik"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder={dataEdit?.nik ? dataEdit.nik : ""}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div>
            <CustomFormField
              control={form.control}
              name="address"
              label="Address"
              data-testid="address"
            >
              {(field) => (
                <Textarea
                  {...field}
                  placeholder="Jalan Gunung Antena 1 No 11A, Denpasar Barat, Bali."
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div className="flex justify-start gap-2">
            <Button variant="outline" data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              className="pl-4 pr-4"
              type="submit"
              data-testid="button-submit"
            >
              Save Personal
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default EditPersonal;
