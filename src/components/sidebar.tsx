import React, { useRef } from "react";
import appLogo from "../assets/app-logo2.png";
import { CircleGauge, ContactRound } from "lucide-react";

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

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
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
              <a
                href="#"
                className="flex items-center p-2 bg-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CircleGauge className="text-gray-400" />
                <span className="ms-3 text-sm text-gray-400">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ContactRound className="text-gray-400" />
                <span className="ms-3 text-sm text-gray-400">Attendance</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
