import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Message from "@/pages/message";
import Dashboard from "@/pages/dashboard";
import LiveAttendance from "@/pages/attendance/live-attendance";
import CreateMessage from "@/pages/message/create";
import Employees from "@/pages/employee";
import DetailAttendance from "@/pages/attendance/detail-attendance";
import SettingAttendance from "@/pages/attendance/admin/setting-attendance";
import AddSchedule from "@/pages/attendance/admin/add-schedule";
import EditSchedule from "@/pages/attendance/admin/edit-schedule";
import CreateEmployee from "@/pages/employee/create";
import DetailEmployee from "@/pages/employee/show";
import Companies from "@/pages/companies";
import EditCompanies from "@/pages/companies/edit-companies";
import Leaves from "@/pages/leaves";
import EditPersonal from "@/pages/employee/edit/personal";
import EditEmployment from "@/pages/employee/edit/empoloyment";
import RequestLeaves from "@/pages/leaves/request-leaves";
import DetailLeave from "@/pages/leaves/detail-leave";
import Payroll from "@/pages/payroll";
import SettingPayroll from "@/pages/payroll/setting";
import EditPayroll from "@/pages/payroll/edit";
import Attendance from "@/pages/attendance/admin";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/message",
          children: [
            {
              index: true,
              element: <Message />,
            },
            {
              path: "create",
              element: <CreateMessage />,
            },
          ],
        },
        {
          path: "/employees",
          children: [
            {
              index: true,
              element: <Employees />,
            },
            {
              path: "create",
              element: <CreateEmployee />,
            },
            {
              path: "/employees/:employee_id",
              element: <DetailEmployee />,
            },
            {
              path: "/employees/personal/:employee_id",
              element: <EditPersonal />,
            },
            {
              path: "/employees/employment/:employee_id",
              element: <EditEmployment />,
            },
          ],
        },
        {
          path: "/payroll",
          children: [
            {
              index: true,
              element: <Payroll />,
            },
            {
              path: "setting",
              element: <SettingPayroll />,
            },
            {
              path: "edit",
              element: <EditPayroll />,
            },
          ],
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/attendance",
          element: <Attendance />,
        },
        {
          path: "/attendance/live-attendance",
          element: <LiveAttendance />,
        },
        {
          path: "/attendance/:attendance_id",
          element: <DetailAttendance />,
        },
        {
          path: "/attendance/settings",
          element: <SettingAttendance />,
        },
        {
          path: "/attendance/settings/schedule",
          element: <AddSchedule />,
        },
        {
          path: "/attendance/settings/schedule/:schedule_id/edit",
          element: <EditSchedule />,
        },
        {
          path: "/companies",
          element: <Companies />,
        },
        {
          path: "/companies/edit",
          element: <EditCompanies />,
        },
        {
          path: "/leaves",
          element: <Leaves />,
        },
        {
          path: "/leaves/request-leaves",
          element: <RequestLeaves />,
        },
        {
          path: "/leaves/:leave_id",
          element: <DetailLeave />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
