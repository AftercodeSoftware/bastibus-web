"use client";

import RideCard from "@/components/pages/propietario/RideCard";
import { getRecorridos } from "@/utils/clientPromises";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Horarios() {
  const {
    isPending,
    error,
    data: recorridos,
  } = useQuery({
    queryKey: ["recorridos"],
    queryFn: () => getRecorridos(),
  });

  return (
    <div>
      <img
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <div className="flex flex-col gap-3 pb-24 mt-2">
        {!isPending &&
          !error &&
          recorridos.map((recorrido: any) => (
            <RideCard
              key={"horario-recorrido-" + recorrido.id}
              ride={recorrido}
            />
          ))}
      </div>
    </div>
  );
}
