import ClientProvider from "@/components/ClientProvider";
import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bastibus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientProvider>
          <UserProvider>{children}</UserProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
