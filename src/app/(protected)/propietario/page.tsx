"use client";

import RideCard from "@/components/pages/propietario/RideCard";
import TripCard from "@/components/pages/propietario/TripCard";
import { useUser } from "@/context/UserContext";
import { BusRide, UserTrip } from "@/types/types";
import { BusFront, IdCard, Navigation } from "lucide-react";
import React from "react";

const dummyCurrentRide: BusRide = {
  id: "1",
  outboundTrip: {
    start: { place: "La Bastilla", date: "12:00" },
    end: { place: "Plaza Independencia", date: "14:00" },
  },
  returnTrip: {
    start: { place: "Plaza Independencia", date: "12:00" },
    end: { place: "La Bastilla", date: "14:00" },
  },
  type: "normal",
};

const dummyUserTrips: UserTrip[] = [
  {
    id: "1",
    trip: {
      start: { place: "Plaza España", date: "12:00" },
      end: { place: "Plaza Italia", date: "12:12" },
    },
    type: "reducido",
  },
  {
    id: "2",
    trip: {
      start: { place: "La Bastilla", date: "10:16" },
      end: { place: "Plaza Independencia", date: "10:40" },
    },
    type: "express",
  },
];

export default function Page() {
  const { user } = useUser();

  console.log(user);

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

      <CurrentRideSection busRide={dummyCurrentRide} />
      <LastTripsSection trips={dummyUserTrips} />
      <AuthorizationsSection />
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
      <RideCard ride={busRide} uncuyo />
    </section>
  );
}

function LastTripsSection({ trips }: { trips: UserTrip[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl text-gris-950 flex items-center gap-2 mb-2 font-medium">
        <Navigation className="text-gris-600" />
        Tus ultimos viajes
      </h2>
      <div className="flex flex-col gap-2">
        {trips.map((trip) => (
          <TripCard ride={trip} />
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
