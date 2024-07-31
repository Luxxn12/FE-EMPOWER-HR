import { CustomFormField, CustomFormSelect } from "@/components/custom-form-field";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPersonalById, updatePersonalEmployee } from "@/utils/apis/employee/api";
import { Personal, updatePersonalSchema, UpdatePersonalSchema } from "@/utils/apis/employee/type";
import { categoriesGender, categoriesReligion, categoriesStatus } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditPersonal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();

  const form = useForm<UpdatePersonalSchema>({
    resolver: zodResolver(updatePersonalSchema),
  })


  const [employeeData, setEmployeeData] = useState<Personal>();

  useEffect(() => {
    const getIdEmployee = async () => {
      try {
        const resp = await getPersonalById(employee_id);
        setEmployeeData(resp.data);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getIdEmployee();
  }, []);

  useEffect(() => {
    if (employeeData) {
      form.setValue('name', employeeData.name);
      form.setValue('email', employeeData.email);
      form.setValue('phone', employeeData.phone);
      form.setValue('place_birth', employeeData.place_birth);
      form. setValue('birth_date', employeeData.birth_date);
      form.setValue('status', employeeData.status);
      form.setValue('gender', employeeData.gender);
      form.setValue('religion', employeeData.religion);
      form.setValue('nik', employeeData.nik);
      form.setValue('address', employeeData.address);
    }
  }, [employeeData]);

  async function onSubmit(data: UpdatePersonalSchema,) {
    try {
      const resp = await updatePersonalEmployee(data, employee_id);
      toast.success(resp.status);
      navigate("/employees");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      {JSON.stringify(employeeData)}
      <h5 className="text-xl text-gray-500 font-semibold">Edit Personal</h5>
      <p className="text-gray-500">
        Fill all employee personal basic information data
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 my-4 lg:w-3/4">
          <div>
            <CustomFormField
              control={form.control}
              name="profile_picture"
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
            <CustomFormField control={form.control} name="name" label="Fullname">
              {(field) => (
                <Input
                  {...field}
                  placeholder="John doe"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={
                    field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div>
            <CustomFormField control={form.control} name="email" label="Email">
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
            <CustomFormField control={form.control} name="phone" label="Phone">
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
              <CustomFormField control={form.control} name="place_birth" label="Place birth">
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
              <CustomFormField control={form.control} name="birth_date" label="Birth date">
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
            <div>
              <CustomFormSelect
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select a Category"
                options={categoriesGender}
              />
            </div>
            <div>
              <CustomFormSelect
                control={form.control}
                name="status"
                label="Status"
                placeholder="Select a Category"
                options={categoriesStatus}
              />
            </div>
          </div>
          <div>
            <CustomFormSelect
              control={form.control}
              name="religion"
              label="Religion"
              placeholder="Select a Category"
              options={categoriesReligion}
            />
          </div>
          <div>
            <CustomFormField control={form.control} name="nik" label="Nik">
              {(field) => (
                <Input
                  {...field}
                  placeholder="3510101212990008"
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
            <Button variant="outline">Cancel</Button>
            <Button className="pl-4 pr-4" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Personal"}
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default EditPersonal;
