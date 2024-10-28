// import { UserResponse } from "@/pages/api/me";
import { AdminSidebar } from "@/components/AdminSidebar";
import ProtectedLayout from "@/components/ProtectedLayout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import Header from "./Header";
// import Navbar from "./Navbar";

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
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ProtectedLayout>
  );
}
