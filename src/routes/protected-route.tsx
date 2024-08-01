import { useAuth } from "@/utils/contexts/token";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { token, role } = useAuth()
  const { pathname } = useLocation()

  const authProtected = ["/login", "/register"]
  const protectedByToken = [
    "/message",
    "/message/create",
    "/employees",
    "/employees/create",
   "/employees/show",
    "/employees/personal/:employee_id",
    "/employees/employment/:employee_id",
    "/employees/:employee_id",
    "/payroll",
    "/payroll/setting",
    "/payroll/:payroll_id",
    "/attendance",
    "/attendance/live-attendance",
    "/attendance/:attendance_id",
    "/attendance/settings",
    "/attendance/settings/schedule",
    "/attendance/settings/schedule/:schedule_id/edit",
    "/companies",
    "/companies/edit",
    "/leaves",
    "/leaves/request-leaves",
    "/leaves/:leave_id",
    "/dashboard",
  ]

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/dashboard" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }



  return <Outlet />
}

export default ProtectedRoute;
