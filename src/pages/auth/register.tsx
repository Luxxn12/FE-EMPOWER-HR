import AuthLayout from "@/components/layouts/auth-layout";
import appLogo from "../../assets/app-logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Register = () => {
  return (
    <AuthLayout title="Empower HR - Login" description="Login Empower HR">
      <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="lg:px-0 px-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white border dark:bg-gray-700 px-4 pb-4 pt-6 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
            <img src={appLogo} alt="" className="w-3/4 -ml-3 my-2" />
            <h1 className="text-xl font-semibold text-gray-600 dark:text-white">
              Create Empower account
            </h1>
            <form className="space-y-3 my-4">
              <div>
                <Label htmlFor="fullName">Fullname*</Label>
                <div className="mt-1">
                  <Input
                    id="fullName"
                    type="text"
                    data-testid="fullName"
                    defaultValue=""
                    placeholder="John doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="companyName">Company name*</Label>
                <div className="mt-1">
                  <Input
                    id="companyName"
                    type="text"
                    data-testid="companyName"
                    defaultValue=""
                    placeholder="PT. Empower HR"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Work email*</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    data-testid="username"
                    defaultValue=""
                    placeholder="user@company.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone number*</Label>
                <div className="mt-1">
                  <Input
                    id="phoneNumber"
                    type="text"
                    data-testid="username"
                    defaultValue=""
                    placeholder="+628xxxxxxxx"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password*</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    data-testid="password"
                    defaultValue=""
                    placeholder="**********"
                  />
                </div>
              </div>

              <div>
                <button
                  data-testid="login"
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-skyBlue px-4 py-2 text-sm font-medium text-white hover:bg-skyBlue/80"
                >
                  Create account
                </button>
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
