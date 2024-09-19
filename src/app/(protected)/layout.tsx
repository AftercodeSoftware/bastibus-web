import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import Navbar from "./admin/Navbar";
import Header from "./admin/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Navbar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          {children}
        </div>
      </div>
      {children}
    </TooltipProvider>
  );
}
