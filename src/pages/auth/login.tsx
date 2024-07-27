import AuthLayout from "@/components/layouts/auth-layout";
import appLogo from "../../assets/app-logo.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/utils/apis/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userLogin } from "@/utils/apis/auth/api";
import { useAuth } from "@/utils/contexts/token";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    setIsLoading(true);
    try {
      const resp = await userLogin(data);
      setToken(resp.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <AuthLayout title="Empower HR - Login" description="Login Empower HR">
      <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="lg:mt-20 md:mt-12 mt-4 lg:px-0 px-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white border dark:bg-gray-700 px-4 pb-4 pt-6 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
            <img src={appLogo} alt="" className="w-3/4 -ml-3 my-2" />
            <h1 className="text-xl font-semibold text-gray-600 dark:text-white">
              Sign in
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="text"
                  data-testid="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  data-testid="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  data-testid="login"
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Sign in..." : "Sign in"}
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

export default Login;
