
import { Input } from './ui/input';
import { PayrollSchema } from '@/utils/apis/employee/type';
import { UseFormReturn } from 'react-hook-form';
import { Form } from './ui/form';
import { CustomFormField, CustomFormSelect } from './custom-form-field';
import { categorisBank } from '@/utils/constant';

type PayrollDataProps = {
  form: UseFormReturn<PayrollSchema, any, undefined>
  onSubmit: (data: PayrollSchema) => void
};

function FormPayroll({
  form,
  onSubmit
}: PayrollDataProps) {
  return (
    <>
      <h5 className="text-md font-semibold">Salary</h5>
      <p className="text-gray-500">Input employee salary info</p>
      <Form {...form}>
        <form className="my-4 lg:w-3/4" onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormField control={form.control} name="salary" label="Salary">
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
          <h5 className="text-md font-semibold">Bank account</h5>
          <p className="text-gray-500">
            The employee’s bank account is used for payroll
          </p>
          <div className="grid gap-6 mb-6 md:grid-cols-2 my-3">
            <CustomFormSelect
              control={form.control}
              name="bank_name"
              label="Bank Name"
              placeholder="Select a Category"
              options={categorisBank}
            />
            <CustomFormField control={form.control} name="account_number" label="Account number">
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
        </form>
      </Form>
    </>
  );
}

export default FormPayroll;
