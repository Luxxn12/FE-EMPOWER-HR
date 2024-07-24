import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages";
import ProtectedRoute from "./protected-route";

const App = () => {

    const router = createBrowserRouter([
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <Home />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />
}

export default App