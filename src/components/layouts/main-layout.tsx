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
import { AlignJustify } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/contexts/token";
import { AlertDialog, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

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
  const { logout, role } = useAuth()

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    {role == "admin" ? (
                      <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                    ) : (
                      <AvatarImage src="https://i.pravatar.cc/100?img=2" />
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar>
                      {role == "admin" ? (
                        <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                      ) : (
                        <AvatarImage src="https://i.pravatar.cc/100?img=2" />
                      )}
                    </Avatar>
                    <div className="grid gap-0.5 leading-none">
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm text-muted-foreground">john@example.com</div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="#" className="flex items-center gap-2">
                      <div className="h-4 w-4" />
                      <p>Profile</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <AlertDialog >
                      <AlertDialogTrigger asChild>
                      <Link to="#" className="flex items-center gap-2">
                      <div className="h-8 w-6" />
                      <text className="text-sm text-red-700">Logout</text>
                    </Link>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Logout</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={logout}>
                            <Button className="bg-red-600">Logout</Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
