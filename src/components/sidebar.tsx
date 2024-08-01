import React, { useEffect, useRef, useState } from "react";
import appLogo from "../assets/app-logo2.png";
import {
  Banknote,
  Building2,
  CalendarClock,
  CircleGauge,
  ContactRound,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/contexts/token";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onClickOutside: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  //   toggleSidebar,
  onClickOutside,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const isActive = (paths: string[]): boolean => {
    return paths.includes(activeMenu);
  };

  const { role } = useAuth();

  const attendanceLink = role === "admin" ? "/attendance" : "/attendance-user";

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-red/50 backdrop-blur-sm z-30"
          onClick={onClickOutside}
        />
      )}

      <aside
        id="default-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 shadow border h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
          <img src={appLogo} alt="app-logo" className="w-4/5 mt-2" />
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <ul className="space-y-2 font-medium my-4">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive(["/dashboard"])
                    ? "bg-white dark:bg-gray-700 text-blue-500"
                    : ""
                }`}
              >
                <CircleGauge />
                <span className="ms-3 text-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={attendanceLink}
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive([
                    "/attendance",
                    "/attendance/live-attendance",
                    "/attendance/settings",
                    "/attendance/settings/schedule",
                    "/attendance-user"
                  ])
                    ? "bg-white dark:bg-gray-700 text-blue-500"
                    : ""
                }`}
              >
                <ContactRound />
                <span className="ms-3 text-sm">Attendance</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaves"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive(["/leaves"])
                    ? "bg-white dark:bg-gray-700 text-blue-500"
                    : ""
                }
                  ${
                    activeMenu === "/leaves/request-leaves"
                      ? "bg-white dark:bg-gray-700 text-blue-500"
                      : ""
                  }
                    `}
              >
                <CalendarClock />
                <span className="ms-3 text-sm">Leaves</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive(["/payroll", "/payroll/setting"])
                    ? "bg-white dark:bg-gray-700 text-blue-500"
                    : ""
                }`}
              >
                <Banknote />
                <span className="ms-3 text-sm">Payroll</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive([
                    "/employees",
                    "/employees/create",
                    "/employees/show",
                    "/employees/edit/personal",
                    "/employees/edit/employment",
                  ])
                    ? "bg-white dark:bg-gray-700 text-blue-500"
                    : ""
                }`}
              >
                <UsersRound />
                <span className="ms-3 text-sm">Employees</span>
              </Link>
            </li>
            {role !== "employees" && (
              <li>
                <Link
                  to="/companies"
                  className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    isActive(["/companies", "/companies/edit"])
                      ? "bg-white dark:bg-gray-700 text-blue-500"
                      : ""
                  }`}
                >
                  <Building2 />
                  <span className="ms-3 text-sm">Companies</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
