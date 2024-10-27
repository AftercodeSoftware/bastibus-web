"use client";
import { useUser } from "@/context/UserContext"; // Assuming your context is here
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
  requiredRole: "administrador" | "propietario"; // Add other roles as needed
}

const ProtectedLayout = ({ children, requiredRole }: ProtectedLayoutProps) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.rol) {
      return;
    }

    if (user.rol !== requiredRole) {
      if (user.rol === "administrador") {
        router.replace("/admin");
      } else if (user.rol === "propietario") {
        router.replace("/propietario");
      }
    }
  }, [user, requiredRole, router]);

  // Return null or a loader until the role is verified
  if (!user || user.rol !== requiredRole) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
