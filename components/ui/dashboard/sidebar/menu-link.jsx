"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`flex p-2 md:p-1 xl:p-5 items-center gap-3 hover:bg-[#2e374a] my-1 rounded-xl ${
        pathname === item.path ? "bg-[#2e374a]" : ""
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
