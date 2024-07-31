import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  employmentSchema,
  EmploymentSchema,
  payrollSchema,
  PayrollSchema,
  personalSchema,
  PersonalSchema,
} from "@/utils/apis/employee/type";
import { FormPersonal } from "@/components/formPersonal";
import FormEmployment from "@/components/formEmployment";
import FormPayroll from "@/components/formPayroll";
import { useMultistepForm } from "@/utils/hooks/useMultiStepForm";
import { createEmployee } from "@/utils/apis/employee/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
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

  const onSubmit = async () => {
    if (!isLastStep) return next();

    try {
      const body = {
        ...formPersonal.getValues(),
        ...formEmployment.getValues(),
        ...formPayroll.getValues(),
      };
      await createEmployee(body);
      console.log(body)
      toast.success(`Employee created successfully`);
      navigate("/employees")
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <FormPersonal form={formPersonal} onSubmit={onSubmit} />,
      <FormEmployment form={formEmployment} onSubmit={onSubmit} />,
      <FormPayroll form={formPayroll} onSubmit={onSubmit} />,
    ]);

  return (
    <MainLayout
      title="Empower HR - Employees"
      description="Empower HR - Employees"
    >
      <h5 className="text-xl text-gray-500 font-semibold">Add Employees</h5>

      <div className="flex flex-wrap items-center mt-6 w-full text-sm font-medium text-center text-gray-500"></div>
      <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
        {currentStepIndex + 1} / {steps.length}
      </div>
      <div className="mt-6">{step}</div>

      <div className="mt-6 flex justify-start gap-2">
        {!isFirstStep && (
          <Button type="button" onClick={back}>
            Back
          </Button>
        )}
        <Button type="submit" form="forms">
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateEmployee;
