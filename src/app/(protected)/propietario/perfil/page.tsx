"use client";

import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { redirect } from "next/navigation";
import React from "react";

export default function Perfil() {
  const { user } = useUser();

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
      <img
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <div className="flex flex-col items-center gap-1">
        <div className="bg-verde-400 rounded-full w-28 h-28 flex items-center justify-center font-semibold text-6xl text-white">
          {user?.nombre[0]}
        </div>
        <h1 className="text-3xl font-semibold mt-2">
          {user?.nombre} {user?.apellido}
        </h1>
        <p>{user?.email}</p>
      </div>
      <div className="flex flex-col items-center rounded-xl p-5 border border-gris-100 bg-white mt-8 mb-8">
        <h2 className="font-semibold text-black">DATOS PERSONALES</h2>
        <div className="flex flex-col gap-2 w-full mt-4">
          <div className="flex justify-between">
            <span className="text-gris-500">Documento</span>
            <span className="text-gris-950 font-semibold">{user?.dni}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gris-500">Lote </span>
            <span className="text-gris-950 font-semibold">
              {user?.manzana}-{user?.lote}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gris-500">Teléfono</span>
            <span className="text-gris-950 font-semibold">{user?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gris-500">Creación</span>
            <span className="text-gris-950 font-semibold">
              {user?.created_at}
            </span>
          </div>
        </div>
      </div>
      <Button secondary type="button" className="w-full" onClick={sendPene}>
        Cerrar sesión
      </Button>
    </main>
  );
}
