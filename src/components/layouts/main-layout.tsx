import React, { ReactNode, useState, useEffect } from "react";
import Sidebar from "../sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlignJustify, CircleUser, Mail } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/utils/contexts/token";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "",
  description = "",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { logout } = useAuth()

  const pathnames = pathname.replace(/^\/|\/$/g, "").split("/");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!event.target || !event.currentTarget) return;
      const target = event.target as Node;
      if (!document.querySelector("#default-sidebar")?.contains(target)) {
        setIsSidebarOpen(false);
      }
    });

    return () => {
      document.removeEventListener("mousedown", (event) => {
        if (!event.target || !event.currentTarget) return;
        const target = event.target as Node;
        if (!document.querySelector("#default-sidebar")?.contains(target)) {
          setIsSidebarOpen(false);
        }
      });
    };
  }, []);

  return (
    <>
      <header className="">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
      </header>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onClickOutside={handleClickOutside}
      />

      <div
        className={` p-4 flex flex-col min-h-screen bg-gray-100 sm:ml-64 ${isSidebarOpen ? "blur-sm" : ""
          }`}
      >
        <div className="sticky top-0 z-10 bg-gray-100">
          <nav className="flex py-4 lg:px-5 justify-between items-center ">
            <div className="flex gap-4">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center -mt-0.5 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <AlignJustify />
              </button>{" "}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnames.map((path, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {index === pathnames.length - 1 ? (
                            <BreadcrumbPage>
                              {path.charAt(0).toUpperCase() + path.slice(1)}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>
                              {path.charAt(0).toUpperCase() + path.slice(1)}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                <Mail className="text-gray-500" />{" "}
              </a>
              <label
                onClick={logout} className="hover:underline">
                <CircleUser className="text-gray-500" />{" "}
              </label>
            </div>
          </nav>
          <div className="lg:px-5">
            <div className="border-b  border-gray-300" />
          </div>
        </div>

        <main className="lg:px-5 py-8">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
