import { EmploymentSchema } from "@/utils/apis/employee/type";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { Form } from "./ui/form";
import { CustomFormField, CustomFormSelect } from "./custom-form-field";
import {
  categoriesApproval,
  categoriesJobLevel,
  categoriesPosition,
  categorisSchedule,
  categorisStatus,
} from "@/utils/constant";

type EmploymentDataProps = {
  form: UseFormReturn<EmploymentSchema, any, undefined>;
  onSubmit: () => void;
};

function FormEmployment({ form, onSubmit }: EmploymentDataProps) {
  return (
    <>
      <h5 className="text-md font-semibold">Employment data</h5>
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
              placeholder="Select a Category"
              options={categorisStatus}
            />
            <CustomFormSelect
              control={form.control}
              name="schedule"
              data-testid="schedule"
              label="schedule "
              placeholder="Select a Category"
              options={categorisSchedule}
            />

            <div>
              <CustomFormField
                control={form.control}
                name="join_date"
                data-testid="join_date"
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
                data-testid="job_level"
                label="Job level "
                placeholder="Select a Category"
                options={categoriesJobLevel}
              />
            </div>
            <div>
              <CustomFormField
                control={form.control}
                name="department"
                data-testid="department"
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
                data-testid="approval_line"
                label="Approval line "
                placeholder="Select a Category"
                options={categoriesApproval}
              />
            </div>
            <div>
              <CustomFormSelect
                control={form.control}
                name="job_position"
                data-testid="job_position"
                label="Job position "
                placeholder="Select a Category"
                options={categoriesPosition}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default FormEmployment;
