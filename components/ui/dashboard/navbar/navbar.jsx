"use client";

import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdClose,
  MdMenu,
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import Sidebar from "../sidebar/sidebar";
import MobileSidebar from "../mobile-sidebar/mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "../../button";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

const Navbar = ({ session }) => {
  const pathname = usePathname();
  const { user } = session;

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-5 md:rounded-xl bg-bgSoft">
        <div className="items-center hidden gap-2 md:flex">
          <span className="font-bold capitalize text-textSoft">
            {pathname.split("/").pop()}
          </span>
        </div>
        <div
          className="flex items-center gap-2 md:hidden"
          onClick={handleClick}
        >
          {isOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
          <span className="font-bold capitalize text-textSoft">
            {pathname.split("/").pop()}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">
            <MdSearch />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none text-text"
            />
          </div>
          <div className="flex gap-5">
            <DropdownMenu>
              <MdOutlineChat size={20} />
              <MdNotifications size={20} />
              <DropdownMenuTrigger>
                <MdPublic size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton>Logout</LogoutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      <div
        onClick={handleClick}
        className={`${
          isOpen
            ? "flex flex-col w-5/6 sticky top-0 bg-bgSoft min-h-screen"
            : "hidden"
        }`}
      >
        <div className="flex items-center justify-between p-5 rounded-xl bg-bgSoft">
          <MobileSidebar session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
