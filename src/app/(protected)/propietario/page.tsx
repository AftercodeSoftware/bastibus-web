"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";

export default function Page() {
  const { user } = useUser();

  return (
    <main>
      <Image
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <p className="text-2xl">Hola,</p>
      <p className="text-2xl font-semibold">
        {user?.nombre} {user?.apellido}
      </p>
    </main>
  );
}
