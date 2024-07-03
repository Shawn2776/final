import { auth } from "@/auth";
import Navbar from "@/components/ui/dashboard/navbar/navbar";
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const session = await auth();
  return (
    <div className="flex text-text bg-bg">
      <div className="hidden min-h-screen p-5 md:flex md:flex-1 bg-bgSoft">
        <Sidebar session={session} />
      </div>
      <div className="w-full md:flex-4 md:p-[1px]">
        <Navbar session={session} />
        <div className="w-full min-h-screen p-4 mt-1 ml-1 mr-4 bg-bgSoft">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
