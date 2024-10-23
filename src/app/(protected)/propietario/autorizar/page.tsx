"use client";

import { NewAuthorizationDrawer } from "@/app/(protected)/propietario/autorizar/NewAuthorizationDrawer";
import Button from "@/components/Button";
import { Authorization, BasicUser } from "@/types/types";
import { getAutorizados } from "@/utils/clientPromises";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import AuthorizedCard from "./AuthorizedCard";
import { DeleteUserDrawer } from "./DeleteUserDrawer";

const dummyAuthorizedUsers: BasicUser[] = [
  {
    id: "1",
    dni: "12345678",
    name: "Gabriel",
    type: "frecuente",
  },
  {
    id: "2",
    dni: "12345678",
    name: "Mati",
    type: "eventual",
  },
  {
    id: "3",
    dni: "12345678",
    name: "Ger",
    type: "eventual",
  },
];

export default function Autorizar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeletingUser, setDeletingUser] = useState(false);
  const [userBeingDeleted, setUserBeingDeleted] = useState<any | null>(null);

  const {
    isPending,
    error,
    data: autorizados,
  } = useQuery({
    queryKey: ["autorizados"],
    queryFn: () => getAutorizados(),
  });

  useEffect(() => {
    console.log({ autorizados });
  }, [autorizados]);

  const autorizadosFrecuentes: Authorization[] = autorizados?.filter(
    (autorizado: Authorization) => autorizado.tipo === "frecuente"
  );

  const autorizadosEventuales: Authorization[] = autorizados?.filter(
    (autorizado: Authorization) => autorizado.tipo === "eventual"
  );

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
        {autorizadosFrecuentes &&
          autorizadosFrecuentes.map((autorizado) => (
            <AuthorizedCard
              key={"autorizado-frecuente-" + autorizado.id}
              visita_id={autorizado.visita_id}
              id={autorizado.id}
              // name={user.name}
              // dni={autorizado.dni}
              tipo={autorizado.tipo}
              deleteHandler={() => {
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
        {autorizadosEventuales &&
          autorizadosEventuales.map((autorizado) => (
            <AuthorizedCard
              key={"autorizado-frecuente-" + autorizado.id}
              visita_id={autorizado.visita_id}
              id={autorizado.id}
              // name={user.name}
              // dni={autorizado.dni}
              tipo={autorizado.tipo}
              deleteHandler={() => {
                setUserBeingDeleted(autorizado);
                setDeletingUser(true);
              }}
            />
          ))}
      </section>
      <button
        className="absolute right-0 bottom-8 w-16 h-16 rounded-full flex items-center justify-center bg-verde-500"
        onClick={() => setModalOpen((prev) => !prev)}
      >
        <UserPlus className="h-8 w-8 text-white" />
      </button>

      <DeleteUserDrawer
        open={isDeletingUser}
        setOpen={setDeletingUser}
        user={userBeingDeleted}
      />
      <NewAuthorizationDrawer open={modalOpen} setOpen={setModalOpen} />
    </main>
  );
}
