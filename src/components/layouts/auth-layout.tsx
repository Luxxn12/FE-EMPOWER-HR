import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description = "",
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
      </header>

      <div className="">
        <main className="">{children}</main>
      </div>

      <footer className=""></footer>
    </div>
  );
};

export default AuthLayout;
