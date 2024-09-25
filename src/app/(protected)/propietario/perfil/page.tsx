"use client";

import Button from "@/components/Button";
import { redirect } from "next/navigation";
import React from "react";

export default function Perfil() {
  const sendPene = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    redirect("/propietario");
  };

  return (
    <main>
      <Button type="button" className="w-full" onClick={sendPene}>
        Cerrar sesión
      </Button>
    </main>
  );
}
