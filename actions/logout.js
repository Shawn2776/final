"use client";

import { signOut, useSession } from "next-auth/react";

export const ClientLogout = () => {
  signOut();
};
