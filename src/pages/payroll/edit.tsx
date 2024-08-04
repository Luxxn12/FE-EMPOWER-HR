import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-form-field";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPayroll } from "@/utils/apis/payroll/api";
import {
  editPayrollSchema,
  EditPayrollSchemaById,
} from "@/utils/apis/payroll/type";
import { categorisBank } from "@/utils/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditPayroll = () => {
  const navigate = useNavigate();
  const form = useForm<EditPayrollSchemaById>({
    resolver: zodResolver(editPayrollSchema),
    defaultValues: {
      bank_name: "",
      acoount_num: "",
      salary: "",
    },
  });

  async function onSubmit(data: EditPayrollSchemaById) {
    try {
      const response = await createPayroll(data);
      toast.success(response.message);
      navigate("/payroll");
    } catch (error: any) {
      toast.error(error);
    }
  }
  return (
    <MainLayout
      title="Empower HR - Payroll"
      description="Empower HR - Edit Payroll"
    >
      <Form {...form}>
        <form
          action=""
          className="lg:w-3/4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="mt-3">
              <CustomFormSelect
                control={form.control}
                name="bank_name"
                label="Bank Name"
                data-testid="bank_name"
                placeholder="Select a Category"
                options={categorisBank}
              />
            </div>
            <div className="mt-3">
              <CustomFormField
                control={form.control}
                name="acoount_num"
                label="Bank Account"
                data-testid="acoount_num"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="123xxxxxxxxx"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
            </div>
          </div>
          <div className="mt-3">
            <CustomFormField
              data-testid="salary"
              control={form.control}
              name="salary"
              label="Salary"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Rp. 5.000.000"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          </div>
          <div className="flex justify-start gap-2 my-3">
            <Button type="submit" data-testid="button-submit">
              Submit
            </Button>
            <Link to={"/payroll"}>
              <Button variant="outline" data-testid="button-cancel">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </MainLayout>
  );
};

export default EditPayroll;
