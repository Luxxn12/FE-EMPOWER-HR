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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
