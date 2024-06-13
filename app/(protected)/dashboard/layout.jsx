import { auth } from "@/auth";
import Navbar from "@/components/ui/dashboard/navbar/navbar";
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const session = await auth();
  return (
    <div className="flex text-white bg-bg">
      <div className="hidden md:flex md:flex-1 bg-[#182237] p-5">
        <Sidebar session={session} />
      </div>
      <div className="w-full md:flex-4 md:p-5">
        <Navbar session={session} />
        <div className="w-full h-full p-4 mt-4 ml-1 mr-4 rounded-md bg-bgSoft">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
