// import { UserResponse } from "@/pages/api/me";
import ProtectedLayout from "@/components/ProtectedLayout";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export const metadata = {
  title: "Bastibus - Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout requiredRole="administrador">
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Navbar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            {children}
          </div>
        </div>
      </TooltipProvider>
    </ProtectedLayout>
  );
}
