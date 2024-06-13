"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = ({ children }) => {
  const onClick = () => {
    signOut();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
