"use client";

import RideCard from "@/components/pages/propietario/RideCard";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";

export default function Page() {
  const { user } = useUser();

  console.log(user);

  return (
    <main>
      <Image
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <p className="text-2xl">Hola,</p>
      <p className="text-2xl font-semibold mb-5">
        {user?.nombre} {user?.apellido}
      </p>

      <RideCard />
    </main>
  );
}
