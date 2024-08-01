
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EmploymentById, employmentIdSchema, EmploymentIdSchema } from "@/utils/apis/employee/type";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEmploymentById, updateEmploymenId } from "@/utils/apis/employee/api";
import { toast } from "sonner";
import { CustomFormField, CustomFormSelect } from "@/components/custom-form-field";
import { categoriesApproval, categoriesJobLevel, categoriesPosition, categorisSchedule } from "@/utils/constant";
import { Form } from "@/components/ui/form";

const EditEmployment = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();

  const [employmentData, setEmploymentData] = useState<EmploymentById>();

  const form = useForm<EmploymentIdSchema>({
    resolver: zodResolver(employmentIdSchema),
  })

  useEffect(() => {
    const getIdEmployee = async () => {
      try {
        const resp = await getEmploymentById(employee_id);
        setEmploymentData(resp.data);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getIdEmployee();
  }, []);

  useEffect(() => {
    if (employmentData) {
      form.setValue('manager', employmentData.manager);
      form.setValue('schedule', employmentData.schedule);
      form.setValue('join_date', employmentData.join_date);
      form.setValue('job_level', employmentData.job_level);
      form.setValue('department', employmentData.department);
      form.setValue('approval_line', employmentData.approval_line);
      form.setValue('job_position', employmentData.job_position);
    }
  }, [employmentData])

  async function onSubmit(data: EmploymentById,) {
    try {
       await updateEmploymenId(data, employee_id);
      toast.success("success");
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
      <h5 className="text-xl text-gray-500 font-semibold">Edit Employement</h5>
      <p className="text-gray-500">
        Fill all employee data information related to company
      </p>
      <Form {...form}>
        <form
          id="forms"
          className="space-y-3 my-4 lg:w-3/4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <CustomFormField
                control={form.control}
                name="manager"
                label="manager"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="imam"
                    type="text"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
            </div>
            <CustomFormSelect
              control={form.control}
              name="schedule"
              label="schedule "
              placeholder="Select a Category"
              options={categorisSchedule}
            />

            <div>
              <CustomFormField
                control={form.control}
                name="join_date"
                label="Join date"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="+628xxxxxxxx"
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
                name="job_level"
                label="Job level "
                placeholder="Select a Category"
                options={categoriesJobLevel}
              />
            </div>
            <div>
              <CustomFormField
                control={form.control}
                name="department"
                label="Department"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Department"
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
                name="approval_line"
                label="Approval line "
                placeholder="Select a Category"
                options={categoriesApproval}
              />
            </div>
            <div>
              <CustomFormSelect
                control={form.control}
                name="job_position"
                label="Job positionroval "
                placeholder="Select a Category"
                options={categoriesPosition}
              />
            </div>
          </div>
          <div className="flex justify-start gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="pl-4 pr-4" type="submit">
              Save Employment
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default EditEmployment;
