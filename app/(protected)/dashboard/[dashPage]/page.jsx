"use client";

import { usePathname } from "next/navigation";

const DashboardConstructionPage = () => {
  const pathname = usePathname();
  const dashPage = pathname.split("/")[2];
  return (
    <div className="flex justify-center text-2xl">
      <span className="px-4 py-2 capitalize rounded-full shadow-sm hover:cursor-pointer hover:bg-white hover:text-black shadow-sky-500 hover:shadow-red-500 bg-bg">
        {dashPage}&nbsp;Construction Page
      </span>
    </div>
  );
};

export default DashboardConstructionPage;
