"use server";

import { UserProvider } from "@/context/UserContext";
// import { UserResponse } from "@/pages/api/me";
import { decodeJWT, getUser } from "@/utils/user";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";
import Header from "./admin/Header";
import Navbar from "./admin/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  console.log(user);

  return (
    <TooltipProvider>
      {/* <UserProvider initialUser={initialUser}> */}
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Navbar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          {children}
        </div>
      </div>
      {children}
      {/* </UserProvider> */}
    </TooltipProvider>
  );
}
