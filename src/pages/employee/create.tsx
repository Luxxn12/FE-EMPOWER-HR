import { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { employmentSchema, EmploymentSchema, FormData, payrollSchema, PayrollSchema, personalSchema, PersonalSchema } from "@/utils/apis/employee/type";
import { FormPersonal } from "@/components/formPersonal";
import FormEmployment from "@/components/formEmployment";
import FormPayroll from "@/components/formPayroll";
import { useMultistepForm } from "@/components/useMultiStepForm";
import { createEmployee } from "@/utils/apis/employee/api";
import { toast } from "sonner";

const INITIAL_DATA: FormData = {
}

const CreateEmployee = () => {
  const [data, setData] = useState(INITIAL_DATA)

  const formPersonal = useForm<PersonalSchema>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      place_birth: "",
      birth_date: "",
      status: "",
      gender: "",
      religion: "",
      nik: "",
      address: "",
    },
  });
  const formEmployment = useForm<EmploymentSchema>({
    resolver: zodResolver(employmentSchema),
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
  const formPayroll = useForm<PayrollSchema>({
    resolver: zodResolver(payrollSchema),
    defaultValues: {
      salary: "",
      bank_name: "",
      account_number: "",
    },
  });

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <FormPersonal {...data} updateFields={updateFields} />,
      <FormEmployment {...data} updateFields={updateFields} />,
      <FormPayroll {...data} updateFields={updateFields} />,
    ])

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      if (!isLastStep) return next() 
      try {
        await createEmployee(data)
        toast.success("data Success")
      } catch (error: any) {
        alert(error.message)
      }
    }

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Add Employees</h5>

      <div className="flex flex-wrap items-center mt-6 w-full text-sm font-medium text-center text-gray-500">
      </div>
      <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
             {currentStepIndex + 1} / {steps.length}
          </div>
        <div className="mt-6">
          {step}
        </div>

        <div className="mt-6 flex justify-start gap-2">
          {!isFirstStep && (
            <Button type="button" onClick={back}>
              Back
            </Button>
          )}
          <Button type="submit">{isLastStep ? "Finish" : "Next"}</Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default CreateEmployee;
