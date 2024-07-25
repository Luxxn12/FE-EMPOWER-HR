import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Message from "@/pages/message";
import Dashboard from "@/pages/dashboard";
import Attendance from "@/pages/attendance";
import LiveAttendance from "@/pages/attendance/live-attendance";
import CreateMessage from "@/pages/message/create";
import Employees from "@/pages/employee";
import DetailAttendance from "@/pages/attendance/detail-attendance";
import SettingAttendance from "@/pages/attendance/setting-attendance";
import AddSchedule from "@/pages/attendance/add-schedule";
import CreateEmployee from "@/pages/employee/create";
import DetailEmployee from "@/pages/employee/show";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
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
              path: "show",
              element: <DetailEmployee />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
