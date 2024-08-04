import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Employment,
  employmentIdSchema,
  EmploymentIdSchema,
} from "@/utils/apis/employee/type";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getEmploymentById,
  updateEmploymenId,
} from "@/utils/apis/employee/api";
import { toast } from "sonner";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-form-field";
import {
  categoriesApproval,
  categoriesJobLevel,
  categoriesPosition,
  categorisSchedule,
  categorisStatus,
} from "@/utils/constant";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";

const EditEmployment = () => {
  const navigate = useNavigate();
  const { employee_id } = useParams<{ employee_id: string }>();
  const [dataEdit, setDataEdit] = useState<Employment | null>(null);

  const form = useForm<EmploymentIdSchema>({
    resolver: zodResolver(employmentIdSchema),
    defaultValues: {
      employment_status: "",
      schedule: "",
      join_date: "",
      job_level: "",
      department: "",
      approval_line: "",
      job_position: "",
    },
  });

  const fetchEmployeeData = async () => {
    try {
      const response = await getEmploymentById(Number(employee_id));
      setDataEdit(response.data.employmentData[0]);
      form.reset(response.data.employmentData[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employee_id]);

  const onSubmit = async (data: EmploymentIdSchema) => {
    try {
      await updateEmploymenId(Number(employee_id), data);
      toast.success("Employment data updated successfully");
      navigate("/employees");
    } catch (error) {
      toast.error("Error updating employment data");
    }
  };

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
            <CustomFormSelect
              control={form.control}
              name="employment_status"
              data-testid="employment_status"
              label="Employment status "
              placeholder={
                dataEdit?.employment_status ? dataEdit.employment_status : ""
              }
              options={categorisStatus}
            />
            <CustomFormSelect
              control={form.control}
              name="schedule"
              label="schedule "
              data-testid="schedule"
              placeholder={dataEdit?.schedule ? dataEdit.schedule : ""}
              options={categorisSchedule}
            />

            <div>
              <CustomFormField
                control={form.control}
                name="join_date"
                label="Join date"
                data-testid="join_date"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder={dataEdit?.join_date ? dataEdit.join_date : ""}
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
                data-testid="job_level"
                placeholder={dataEdit?.job_level ? dataEdit.job_level : ""}
                options={categoriesJobLevel}
              />
            </div>
            <div>
              <CustomFormField
                control={form.control}
                name="department"
                label="Department"
                data-testid="department"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder={
                      dataEdit?.department ? dataEdit.department : ""
                    }
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
                data-testid="approval_line"
                placeholder={
                  dataEdit?.approval_line ? dataEdit.approval_line : ""
                }
                options={categoriesApproval}
              />
            </div>
            <div>
              <CustomFormSelect
                control={form.control}
                name="job_position"
                label="Job positionroval "
                data-testid="job_position"
                placeholder={
                  dataEdit?.job_position ? dataEdit.job_position : ""
                }
                options={categoriesPosition}
              />
            </div>
          </div>
          <div className="flex justify-start gap-2">
            <Link to={"/employees"}>
              <Button variant="outline" data-testid="button-cancel">
                Cancel
              </Button>
            </Link>
            <Button
              className="pl-4 pr-4"
              type="submit"
              data-testid="button-submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save Employment"}
            </Button>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default EditEmployment;
