"use client";

import RideCard from "@/components/pages/propietario/RideCard";
import TripCard from "@/components/pages/propietario/TripCard";
import { useUser } from "@/context/UserContext";
import { BusRide, UserTrip } from "@/types/types";
import { getRecorridos, getUltimosViajes } from "@/utils/clientPromises";
import { useQuery } from "@tanstack/react-query";
import { BusFront, IdCard, Navigation } from "lucide-react";
import React, { useMemo } from "react";

export default function Page() {
  const { user } = useUser();

  const {
    isPending: isPendingRecorridos,
    error: errorRecorridos,
    data: recorridos,
  } = useQuery({
    queryKey: ["recorridos"],
    queryFn: () => getRecorridos(),
  });
  const {
    isPending: isPendingUltimosViajes,
    error: errorUltimosViajes,
    data: ultimosViajes,
  } = useQuery({
    queryKey: ["ultimos-viajes-3"],
    queryFn: () => getUltimosViajes(3),
    enabled: !!user?.id,
  });

  // Filter the recorridos to only show the current one, between salidabarrio and llegadabarrio

  const currentRide = useMemo(() => {
    if (!recorridos) return null;

    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(" ")[0];

    const filteredRecorridos = recorridos?.find(
      (ride) =>
        ride.salidabarrio <= currentTime && ride.llegadabarrio >= currentTime
    );

    if (!filteredRecorridos) return recorridos[0];

    return filteredRecorridos;
  }, [recorridos]);

  return (
    <main>
      <img
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <p className="text-xl">Hola,</p>
      <p className="text-2xl font-semibold mb-5">
        {user?.nombre} {user?.apellido}
      </p>

      {!isPendingRecorridos && currentRide && (
        <CurrentRideSection busRide={currentRide} />
      )}
      {errorRecorridos && <p>Error al cargar recorridos</p>}
      {!isPendingUltimosViajes && <LastTripsSection trips={ultimosViajes} />}
      {errorUltimosViajes && <p>Error al cargar ultimos viajes</p>}
    </main>
  );
}

function CurrentRideSection({ busRide }: { busRide: BusRide }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl text-gris-800 flex items-center gap-2 mb-2 font-medium">
        <BusFront size={24} className="text-gris-800" />
        Proximo recorrido
      </h2>
      <RideCard ride={busRide} />
    </section>
  );
}

function LastTripsSection({ trips }: { trips: UserTrip[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl text-gris-950 flex items-center gap-2 mb-2 font-medium">
        <Navigation className="text-gris-600" />
        Tus ultimos viajes
      </h2>
      <div className="flex flex-col gap-2">
        {trips.map((trip) => (
          <TripCard key={"trip-" + trip.id} ride={trip} />
        ))}
      </div>
    </section>
  );
}

function AuthorizationsSection() {
  return (
    <section className="mt-6">
      <h2 className="text-xl text-gris-950 flex items-center gap-2 mb-2 font-medium">
        <IdCard className="text-gris-600" />
        Autorizados vigentes
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col py-4 px-6 rounded-xl overflow-hidden w-full bg-white min-h-20 shadow-md border">
          <span className="font-bold">Gabriel Pérez Diez</span>
          <span>43637470</span>
        </div>
      </div>
    </section>
  );
}
