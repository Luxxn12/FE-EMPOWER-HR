import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages";
import ProtectedRoute from "./protected-route";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
