"use client";

import { NewAuthorizationDrawer } from "@/app/(protected)/propietario/autorizar/NewAuthorizationDrawer";
import Button from "@/components/Button";
import { Authorization, BasicUser } from "@/types/types";
import { getAutorizados } from "@/utils/clientPromises";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import AuthorizedCard from "./AuthorizedCard";
import { DeleteUserDrawer } from "./DeleteUserDrawer";

export interface AmountOfAutorizadosByType {
  frecuente: number;
  eventual: number;
}

export default function Autorizar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeletingUser, setDeletingUser] = useState(false);
  const [userBeingDeleted, setUserBeingDeleted] =
    useState<Authorization | null>(null);

  const {
    isPending,
    error,
    data: autorizados,
  } = useQuery({
    queryKey: ["autorizados"],
    queryFn: () => getAutorizados(),
  });

  const autorizadosFrecuentes: Authorization[] = autorizados?.filter(
    (autorizado: Authorization) => autorizado.tipo === "frecuente"
  );

  const autorizadosEventuales: Authorization[] = autorizados?.filter(
    (autorizado: Authorization) => autorizado.tipo === "eventual"
  );

  const amountOfAutorizados = autorizados?.length;

  const amountOfAutorizadosByType: AmountOfAutorizadosByType = {
    frecuente: autorizadosFrecuentes?.length,
    eventual: autorizadosEventuales?.length,
  };

  return (
    <main className="relative h-full">
      <img
        src="/logo_trebol.png"
        alt="Imagen de perfil"
        width={50}
        height={50}
      />
      <h2 className="text-xl text-gris-950 flex items-center gap-2 font-bold mt-2">
        Visitas frecuentes
      </h2>
      <section className="mt-2 flex flex-col gap-4">
        {!isPending &&
        (!autorizadosFrecuentes || autorizadosFrecuentes.length === 0) ? (
          <p className="text-gris-500">No hay visitas frecuentes</p>
        ) : null}
        {!isPending &&
          !error &&
          autorizadosFrecuentes &&
          autorizadosFrecuentes.map((autorizado) => (
            <AuthorizedCard
              key={"autorizado-frecuente-" + autorizado.id}
              id={autorizado.id}
              nombre={autorizado.visita.nombre}
              apellido={autorizado.visita.apellido}
              dni={autorizado.visita.dni}
              tipo={autorizado.tipo}
              deleteHandler={() => {
                console.log("User to be deleted:", autorizado);
                setUserBeingDeleted(autorizado);
                setDeletingUser(true);
              }}
            />
          ))}
      </section>
      <h2 className="text-xl text-gris-950 flex items-center gap-2 font-bold mt-6">
        Visitas eventuales
      </h2>
      <section className="mt-2 flex flex-col gap-4">
        {!isPending &&
        (!autorizadosEventuales || autorizadosEventuales.length === 0) ? (
          <p className="text-gris-500">No hay visitas eventuales</p>
        ) : null}
        {!isPending &&
          !error &&
          autorizadosEventuales &&
          autorizadosEventuales.map((autorizado) => (
            <AuthorizedCard
              key={"autorizado-frecuente-" + autorizado.id}
              id={autorizado.id}
              nombre={autorizado.visita.nombre}
              apellido={autorizado.visita.apellido}
              dni={autorizado.visita.dni}
              tipo={autorizado.tipo}
              dia={autorizado.dia}
              deleteHandler={() => {
                console.log("User to be deleted:", autorizado);
                setUserBeingDeleted(autorizado);
                setDeletingUser(true);
              }}
            />
          ))}
      </section>
      <button
        className={`absolute right-0 bottom-8 w-16 h-16 rounded-full flex items-center justify-center ${
          amountOfAutorizados >= 4 ? "bg-gris-400" : "bg-verde-500"
        }`}
        disabled={amountOfAutorizados >= 4}
        onClick={() => setModalOpen((prev) => !prev)}
      >
        <UserPlus className="h-8 w-8 text-white" />
      </button>

      <DeleteUserDrawer
        open={isDeletingUser}
        setOpen={setDeletingUser}
        autorizacion={userBeingDeleted}
      />
      <NewAuthorizationDrawer
        open={modalOpen}
        setOpen={setModalOpen}
        amountOfAutorizadosByType={amountOfAutorizadosByType}
      />
    </main>
  );
}
