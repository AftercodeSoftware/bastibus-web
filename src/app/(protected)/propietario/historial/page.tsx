"use client";

import TripCard from "@/components/pages/propietario/TripCard";
import { getUltimosViajes } from "@/utils/clientPromises";
import { useQuery } from "@tanstack/react-query";

export default function Historial() {
  const {
    isPending,
    error,
    data: ultimosViajes,
  } = useQuery({
    queryKey: ["ultimos-viajes"],
    queryFn: () => getUltimosViajes(),
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
          ultimosViajes.map((recorrido: any) => (
            <TripCard
              key={"horario-recorrido-" + recorrido.id}
              ride={recorrido}
            />
          ))}
      </div>
    </div>
  );
}
