import AuthLayout from "@/components/layouts/auth-layout";
import appLogo from "../../assets/app-logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, RegisterSchema } from "@/utils/apis/auth/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { userRegister } from "@/utils/apis/auth/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      work_email: "",
      phone_number: "",
      password: "",
      department: "",
      job_position: "",
      company_name: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    setIsLoading(true);
    try {
      const resp = await userRegister(data);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Empower HR - Register" description="Register Empower HR">
      <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="lg:px-0 px-2 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white border px-4 pb-4 pt-6 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
            <img src={appLogo} alt="" className="w-2/4 -ml-3 my-2" />
            <h1 className="text-xl font-semibold text-gray-600 dark:text-white">
              Create Empower account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 my-4">
              <div>
                <Label htmlFor="fullName">Fullname *</Label>
                <div className="mt-1">
                  <Input
                    id="fullName"
                    type="text"
                    data-testid="fullName"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="workEmail">Work email *</Label>
                <div className="mt-1">
                  <Input
                    id="workEmail"
                    type="email"
                    data-testid="workEmail"
                    {...register("work_email")}
                    placeholder="user@company.com"
                  />
                  {errors.work_email && (
                    <p className="text-red-500 text-sm">
                      {errors.work_email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone number *</Label>
                <div className="mt-1">
                  <Input
                    id="phoneNumber"
                    type="text"
                    data-testid="phoneNumber"
                    placeholder="+628xxxxxxxx"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    data-testid="password"
                    placeholder="**********"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    type="text"
                    data-testid="department"
                    placeholder="Technical support"
                    {...register("department")}
                  />
                  {errors.department && (
                    <p className="text-red-500 text-sm">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="jobPosition">Job position *</Label>
                <div className="mt-1">
                  <Input
                    id="jobPosition"
                    type="text"
                    data-testid="jobPosition"
                    placeholder="Developer"
                    {...register("job_position")}
                  />
                  {errors.job_position && (
                    <p className="text-red-500 text-sm">
                      {errors.job_position.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="companyName">Company name *</Label>
                <div className="mt-1">
                  <Input
                    id="companyName"
                    type="text"
                    data-testid="companyName"
                    placeholder="PT. Empower HR"
                    {...register("company_name")}
                  />
                  {errors.company_name && (
                    <p className="text-red-500 text-sm">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Button
                  data-testid="register"
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex space-x-2">
              <a
                href="/kebijakan-privasi"
                className="text-gray-400 hover:underline text-xs"
              >
                Kebijakan privasi
              </a>
              <span className="-mt-1">•</span>
              <a
                href="/ketentuan-pengguna"
                className="text-gray-400 hover:underline text-xs"
              >
                Ketentuan pengguna
              </a>
              <span className="-mt-1">•</span>
              <a
                href="/tentang-empower-hr"
                className="text-gray-400 hover:underline text-xs"
              >
                Tentang Empower HR
              </a>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
